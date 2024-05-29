<script setup lang="ts" xmlns="http://www.w3.org/1999/html">
import { useConnectionStore } from '@/stores/conditionsStore'

const connectionStore = useConnectionStore()
//const connectionStatus = computed(() => connectionStore.connectionStatus)
const connectionConditions = computed(() => connectionStore.connectionConditions)

const maxNet = computed(() => connectionConditions.value?.sale_internet_max_speed ?? 0);
const isTv = computed(() => connectionConditions.value?.sale_iptv_access ?? false);



// Data from offer config. it creates unique offer code which will be sent to the serwer after sending final form (getUserData())
const net = ref<string>('01')
const mesh = ref<string>('0')
const symmetrical = ref<string>('0')
const voip = ref<string>('0')
const tv = ref<string>('0')
const canalPlus = ref<string>('0')
const multiroom = ref<string>('0')
const pvr = ref<string>('0')
const offerCode = ref<string>()

async function generateCode() {
  offerCode.value = net.value + mesh.value + symmetrical.value + voip.value + tv.value + canalPlus.value + multiroom.value + pvr.value + '000000'
}

// Validation for a phone number
const phone = ref<string>('');
const name = ref<string>('')
const surname = ref<string>('')
const validatePhoneInput = (event: Event) => {
  let input = (event.target as HTMLInputElement).value;
  input = input.replace(/\D/g, ''); // Usuwamy wszystkie niecyfrowe znaki
  if (input.length > 9) {
    input = input.slice(0, 9); // Ograniczamy długość do 9 cyfr
  }
  phone.value = input;
};


// Data from final form which is full name, phone number etc.


const getUserData = async () => {
  const userPhoneNumber = `${phone.value}`;
  const userName = `${name.value}`;
  const userSurname = `${surname.value}`;
  console.log('Data:', userPhoneNumber, userName, userSurname);
}

</script>
<template>


  <div class="con">
    <header>
      <h1 v-if="!offerCode">Konfigurator oferty</h1>
      <h1 v-else>Dane osobowe</h1>
    </header>
    <main>
      <div class="offerConfiguration" v-if="!offerCode">
        <label for="net">
          <span>Prędkość internetu</span>
          <select v-model="net">
            <option v-if="maxNet >= 500" value="01">500 mbps</option>
            <option v-if="maxNet >= 800" value="02">800 mbps</option>
            <option v-if="maxNet == 1000" value="03">1000 mbps</option>
          </select>
        </label>
        <label for="">
          <span>Łącze symetryczne</span>
          <input v-model="symmetrical" true-value="1" false-value="0" type="checkbox">
        </label>
        <label for="">
          <span>Telefon</span>
          <input  v-model="voip" true-value="1" false-value="0" type="checkbox">
        </label>
        <label for="" v-if="isTv">
          <span>Telewizja</span>
          <input v-model="tv" true-value="1" false-value="0" type="checkbox">
        </label>
        <label for="TV" v-if="tv != '0'">
          <span>TV</span>
          <select v-model="tv">
            <option value="1" >Multi TV</option>
            <option value="2">MultiMax TV</option>
          </select>
        </label>
        <label for="">
          <span>Canal+ Prestige</span>
          <input  v-model="canalPlus" true-value="1" false-value="0" type="checkbox">
        </label>
        <label for="">
          <span>Multiroom</span>
          <input  v-model="multiroom" true-value="1" false-value="0" type="checkbox">
        </label>
        <label for="" v-if="tv == '1'">
          <span>PVR M</span>
          <input  v-model="pvr" true-value="1" false-value="0" type="checkbox">
        </label>
        <label for="" v-else-if="tv == '2'">
          <span>PVR L</span>
          <input  v-model="pvr" true-value="1" false-value="0" type="checkbox">
        </label>
        <button class="btn" @click="generateCode">Dalej</button>
      </div>
      <div v-else class="sendUserData">
        <div class="contactForm">
          <label for="">
            <span>Imię</span>
            <input v-model="name" type="text" required>
          </label>

          <label for="">
            <span>Nazwisko</span>
            <input v-model="surname" type="text" required>
          </label>

          <label for="">
            <span>Telefon</span>
            <div class="phone-input">
              <input class="prefix" value="+48 " readonly>
              <input class="number" v-model="phone" maxlength="9" type="text" @input="validatePhoneInput">
            </div>
          </label>
          <button @click="getUserData" class="btn">Wyślij</button>
        </div>
      </div>
    </main>
    <footer>

    </footer>
  </div>
</template>
<style>
.con {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: max-content;
  margin: auto;
}

.offerConfiguration {
  display: flex;
  flex-direction: column;
}

.offerConfiguration>label {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}

.offerConfiguration>.btn {
  margin: auto
}
.contactForm {
  display: flex;
  flex-direction: column;
  width: max-content;
}

.contactForm>label {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}


.contactForm span {
  font-size: 20px
}

.contactForm .phone-input {
  display: flex;
  align-items: center;
  position: relative;
}

.contactForm input {
  padding: 12px 8px;
  margin-right: 5px;
  box-sizing: border-box;
  font-size: larger;
  border-radius: 25px;
}

.contactForm .phone-input .prefix {
  width: 52px;
  position: absolute;
  left: 0;
  padding: 12px 8px;
  box-sizing: border-box;
  border-radius: 25px 0 0 25px;
  border-right: 1px solid #ccc;
  font-size: larger;
  color: #888;
}

.contactForm .phone-input .number {
  flex: 1;
  padding: 12px 0 12px 60px;
  box-sizing: border-box;
}

.contactForm>.btn {
  margin: auto;
}

</style>

