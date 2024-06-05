<script setup lang="ts" xmlns="http://www.w3.org/1999/html">
import { useConnectionStore } from '@/stores/conditionsStore';
import {toNumber} from "@vue/shared";


// Conditions from response
const connectionStore = useConnectionStore();
const connectionConditions = computed(() => connectionStore.connectionConditions);
const maxNet = computed(() => connectionConditions.value?.sale_internet_max_speed ?? 0);
const isTv = computed(() => connectionConditions.value?.sale_iptv_access ?? false);
const connectionExtraPayment = computed(() => connectionConditions.value?.connection_extra_payment ?? '0.00');
const substructureExtraPayment = computed(() => connectionConditions.value?.substructure_monthly_payment ?? '0.00');
// const daysToConnect = computed(() => connectionConditions.value?.connection_days_needed ?? 0);
const tvChecked = ref(false);
const uid = computed(() => connectionConditions.value?.uid ?? '');


// Interface for an object below
interface OfferOptionsI {
  net: string;
  mesh: string;
  symmetrical: string;
  voip: string;
  tv: string;
  canalPlus: string;
  multiroom: string;
  pvr: string;
}

//Offer Variables' object
const offerOptions = ref({
  net: ref('01'),
  mesh: ('0'),
  symmetrical: '0',
  voip: '0',
  tv: '0',
  canalPlus: '0',
  multiroom: '0',
  pvr: '0'
})


// Conditions based on what user selected
type ConditionType = {
  [key: string]: {
    [key: string]: number
  }
};
const priceConditions: ConditionType = {
  net: {
    '01': 40,
    '02': 50,
    '03': 60
  },
  symmetrical: {
    '0': 0,
    '1': 15
  },
  voip: {
    '0': 0,
    '1': 15
  },
  tv: {
    '0': 0,
    '1': 10,
    '2': 20
  },
  canalPlus: {
    '0': 0,
    '1': 15
  },
  multiroom: {
    '0': 0,
    '1': 10
  },
  pvr: {
    '0': 0,
    '1': 5
  }
};


//Clearing tv value after unchecking tv input
watch(tvChecked, (newValue) => {
  if(!newValue) {
    offerOptions.value.tv = '0'
    offerOptions.value.pvr= '0'
  }
})


// Price based on the price conditions
const price = computed(() => {
  return Object.entries(offerOptions.value)
      .reduce((totalPrice, [key, value]) => {
        if (priceConditions[key]?.[value] !== undefined) {
          totalPrice += priceConditions[key][value] + toNumber(connectionExtraPayment.value) + toNumber(substructureExtraPayment.value) ;
        }
        return totalPrice;
      }, 0);
});


//Generating offer code after submitting form
const offerCode = ref<string>('')
async function generateCode(offerOptions: OfferOptionsI): Promise<void> {
  let code = '';
  for (const key in offerOptions) {
    if (Object.prototype.hasOwnProperty.call(offerOptions, key)) {
      code += offerOptions[key as keyof OfferOptionsI];
    }
  }
  code += '000000';
  offerCode.value = code;
}


//validation function for contact form
const formError = ref();
const handlePhoneNumber = (event: Event) => {
  let phoneInput = event.target as HTMLInputElement;
  let value = phoneInput.value.replace(/\D/g, '');// user can only type int
  phoneInput.value = value; // new value
};

const handleFullname = (event: Event) => {
  let inputs = event.target as HTMLInputElement;
  let value = inputs.value.replace(/\d/g, '');// user can't type int
  inputs.value = value; // new val
}

const validateForm = () => {
  if (!name.value || !surname.value || !phone.value || phone.value.length != 9) {
    formError.value = 'Sprawdź, czy wszystko dobrze wypełniłeś';
    alert(formError.value)
  } else {
    formError.value = null;
  }
};


//Checking if data is set
const submitForm = (event: Event) => {
  validateForm();
  if (!formError.value) {
    getUserData();
  }
};

// Data from final form which is full name, phone number etc.
const phone = ref<string>('');
const name = ref<string>('');
const surname = ref<string>('');
const getUserData = async () => {
  const clientCompleteData = {
    clientPersonalData: {
      client_name: name.value,
      client_surname: surname.value,
      client_phone_number: phone.value,
      client_offerCode: offerCode.value,
      client_uid: uid.value
    },
    // clientAddress: {
    //   connection
    // }
  }
};





