<script setup>
const coins = ref()


</script>
<template>
  <div class="inline-block relative w-64 con">
    <select v-model="coins" class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
      <option disabled value selected>Please select uno</option>
      <option value="1">1 moneta</option>
      <option value="5">5 monet</option>
      <option value="15">15 monet</option>
    </select>
    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
      <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
    </div>
    <button class="app" @click="$emit('dataSent', coins)">Approve</button>
  </div>

</template>
<style>
.app {
  width: 70px;
  height: 30px;
  background: red;
}
.con {
  display: flex;
  flex-direction: row;
  width: 200px;
  justify-content: space-evenly;
  margin-top: 50px;
}
</style>
