<script setup lang="ts">
import {CanBeConnected, CantBeConnected, HaventBeenFound, ContactForm, AddressForm} from '#components';
import { ConnectionConditionsEnum } from '@/enums/enums';
import {useConnectionStore} from "@/stores/conditionsStore";
const connectionStore = useConnectionStore();
const connectionStatus = computed(() => connectionStore.connectionConditions?.connection_conditions);

</script>
<template>
<div class="container" >
  <AddressForm v-if="!connectionStatus">
  </AddressForm>

  <div class="conditionsResults" v-else>
    <CanBeConnected v-if="connectionStatus === ConnectionConditionsEnum.CanBeConnected">
    </CanBeConnected>

    <CantBeConnected v-else-if="connectionStatus === ConnectionConditionsEnum.CantBeConnected">
    </CantBeConnected>

    <ContactForm v-else-if="connectionStatus === ConnectionConditionsEnum.SpecialOffer">
    </ContactForm>

    <HaventBeenFound v-else-if="connectionStatus === ConnectionConditionsEnum.HaventBeenFound">
    </HaventBeenFound>
  </div>
</div>



</template>
<style>

  .container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }



</style>