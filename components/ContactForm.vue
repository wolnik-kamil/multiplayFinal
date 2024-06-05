<script setup lang="ts" xmlns="http://www.w3.org/1999/html">
import { useConnectionStore } from '@/stores/conditionsStore';
import {toNumber} from "@vue/shared";
import {interfaceTypeAnnotation} from "@babel/types";
import {useClientDataStore} from "~/stores/clientDataStore";

const connectionStore = useConnectionStore();
const connectionConditions = computed(() => connectionStore.connectionConditions);
const uid = computed(() => connectionConditions.value?.uid ?? '');



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
interface ClientDataI {
  clientData: {
    client_name: string,
    client_surname: string,
    client_phone_number: string,
    client_uid: string,
  },
}
const clientDataStore = useClientDataStore()
const phone = ref<string>('');
const name = ref<string>('');
const surname = ref<string>('');
const getUserData = async () => {
  const clientCompleteData = <ClientDataI>{
    clientData: {
      client_name: name.value,
      client_surname: surname.value,
      client_phone_number: phone.value,
      client_uid: uid.value
    },
  }
  clientDataStore.setData(clientCompleteData)
};


</script>
<template>
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
</template>
<style>
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