<script setup lang="ts">
  //import {CanBeConnected, Test, CantBeConnected, Null} from '#components';
  import Multiselect from 'vue-multiselect'




  enum ConnectionConditionsEnum {
    CanBeConnected = 'MOZNA_PODLACZAC',
    CantBeConnected = 'NIE_PODLACZAMY',
    Null = 'NULL',
    Test = 'TEST'
  }

  interface SimcI {

      powiat: string,
      gmina: string,
      miasto: string,
      simc: number,
      terc: number,
      nazwa_rm: string,
      nazwa_pod?: string

  }

  const city = ref('')
  const street = ref('')
  const zip = ref('')
  const house = ref('')
  const cities = ref<string[]>([])

  const data = ref<SimcI>();
  const statusConnection = ConnectionConditionsEnum.Test

  // function handleDataSent(n:number):void {
  //   console.log(n)
  // }

  async function getUserData(cityName:string):Promise<void> {
    const { data: response}  = await useFetch<SimcI[]>('/api/address/city', {
      search: [cityName]
    })

    if(!response.value?.length) {
      return;
    }

    cities.value = response.value.map((simc) => simc.miasto)


  }
  //Dynamic city searching


</script>
<template>
<div class="container">
  <div class="flex flex-row justify-evenly form">
<!--    <label for="city">-->
<!--      Miejscowość-->
<!--      <input v-model="city" type="text" placeholder="np. Knurów">-->
<!--    </label>-->
<!--    <label for="street">-->
<!--      Ulica:-->
<!--      <input v-model="street" type="text" placeholder="np. Szpitalna">-->
<!--    </label>-->
<!--    <label for="zip">-->
<!--      Kod pocztowy:-->
<!--      <input v-model="zip" type="number" placeholder="np. 44-190">-->
<!--    </label>-->
<!--    <label for="house">-->
<!--      Numer domu/budynku:-->
<!--      <input v-model="house" type="number" placeholder="np. 8">-->
<!--    </label>-->
<!--    <label>-->
<!--      <button class="btn btn-blue" @click="getUserData()">Wyślij</button>-->
<!--    </label>-->
  </div>
  <div class="secondForm">
    <label for="city">
      Miejscowość:
      <div class="multiselect">
        <multiselect  :options="cities" :searchable="true" :close-on-select="false" :show-labels="false"
                     placeholder="np. Knurów" @search-change="getUserData" :limit="3">
        </multiselect>
      </div>
    </label>

    <label for="street">
      Ulica:
      <div class="multiselect">
        <multiselect  :options="cities" :searchable="true" :close-on-select="false" :show-labels="false"
                     placeholder="np. Szpitalna" @search-change="getUserData">
        </multiselect>
      </div>
    </label>

    <label for="zip">
      Kod pocztowy:
      <div class="multiselect">
        <multiselect  :options="cities" :searchable="true" :close-on-select="false" :show-labels="false"
                     placeholder="np. 44-190" @search-change="getUserData">
        </multiselect>
      </div>
    </label>

    <label for="house">
      Numer domu/budynku:
      <div class="multiselect">
        <multiselect  :options="cities" :searchable="true" :close-on-select="false" :show-labels="false"
                     placeholder="np. 8" @search-change="getUserData">
        </multiselect>
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
  .secondForm>label>.multiselect {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
  }
  .form {
    display: flex;
    justify-content: center;
    width: max-content;
    flex-direction: column;
  }
  .form>label:last-child {
    width: max-content;
    margin: 0 auto;
  }
  .form>label>input {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
  }

  .form>label>button {
    padding: 0.8rem;
    width: 7rem;
    background: #0067a5;
    color: #fff;
    border: none;
    border-radius: 10rem;
    text-transform: uppercase;
  }

  .form>label>button:hover {
    cursor: pointer;
  }




</style>