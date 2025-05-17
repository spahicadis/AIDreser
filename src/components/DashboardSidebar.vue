<script setup>
import { useProfileStore } from '@/stores/profileStore';
import homeIcon from "../assets/homeIcon.svg"
import settingsIcon from "../assets/settingsIcon.svg"
import logoutIcon from "../assets/log-out.svg"
const profileStore = useProfileStore()








</script>




<template>

<div class="min-w-[300px] h-screen md:border-r-2 md:border-r-[#e5e7eb] fixed left-0 top-0 bottom-0 pt-1.5">
  <div class="w-full h-full flex flex-row md:flex-col md:gap-15 p-4">
    <div class="w-full h-1/13 flex flex-row gap-3.5 items-center">
      <div v-if="profileStore.isLoading" class="animate-pulse">
        <div class="h-[68px] bg-gray-200 rounded-full dark:bg-gray-700 w-[68px]"></div>
      </div>
      <div v-else>
        <img :src="profileStore.profileData.dog.image" alt="Dog avatar image" class="rounded-full w-17 h-17"/>
      </div>
      <div v-if="profileStore.isLoading" class="animate-pulse">
        <div class="h-[24px] bg-gray-200 rounded-full dark:bg-gray-700 w-[176px]"></div>
      </div>
      <div v-else>
      <h1 class="text-[#757575] text-md">Pozdrav {{ profileStore.profileData.user.name }} i {{ profileStore.profileData.dog.name }}</h1>
    </div>
    </div>
    <div class="w-full h-1/6 flex flex-col gap-3.5">
      <ul>
        <RouterLink to="/commands">
        <li class="w-full h-15 flex items-center p-3 gap-3 bg-blue-200 rounded-md">
          <img :src="homeIcon" alt="Home sidebar icon" class="w-7"/>
          <span>Naredbe</span>
        </li>
      </RouterLink>
      <RouterLink to="/settings">
        <li class="w-full h-15 flex items-center p-3 gap-3">
          <img :src="settingsIcon" alt="Settings sidebar icon" class="w-7"/>
          <span>Postavke</span>
        </li>
      </RouterLink>
      </ul>
    </div>
    <div class="w-full flex gap-3 items-center mt-auto cursor-pointer">
      <img :src="logoutIcon" alt="Logout sidebar icon"/>
      <span>Odjava</span>
    </div>
  </div>
</div>

</template>