<script setup lang="ts">
  import {CanBeConnected, CantBeConnected, HaventBeenFound, Null} from '#components';
  import Multiselect from 'vue-multiselect'


  enum ConnectionConditionsEnum {
    CanBeConnected = 'MOZNA_PODLACZAC',
    CantBeConnected = 'NIE_PODLACZAMY',
    HaventBeenFound = 'nie_znaleziono',
    Null = 'NULL',
  }

  //Zapis nazwy miasta i wysyłanie do pliku
  interface SimcI {

    powiat: string,
    gmina: string,
    miasto: string,
    simc: number,
    terc: number,
    nazwa_rm: string,
    nazwa_pod?: string
  }

  const cities = ref<object[]>([])
  const selectedCity = ref<SimcI | null>(null)
  const regions = ref<object[]>([])

  async function getCities(cityName:string):Promise<void> {
    const { data: response}  = await useFetch<SimcI[]>('/api/address/city', {
      query: {search: cityName}
    })

    if(!response.value?.length) {
      return;
    }

    cities.value = response.value
  }

  //Zapis simc miasta i wyświetlanie ulic danej miejscowości
  interface UlicI {
    ulic: number,
    ulica: string
  }

  const streets = ref<object[]>([])
  const selectedStreet = ref<UlicI | null>(null)

  async function getStreets(streetName:string):Promise<void> {
    const { data: response}  = await useFetch<UlicI[]>('/api/address/street', {
      query: {search: streetName, simc: selectedCity.value?.simc}
    })

    if(!response.value?.length) {
      return;
    }

    streets.value = response.value

  }

  interface GeneralConnectionConditionsI {
    connection_conditions: string,
    sale_internet_max_speed: number,
    sale_iptv_access: string,
    connection_extra_payment: string,
    substructure_monthly_payment: string,
    connection_days_needed: number
  }

  const selectedHouseNumber = ref<number>()
  const statusConnection = ref()

  async function getHouseNumber() {
    const {data: response}  = await useFetch<GeneralConnectionConditionsI[]>('/api/address/house', {
      query: {houseNumber: selectedHouseNumber, ulic: selectedStreet.value?.ulic, terc: selectedCity.value?.terc, simc: selectedCity.value?.simc}
    })
    if(!response?.value) {
      return;
    }
    console.log(response.value)
    const responseCondition = response.value.data
    if  (responseCondition.connection_conditions == 'MOZNA_PODLACZAC' &&
        (
            responseCondition.sale_internet_max_speed < 1000 ||
            responseCondition.sale_iptv_access == 'NIE' ||
            responseCondition.connection_extra_payment != 0.00 ||
            responseCondition.substructure_monthly_payment != 0.00 ||
            responseCondition.connection_days_needed != 0
        )
    )
    {
      statusConnection.value = ConnectionConditionsEnum.CantBeConnected
    }
    else if (responseCondition.connection_conditions == 'MOZNA_PODLACZAC')
    {
      response.value = responseCondition.connection_conditions
      statusConnection.value = response.value
    }
    else if (responseCondition.connection_conditions != 'MOZNA_PODLACZAC')
    {
      statusConnection.value = ConnectionConditionsEnum.CantBeConnected
    }
    else
    {
      statusConnection.value = ConnectionConditionsEnum.HaventBeenFound
    }

  }

  function handleDataSent(n:number):void {
    console.log(n)
  }

</script>
<template>


<div class="container">
  <div class="addressForm" v-if="!statusConnection">
    <label for="city">
      Miejscowość:
      <div class="user-address-forms">
        <multiselect v-model="selectedCity" label="miasto" :options="cities" :searchable="true" :close-on-select="true" :show-labels="false"
                     placeholder="np. Knurów" @search-change="getCities" :limit="3" :options-limit="10">
        </multiselect>

      </div>
    </label>

    <label for="street">
      Ulica:
      <div class="user-address-forms">
        <multiselect v-model="selectedStreet"  :options="streets" label="ulica" :searchable="true" :close-on-select="true" :show-labels="false"
                     placeholder="np. Szpitalna" @search-change="getStreets" :limit="3" :options-limit="10">
        </multiselect>
      </div>
    </label>

    <label for="zip">
      Kod pocztowy:
      <div class="user-address-forms">
        <multiselect  :options="cities" :searchable="true" :close-on-select="false" :show-labels="false"
                     placeholder="np. 44-190" @search-change="getCities">
        </multiselect>
      </div>
    </label>

    <label for="house">
      Numer domu/budynku:
      <div class="user-address-forms">
        <input class=" formInput multiselect__current " type="text" min="1" v-model="selectedHouseNumber">
      </div>
    </label>
    <button class="btn" @click="getHouseNumber">Dalej</button>
  </div>
  <div class="conditionsResults" v-else-if="statusConnection">
    <CanBeConnected @data-sent="handleDataSent" v-if="statusConnection === ConnectionConditionsEnum.CanBeConnected">
    </CanBeConnected>

    <CantBeConnected v-else-if="statusConnection === ConnectionConditionsEnum.CantBeConnected">
    </CantBeConnected>

    <HaventBeenFound v-else-if="statusConnection === ConnectionConditionsEnum.HaventBeenFound">
    </HaventBeenFound>

    <Null v-else-if="statusConnection === ConnectionConditionsEnum.Null">
    </Null>
  </div>
</div>




</template>
<style src="../node_modules/vue-multiselect/dist/vue-multiselect.css"></style>
<style>

  .container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
  .addressForm {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
  }
  .addressForm>label {
    margin-bottom: 1rem;
  }
  .addressForm>label>.user-address-forms {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
  }

  .formInput {
    width: 7rem;
  }

  .btn {
    padding: 0.5rem;
    border-radius: 12px;
    border: 0;
    width: 5rem;
    font-size: 12px;
  }
  .btn:hover {
    cursor: pointer;
    padding: 0.7rem;
    opacity: 0.9;
    font-size: 16px;
  }


</style>