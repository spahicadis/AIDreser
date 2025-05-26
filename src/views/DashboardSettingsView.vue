<script setup>
import DashboardSettingsComponent from '@/components/DashboardSettingsComponent.vue';
import GeneralStatusComponent from '@/components/GeneralStatusComponent.vue';


</script>

<template>

<div class="w-full h-screen flex flex-col gap-5">
<div class="">
<GeneralStatusComponent/>
</div>
<div class="w-[100%] h-[100%]">
<DashboardSettingsComponent/>
</div>
</div>
  
</template>