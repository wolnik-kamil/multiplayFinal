<script setup lang="ts">
  //import {CanBeConnected, Test, CantBeConnected, Null} from '#components';
  import Multiselect from 'vue-multiselect'
  import {defineComponent} from 'vue';

  enum ConnectionConditionsEnum {
    CanBeConnected = 'MOZNA_PODLACZAC',
    CantBeConnected = 'NIE_PODLACZAMY',
    Null = 'NULL',
    Test = 'TEST'
  }


  //const statusConnection = ConnectionConditionsEnum.Test

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

  const cities = ref<string[]>([])
  const selectedCity = ref<SimcI | null>(null)

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

  const streets = ref<string[]>([])
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

  const selectedHouseNumber = ref<string>()

  async function getHouseNumber() {
    const {data: response}  = await useFetch('/api/address/house', {
      query: {houseNumber: selectedHouseNumber, ulic: selectedStreet.value?.ulic, terc: selectedCity.value?.terc, simc: selectedCity.value?.simc}
    })

    console.log(response.value)
  }


  // function handleDataSent(n:number):void {
  //   console.log(n)
  // }

</script>
<template>
<div class="container">
  <div class="secondForm">
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
        <input class=" formInput multiselect__current " type="text" min="1" @input="getHouseNumber" v-model="selectedHouseNumber">
      </div>
    </label>


  </div>
</div>


<!--  <test @data-sent="handleDataSent" v-if="statusConnection === ConnectionConditionsEnum.Test">-->
<!--  </test>-->

<!--  <CanBeConnected v-else-if="statusConnection === ConnectionConditionsEnum.CanBeConnected">-->
<!--  </CanBeConnected>-->

<!--  <CantBeConnected v-else-if="statusConnection === ConnectionConditionsEnum.CantBeConnected">-->
<!--  </CantBeConnected>-->

<!--  <Null v-else-if="statusConnection === ConnectionConditionsEnum.Null">-->
<!--  </Null>-->


</template>
<style src="../node_modules/vue-multiselect/dist/vue-multiselect.css"></style>
<style>

  .container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
  }
  .secondForm {
    display: flex;
    justify-content: center;
    width: max-content;
    flex-direction: row;
  }
  .secondForm>label {
    margin-bottom: 1rem;
  }
  .secondForm>label>.user-address-forms {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
  }

  .formInput {
    width: 7rem;
  }


</style>