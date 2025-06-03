<script setup>
import { useProfileStore } from '@/stores/profileStore';
import listicon from "../assets/listIcon.svg" 
import levelsIcon from "../assets/levelsIcon.svg"
import treatIcon from "../assets/treatIcon.svg"
const profileStore = useProfileStore()

</script>

<template>


<div class="max-w-[1600px] min-h-[120px] flex flex-col md:flex-row gap-5 lg:gap-8">
<div class="w-full h-[111px] md:w-1/3 lg:w-2/5 xl:w-[309px] flex flex-col gap-3.5 rounded-lg p-5 border border-[#EEEEEE] shadow-sm">
  <div class="w-full flex gap-2 items-center">
    <img :src="listicon" alt="Icon list" />
    <h3>Obavljeno naredbi</h3>
  </div>
  <div v-if="profileStore.isLoading" class="animate-pulse">
    <div class="ml-8 h-[24px] bg-gray-200 rounded-full w-[40px]"></div>
  </div>
  <div v-else>
    <p class="pl-8 font-semibold">{{ profileStore.profileData.dog.commandsFinished }}/10</p>
  </div>
</div>
<div class="w-full h-[111px] md:w-1/3 lg:3/10 xl:w-[240px] flex flex-col gap-3.5 rounded-lg p-5 border border-[#EEEEEE] shadow-sm">
  <div class="w-full flex gap-2 items-center">
    <img :src="levelsIcon" alt="Level icon" />
    <h3>Razina</h3>
  </div>
  <div v-if="profileStore.isLoading" class="animate-pulse">
    <div class="ml-8 h-[24px] bg-gray-200 rounded-full w-[80px]"></div>
  </div>
  <div v-else>
    <p class="pl-8 font-semibold">{{ profileStore.profileData.dog.level }}</p>
  </div>
</div>
<div class="w-full h-[111px] md:w-1/3 lg:w-3/10 xl:w-[240px] flex flex-col gap-3.5 rounded-lg p-5 border border-[#EEEEEE] shadow-sm">
  <div class="w-full flex gap-2 items-center">
    <img :src="treatIcon" alt="Treat icon" />
    <h3>Osvojeno poslastica</h3>
  </div>
  <div v-if="profileStore.isLoading" class="animate-pulse">
    <div class="ml-8 h-[24px] bg-gray-200 rounded-full w-[20px]"></div>
  </div>
  <div v-else>
    <p class="pl-8 font-semibold">{{ profileStore.profileData.dog.wonTreats }}</p>
  </div>
</div>
</div>


</template>