</script>
<template>
  <div class="con">
    <header>
      <h1 v-if="!offerCode">Konfigurator oferty</h1>
      <h1 v-else>Dane osobowe</h1>
    </header>
    <main>
      <div class="offerConfiguration" v-if="!offerCode">
        <label for="netId" class="select selectPack">
          <span>Prędkość internetu</span>
          <select id="netId" v-model="offerOptions.net">
            <option value="01">500 Mb/s</option>
            <option v-if="maxNet >= 800" value="02">800 Mb/s</option>
            <option v-if="maxNet == 1000" value="03">1000 Mb/s</option>
          </select>
        </label>
        <label for="symmetricalId">
          <span>Łącze symetryczne</span>
          <input id="symmetricalId" v-model="offerOptions.symmetrical" true-value="1" false-value="0" type="checkbox">
        </label>
        <label for="voipId">
          <span>Telefon</span>
          <input id="voipId" v-model="offerOptions.voip" true-value="1" false-value="0" type="checkbox">
        </label>
        <label for="isTvId" v-if="isTv">
          <span>Telewizja</span>
          <input id="isTvId" v-model="tvChecked" type="checkbox">
        </label>
        <label for="tvId" v-if="tvChecked" class="selectPack">
          <select v-model="offerOptions.tv" :disabled="!tvChecked" >
            <option :value="0" disabled hidden>Wybierz pakiet</option>
            <option value="1">Multi TV</option>
            <option value="2">MultiMax TV</option>
          </select>
        </label>
        <label for="canalPlusId">
          <span>Canal+ Prestige</span>
          <input id="canalPlusId" v-model="offerOptions.canalPlus" true-value="1" false-value="0" type="checkbox">
        </label>
        <label for="multiroomId">
          <span>Multiroom</span>
          <input id="multiroomId" v-model="offerOptions.multiroom" true-value="1" false-value="0" type="checkbox">
        </label>
        <label for="pvrMId" v-if="offerOptions.tv == '1'">
          <span>PVR M</span>
          <input id="pvrMId" v-model="offerOptions.pvr" true-value="1" false-value="0" type="checkbox">
        </label>
        <label for="pvrLId" v-else-if="offerOptions.tv == '2'">
          <span>PVR L</span>
          <input id="pvrLId" v-model="offerOptions.pvr" true-value="1" false-value="0" type="checkbox">
        </label>
        <div class="price">Kwota całkowita: {{price}}.00 zł</div>
        <button class="btn" @click="generateCode(offerOptions)">Dalej</button>
      </div>
      <div v-else class="sendUserData">
        <div class="contactForm">
          <label for="Id">
            <input placeholder="Imię" @input="handleFullname" v-model="name" type="text" required>
          </label>

          <label for="Id">
            <input placeholder="Nazwiwsko" @input="handleFullname" v-model="surname" type="text" required>
          </label>

          <label for="Id" class="phone-label">
            <div class="phone-input">
              <input class="prefix" value="+48 " readonly>
              <input class="number" placeholder="Numer telefonu" v-model="phone" @input="handlePhoneNumber" maxlength="9" type="text">
            </div>
          </label>

          <button @click="submitForm" class="btn">Wyślij</button>
        </div>
      </div>
    </main>
    <footer>

    </footer>
  </div>
</template>
<style>
.con {
  @apply flex justify-center flex-col w-80 mx-auto;
}

.offerConfiguration {
  @apply flex flex-col text-2xl;
}

.offerConfiguration label {
  @apply w-full py-3 my-2 px-5 flex justify-between border border-collapse;
}

.offerConfiguration label:first-child {
  @apply text-center;
}

.price {
  @apply p-2 text-lg m-auto;
}

.select {
  @apply flex flex-col;
}

.selectPack select {
  @apply border m-auto;
}



.contactForm {
  @apply flex flex-col w-max;
}

.contactForm > label {
  @apply w-full py-3 px-5 flex justify-between flex-col;
}

.contactForm span {
  @apply text-xl;
}

.contactForm label:last-child {
  @apply w-1/2;
}

.contactForm>input:nth-child(2) {
  @apply text-center;
}

.contactForm .phone-input {
  @apply flex items-center relative;
}

.contactForm input {
  @apply py-3 px-2 mr-2 text-lg border text-center;
}

.contactForm .phone-input .prefix {
  @apply w-1/6 absolute inset-y-0 left-0 flex items-center px-1 border border-r border-gray-300 ;
}

.contactForm .phone-input .number {
  @apply flex-1 py-3 pl-16 border-l-0 text-lg;
}

.btn {
  @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-12 m-auto rounded-full
}
</style>

