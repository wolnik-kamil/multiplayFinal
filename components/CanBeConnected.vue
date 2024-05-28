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
  <div class="container">
    <header>
      <h1>Konfigurator oferty</h1>
    </header>
    <main>
      <div class="offerConfiguration">
        <label for="net">
          Prędkość internetu
          <select v-model="net">
            <option value="01">500 mbps</option>
            <option value="02">800 mbps</option>
            <option value="03">1000 mbps</option>
          </select>
        </label>
        <label for="">
          Łącze symetryczne
          <input v-model="symmetrical" true-value="1" false-value="0" type="checkbox">
        </label>
        <label for="">
          Telefon
          <input  v-model="VoIP" true-value="1" false-value="0" type="checkbox">
        </label>
        <label for="">
          Telewizja
          <input v-model="tv" true-value="1" false-value="0" type="checkbox">
        </label>
        <label for="TV" v-if="tv != '0'">
          TV
          <select v-model="tv">
            <option value="1" >Multi TV</option>
            <option value="2">MultiMax TV</option>
          </select>
        </label>
        <label for="">
          Canal+ Prestige
          <input  v-model="canalPlus" true-value="1" false-value="0" type="checkbox">
        </label>
        <label for="">
          Multiroom
          <input  v-model="multiroom" true-value="1" false-value="0" type="checkbox">
        </label>
        <label for="" v-if="tv == '1'">
          PVR M
          <input  v-model="pvr" true-value="1" false-value="0" type="checkbox">
        </label>
        <label for="" v-else-if="tv == '2'">
          PVR L
          <input  v-model="pvr" true-value="1" false-value="0" type="checkbox">
        </label>
        <button @click="generateCode"></button>
      </div>
    </main>
    <footer>

    </footer>
  </div>
</template>
<style>
.container {
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

.offerConfiguration input {
  cursor: pointer;
  background-color: #444;
  padding: 20px;
}
</style>

