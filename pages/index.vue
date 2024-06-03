<script setup lang="ts">
  import {CanBeConnected, CantBeConnected, HaventBeenFound, SpecialOffer} from '#components';
  import Multiselect from 'vue-multiselect'
  import { useConnectionStore } from '@/stores/conditionsStore'

  enum ConnectionConditionsEnum {
    CanBeConnected = 'MOZNA_PODLACZAC',
    CantBeConnected = 'NIE_PODLACZAMY',
    HaventBeenFound = 'nie_znaleziono',
    SpecialOffer = 'SPECJALNA_OFERTA',
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

  async function getCities(cityName:string):Promise<void> {
    if (cityName && cityName.length >= 3) {
      const { data: response}  = await useFetch<SimcI[]>('/api/address/city', {
        query: {search: cityName}
      })
      if(!response.value?.length) {
        return;
      }

      cities.value = response.value
    }



  }

  //Zapis simc miasta i wyświetlanie ulic danej miejscowości
  interface UlicI {
    ulic: number,
    ulica: string
  }

  const streets = ref<object[]>([])
  const selectedStreet = ref<UlicI | null>(null)

  async function getStreets(streetName:string):Promise<void> {
    if (streetName && streetName.length >= 3){
    const { data: response}  = await useFetch<UlicI[]>('/api/address/street', {
      query: {search: streetName, simc: selectedCity.value?.simc}
    })

    if(!response.value?.length) {
      return;
    }
    streets.value = response.value
    }
  }

  interface GeneralConnectionConditionsI {
    connection_conditions: string,
    sale_internet_max_speed: number,
    sale_iptv_access: string,
    connection_extra_payment: string,
    substructure_monthly_payment: string,
    connection_days_needed: number,
    address_pna: string
  }
  const conditionsStore = useConnectionStore()
  const selectedHouseNumber = ref<number>()
  const statusConnection = ref()

  async function getHouseNumber() {
    const {data: response} = await useFetch<GeneralConnectionConditionsI[]>('/api/address/house', {
      query: {
        houseNumber: selectedHouseNumber,
        ulic: selectedStreet.value?.ulic,
        terc: selectedCity.value?.terc,
        simc: selectedCity.value?.simc,
      }
    })
    if (!response?.value) {
      return;
    }

    const responseCondition = response.value.data
    console.log(response.value)
    conditionsStore.setConnectionConditions(responseCondition)

    if (responseCondition.connection_conditions == ConnectionConditionsEnum.CanBeConnected)
    {
      statusConnection.value = responseCondition.connection_conditions
    } else if
    (responseCondition.connection_conditions == ConnectionConditionsEnum.HaventBeenFound)
    {
      statusConnection.value = responseCondition.connection_conditions
    } else if (responseCondition.connection_conditions != ConnectionConditionsEnum.CanBeConnected)
    {
      statusConnection.value = ConnectionConditionsEnum.CantBeConnected
    }
  }


  const selectedZipCode = ref()
  const formError = ref();

  const handleZipCode = (event: Event) => {
    let value = (event.target as HTMLInputElement).value.replace(/\D/g, ''); // user can only type int
    if (value.length > 2 && value.length < 6) {
      value = value.replace(/(\d{2})(\d{1,3})/, '$1-$2'); // adding - sign after two numbers
    }
    selectedZipCode.value = value; // new value
  };

  const validateForm = () => {
    if (!selectedCity.value || !selectedStreet.value || !selectedHouseNumber.value || !selectedZipCode.value) {
      formError.value = 'Sprawdź, czy wszystko wypełniłeś';
      alert(formError.value)
    } else {
      formError.value = null;
    }
  };

  const submitForm = () => {
    validateForm();

    if (!formError.value) {
      getHouseNumber();
    }
  };


  function handleDataSent(n:number):void {
    console.log(n)
  }
  function customLabel(city) {
    return `${city.miasto}, ${city.gmina}, ${city.powiat}`
  }

</script>
<template>
<div class="container">
  <div class="addressForm" v-if="!statusConnection">
    <label for="city">
      Miejscowość:
      <div class="user-address-forms">
        <multiselect id="city" v-model="selectedCity" :custom-label="customLabel"  label="gmina" :options="cities" :searchable="true" :close-on-select="true" :show-labels="false"
                     placeholder="np. Knurów" @search-change="getCities" :limit="3" :options-limit="10" >

        </multiselect>

      </div>
    </label>

    <label for="street">
      Ulica:
      <div class="user-address-forms">
        <multiselect id="street" v-model="selectedStreet"  :options="streets" label="ulica" :searchable="true" :close-on-select="true" :show-labels="false"
                     placeholder="np. Szpitalna" @search-change="getStreets" :limit="3" :options-limit="10">
        </multiselect>
      </div>
    </label>

    <label for="zip">
      Kod pocztowy:
      <div class="user-address-forms">
        <input class=" formInput multiselect__current" id="zip" type="text" placeholder="np. 44-190" v-model="selectedZipCode" validate-on-blur max="6" @input="handleZipCode" maxlength="6">
      </div>
    </label>

    <label for="house">
      Numer domu/budynku:
      <div class="user-address-forms">
        <input class=" formInput multiselect__current " id="house" type="text" min="1" v-model="selectedHouseNumber">
      </div>
    </label>
    <button class="btn" @click="submitForm">Dalej</button>
  </div>

  <div class="conditionsResults" v-else-if="statusConnection">
    <CanBeConnected @data-sent="handleDataSent" v-if="statusConnection === ConnectionConditionsEnum.CanBeConnected">
    </CanBeConnected>

    <CantBeConnected v-else-if="statusConnection === ConnectionConditionsEnum.CantBeConnected">
    </CantBeConnected>

    <SpecialOffer v-else-if="statusConnection === ConnectionConditionsEnum.SpecialOffer">
    </SpecialOffer>

    <HaventBeenFound v-else-if="statusConnection === ConnectionConditionsEnum.HaventBeenFound">
    </HaventBeenFound>

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