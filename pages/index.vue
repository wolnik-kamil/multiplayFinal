<script setup lang="ts">
import {CanBeConnected, AskDBS} from '#components';


  enum PowiatEnum {
    Gliwicki = 'gliwicki'
  }

  enum ConnectionConditions {
    CanBeConnected = 'MOZNA_PODLACZAC',
    AskDBS = 'PYTAC_DBS',
    RequiredResources = 'WYMAGANE_ZASOBY',
    CantBeConnected = 'NIE_PODLACZAMY',
    PlannedSale = 'ZAPLANOWANA_SPRZEDAZ',
    NotFound = 'NIE_ZNALEZIONO',
    RequestMeasure = 'ZLECIC_POMIAR',
    Null = 'NULL'
  }

  interface ResponseI{

      powiat: PowiatEnum,
      gmina: string,
      miasto: string,
      simc: number,
      terc: number,
      nazwa_rm: string,
      nazwa_pod?: string

  }
  const city = ref('')
  const region_id = ref('')


const statusConnection = ConnectionConditions.CanBeConnected


  async function GetUserData() {
    console.log(city.value, region_id.value)
    const { data: response}  = await useFetch<ResponseI[]>('/api/address', {
      query: {search: city.value, woj_id: region_id.value}
    })
  }

</script>
<template>

  <div class="container">
    <table>
      <thead>
        <th scope="col">Powiat</th>
        <th scope="col">Gmina</th>
        <th scope="col">Miasto</th>
        <th scope="col">simc</th>
        <th scope="col">terc</th>
        <th scope="col">nazwa_rm</th>
        <th scope="col">nazwa_pod</th>
      </thead>
      <tbody>
        <tr v-if="!!response">
          <td v-for="index in response[0]">
              {{index}}
          </td>

        </tr>
        <div v-else>
          <p>Brak danych :(</p>
        </div>
      </tbody>
    </table>

      <label for="City">
        Podaj nazwe miejsowości
        <input v-model="city" type="text">
      </label>
      <label for="RegionId">
        Podaj ID województwa
        <input v-model="region_id" type="number">
      </label>
      <button class="btn" @click="GetUserData()">Send</button>

  </div>

<!-- przykład -->
  <CanBeConnected v-if="statusConnection === ConnectionConditions.CanBeConnected">
  </CanBeConnected>

  <AskDBS v-else-if="statusConnection === ConnectionConditions.AskDBS">
  <AskDBS/>

</template>
<style>
.container{
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
table, tr, td, th {
  border: 1px solid black;
  border-collapse: collapse;
}
form {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.btn {
  width: 80px;
  height: 30px;
}
</style>
