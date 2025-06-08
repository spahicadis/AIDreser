<script setup>
import DashboardAskTrainerComponent from '@/components/DashboardAskTrainerComponent.vue';
import GeneralStatusComponent from '@/components/GeneralStatusComponent.vue';






</script>



<template>


  <div class="w-full h-screnn flex flex-col gap-5">
    <div>
      <GeneralStatusComponent />
    </div>
    <div class="w-[100%] h-[100%]">
      <DashboardAskTrainerComponent />
    </div>
  </div>





</template>