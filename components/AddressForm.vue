<script setup lang="ts">
import Multiselect from "vue-multiselect";
import { useConnectionStore } from '@/stores/conditionsStore'
import { ConnectionConditionsEnum } from '@/enums/enums'

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


//getting response from mms full address data
interface GeneralConnectionConditionsI {
  connection_conditions: string,
  sale_internet_max_speed: number,
  sale_iptv_access: string,
  connection_extra_payment: string,
  substructure_monthly_payment: string,
  connection_days_needed: number,
  address_pna: string,
  uid: string,
}
const conditionsStore = useConnectionStore() // data sent to pinia store to get access from wherever file its needed
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
  conditionsStore.setConnectionConditions(responseCondition)
//   if (responseCondition.connection_conditions === null)
//     statusConnection.value = ConnectionConditionsEnum.HaventBeenFound
//   else if (responseCondition.connection_conditions == ConnectionConditionsEnum.CanBeConnected)
//     statusConnection.value = responseCondition.connection_conditions
//   else if
//   (responseCondition.connection_conditions == ConnectionConditionsEnum.HaventBeenFound)
//     statusConnection.value = responseCondition.connection_conditions
//   else if (responseCondition.connection_conditions != ConnectionConditionsEnum.CanBeConnected)
//     statusConnection.value = ConnectionConditionsEnum.CantBeConnected
//
  statusConnection.value = ConnectionConditionsEnum.CanBeConnected
}

//validation for zip-code
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


//function handleDataSent(n:number):void {
//   console.log(n)
// }
function customLabel(city) {
  return `${city.miasto}, ${city.gmina}, ${city.powiat}`
}


</script>
<template>
  <div class="addressForm">
    <div class="user-address-forms">
      <label for="city">
        Miejscowość:
      </label>
      <multiselect id="city" v-model="selectedCity" :custom-label="customLabel"  label="gmina" :options="cities" :searchable="true" :close-on-select="true" :show-labels="false"
                   placeholder="np. Knurów" @search-change="getCities" :limit="3" :options-limit="10" >

      </multiselect>
    </div>

    <div class="user-address-forms">
      <label for="street">
        Ulica:
      </label>
      <multiselect id="street" v-model="selectedStreet"  :options="streets" label="ulica" :searchable="true" :close-on-select="true" :show-labels="false"
                   placeholder="np. Szpitalna" @search-change="getStreets" :limit="3" :options-limit="10">
      </multiselect>
    </div>

    <div class="user-address-forms">
      <label for="zip">
        Kod pocztowy:
      </label>
      <input class=" formInput multiselect__current" id="zip" type="text" autocomplete="off" placeholder="np. 44-190" v-model="selectedZipCode" validate-on-blur max="6" @input="handleZipCode" maxlength="6">
    </div>

    <div class="user-address-forms">
      <label for="house">
        Numer domu/budynku:
      </label>
      <input class=" formInput multiselect__current " id="house" type="text" autocomplete="off"+ min="1" v-model="selectedHouseNumber">
    </div>
    <button class="btn" @click="submitForm">Dalej</button>
  </div>
</template>

<style src="../node_modules/vue-multiselect/dist/vue-multiselect.css"></style>
<style>
.addressForm {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
}
.addressForm>label {
  margin-bottom: 1rem;
}
.addressForm .user-address-forms {
  width: max-content;
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