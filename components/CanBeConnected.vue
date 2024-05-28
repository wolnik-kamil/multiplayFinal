<script setup lang="ts" xmlns="http://www.w3.org/1999/html">

const net = ref<string>('1')
const mesh = ref<string>('0')
const symmetrical = ref<string>('0')
const VoIP = ref<string>('0')
const tv = ref<string>('0')
const canalPlus = ref<string>('0')
const multiroom = ref<string>('0')
const pvr = ref<string>('0')


const offerCode = ref<string>('')

async function generateCode() {
  offerCode.value = net.value + mesh.value + symmetrical.value + VoIP.value + tv.value + canalPlus.value + multiroom.value + pvr.value + '000000'
}



</script>
<template>
  <div class="con">
    <header>
      <h1>Konfigurator oferty</h1>
    </header>
    <main>
      <div class="offerConfiguration">
        <label for="net">
          <span>Prędkość internetu</span>
          <select v-model="net">
            <option value="01">500 mbps</option>
            <option value="02">800 mbps</option>
            <option value="03">1000 mbps</option>
          </select>
        </label>
        <label for="">
          <span>Łącze symetryczne</span>
          <input v-model="symmetrical" true-value="1" false-value="0" type="checkbox">
        </label>
        <label for="">
          <span>Telefon</span>
          <input  v-model="VoIP" true-value="1" false-value="0" type="checkbox">
        </label>
        <label for="">
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



</style>

