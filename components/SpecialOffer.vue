<script setup lang="ts">
import Multiselect from "vue-multiselect";
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
const statusConnection = ref<string[]>()

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


interface ConnectionConditionsI {
  connection_conditions: string
}

const houses = ref<string[]>([])
const selectedHouseNumber = ref<ConnectionConditionsI | null>(null)


async function getHouseNumber() {
  const {data: response}  = await useFetch<ConnectionConditionsI[]>('/api/address/house', {
    query: {houseNumber: selectedHouseNumber, ulic: selectedStreet.value?.ulic, terc: selectedCity.value?.terc, simc: selectedCity.value?.simc}
  })


  houses.value = response.value.data.connection_conditions
  console.log(houses.value)
  statusConnection.value = houses.value
}
</script>

<template>
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
</template>

