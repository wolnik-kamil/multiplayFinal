<script setup lang="ts">
import {CanBeConnected, AskDBS, CantBeConnected, DoesntExistInDatabase, Null, PlannedSale, RequestMeasure, RequiredResources} from '#components';


  enum PowiatEnum {
    Gliwicki = 'gliwicki'
  }

  enum ConnectionConditionsEnum {
    CanBeConnected = 'MOZNA_PODLACZAC',
    AskDBS = 'PYTAC_DBS',
    RequiredResources = 'WYMAGANE_ZASOBY',
    CantBeConnected = 'NIE_PODLACZAMY',
    PlannedSale = 'ZAPLANOWANA_SPRZEDAZ',
    DoesntExistInDatabase = 'NIE_ZNALEZIONO',
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

  const data = ref<ResponseI>();
  const statusConnection = ConnectionConditionsEnum.AskDBS


  async function getUserData() {
    const { data: response}  = await useFetch<ResponseI[]>('/api/address', {
      query: {search: city.value, woj_id: region_id.value}
    })

    if(!response.value?.length) {
      return;
    }

    data.value = response.value[0]
  }

  function handleDataSent($event) {
    console.log($event)
  }

</script>
<template>

  <div class="flex flex-row justify-evenly">
    <table class="table-fixed">
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

        <tr v-if="!!data">
          <td v-for="index in data">
              {{index}}
          </td>

        </tr>
        <tr v-else>
          <td>Brak danych :(</td>
        </tr>
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
      <button class="btn btn-blue" @click="getUserData()">Send</button>

  </div>

  <AskDBS @data-sent="handleDataSent($e)" v-if="statusConnection === ConnectionConditionsEnum.AskDBS">
  </AskDBS>

  <CanBeConnected v-else-if="statusConnection === ConnectionConditionsEnum.CanBeConnected">
  </CanBeConnected>

  <CantBeConnected v-else-if="statusConnection === ConnectionConditionsEnum.CantBeConnected">
  </CantBeConnected>

  <DoesntExistInDatabase v-else-if="statusConnection === ConnectionConditionsEnum.DoesntExistInDatabase">
  </DoesntExistInDatabase>

  <Null v-else-if="statusConnection === ConnectionConditionsEnum.Null">
  </Null>

  <PlannedSale v-else-if="statusConnection === ConnectionConditionsEnum.PlannedSale">
  </PlannedSale>

  <RequestMeasure v-else-if="statusConnection === ConnectionConditionsEnum.RequestMeasure">
  </RequestMeasure>

  <RequiredResources v-else-if="statusConnection === ConnectionConditionsEnum.RequiredResources">
  </RequiredResources>

</template>

