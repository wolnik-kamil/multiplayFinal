<template>
  <p>Coś poszło nie tak... Nie znaleziono adresu</p>
  <button @click="reloadPage">Spróbuj jeszcze raz</button>

</template>
<script setup lang="ts" defer >
  const reloadPage = () => {
    window.location.reload()
  }
</script>

