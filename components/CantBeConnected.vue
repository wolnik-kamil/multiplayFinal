<script setup lang="ts">



</script>
<template>

  <div class="con">
    <header>
      <h1>Dane kontaktowe</h1>
    </header>
    <main>
      <div class="contactForm">
        <label for="">
          <span>Imię</span>
          <input type="text">
        </label>

        <label for="">
          <span>Nazwisko</span>
          <input type="text">
        </label>

        <label for="">
          <span>Nr. telefonu</span>
          <input type="text">
        </label>
        <button class="btn">Wyślij</button>
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
  width: 20rem;
  margin: auto;
  text-align: center;
}

.contactForm {
  display: flex;
  flex-direction: column;
}

.contactForm>label {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}

.contactForm>.btn {
  margin: auto
}

</style>