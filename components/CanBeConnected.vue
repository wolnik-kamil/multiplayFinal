<script setup lang="ts" xmlns="http://www.w3.org/1999/html">
import { useConnectionStore } from '@/stores/conditionsStore';


// Conditions from response
const connectionStore = useConnectionStore();
//const connectionStatus = computed(() => connectionStore.connectionStatus);
const connectionConditions = computed(() => connectionStore.connectionConditions);
const maxNet = computed(() => connectionConditions.value?.sale_internet_max_speed ?? 0);
const isTv = computed(() => connectionConditions.value?.sale_iptv_access ?? false);
const tvChecked = ref(false);



//Price conditions of an offer
type ConditionType = {
  [key: string]: number
}

// Conditions for net speed selection
const netPriceCondition: ConditionType = {
  '01': 10,
  '02': 15,
  '03': 20
};

// Conditions for symmetrical connection selection
const symmetricalCondition: ConditionType = {
  '0': 0,
  '1': 20
};

// Conditions for VoIP selection
const voipCondition: ConditionType = {
  '0': 0,
  '1': 5
};

// Conditions for TV selection
const tvCondition: ConditionType = {
  '0': 0,
  '1': 10,
  '2': 20
};

// Conditions for Canal Plus selection
const canalPlusCondition: ConditionType = {
  '0': 0,
  '1': 15
};

// Conditions for Multiroom selection
const multiroomCondition: ConditionType = {
  '0': 0,
  '1': 10
};

// Conditions for PVR selection
const pvrCondition: ConditionType = {
  '0': 0,
  '1': 5
};

// Data from offer config. it creates unique offer code which will be sent to the server after sending final form (getUserData())
const x = ref<object>({
  net: ref<string>('01'),
  mesh: <string>('0'),
  symmetrical: <string>'0',
  voip: <string>'0',
  tv: <string>'0',
  canalPlus: <string>'0',
  multiroom: <string>'0',
  pvr: <string>'0'
})
const offerCode = ref<string>('')


//Clearing tv value after unchecking tv input
watch(tvChecked, (newValue) => {
  if(!newValue) {
    tv.value = '0'
    pvr.value = '0'
  }
})

// Prices based on the price conditions
const price = computed(() => {
  const netPrice = netPriceCondition[net.value] ?? 0;
  const symmetricalPrice = symmetricalCondition[symmetrical.value] ?? 0;
  const voipPrice = voipCondition[voip.value] ?? 0;
  const tvPrice = tvCondition[tv.value] ?? 0;
  const canalPlusPrice = canalPlusCondition[canalPlus.value] ?? 0;
  const multiroomPrice = multiroomCondition[multiroom.value] ?? 0;
  const pvrPrice = pvrCondition[pvr.value] ?? 0;

  return netPrice + symmetricalPrice + voipPrice + tvPrice + canalPlusPrice + multiroomPrice + pvrPrice;
});


//Generating offer code after submitting form
async function generateCode() {
  offerCode.value =
        net.value
      + mesh.value
      + symmetrical.value
      + voip.value
      + tv.value
      + canalPlus.value
      + multiroom.value
      + pvr.value
      + '000000'
}

// Validation for a phone number
const phone = ref<string>('');
const name = ref<string>('');
const surname = ref<string>('');
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
  console.log('Data:', userPhoneNumber, userName, userSurname, offerCode.value);
};



</script>
<template>


  <div class="con">
    <header>
      <h1 v-if="!offerCode">Konfigurator oferty</h1>
      <h1 v-else>Dane osobowe</h1>
    </header>
    <div class="price">{{price}}</div>
    <main>
      <div class="offerConfiguration" v-if="!offerCode">
        <label for="netId">
          <span>Prędkość internetu</span>
          <select id="netId" v-model="net">
            <option v-if="maxNet >= 500" value="01">500 mbps</option>
            <option v-if="maxNet >= 800" value="02">800 mbps</option>
            <option v-if="maxNet == 1000" value="03">1000 mbps</option>
          </select>
        </label>
        <label for="symmetricalId">
          <span>Łącze symetryczne</span>
          <input id="symmetricalId" v-model="symmetrical" true-value="1" false-value="0" type="checkbox">
        </label>
        <label for="voipId">
          <span>Telefon</span>
          <input id="voipId" v-model="voip" true-value="1" false-value="0" type="checkbox">
        </label>
        <label for="isTvId" v-if="isTv">
          <span>Telewizja</span>
          <input id="isTvId" v-model="tvChecked" type="checkbox">
          <select v-model="tv" :disabled="!tvChecked">
            <option :value="0" disabled hidden>Wybierz pakiet</option>
            <option value="1">Multi TV</option>
            <option value="2">MultiMax TV</option>
          </select>
        </label>
        <label for="canalPlusId">
          <span>Canal+ Prestige</span>
          <input id="canalPlusId" v-model="canalPlus" true-value="1" false-value="0" type="checkbox">
        </label>
        <label for="multiroomId">
          <span>Multiroom</span>
          <input id="multiroomId" v-model="multiroom" true-value="1" false-value="0" type="checkbox">
        </label>
        <label for="pvrMId" v-if="tv == '1'">
          <span>PVR M</span>
          <input id="pvrMId" v-model="pvr" true-value="1" false-value="0" type="checkbox">
        </label>
        <label for="pvrLId" v-else-if="tv == '2'">
          <span>PVR L</span>
          <input id="pvrLId" v-model="pvr" true-value="1" false-value="0" type="checkbox">
        </label>

        <button class="btn" @click="generateCode">Dalej</button>
      </div>
      <div v-else class="sendUserData">
        <div class="contactForm">
          <label for="Id">
            <span>Imię</span>
            <input v-model="name" type="text" required>
          </label>

          <label for="Id">
            <span>Nazwisko</span>
            <input v-model="surname" type="text" required>
          </label>

          <label for="Id">
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
  font-size: 24px
}

.offerConfiguration>label {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  border: 1px solid black
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

