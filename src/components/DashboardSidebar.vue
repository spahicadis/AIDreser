<script setup>
import { ref } from 'vue';
import { useProfileStore } from '@/stores/profileStore';
import { handleUserSignOut } from '../../services/authAPI';
import { useRoute, useRouter } from 'vue-router';
import homeIcon from "../assets/homeIcon.svg"
import settingsIcon from "../assets/settingsIcon.svg"
import logoutIcon from "../assets/log-out.svg"
import hamburgerIcon from "../assets/hamburgerIcon.svg"
const profileStore = useProfileStore()
const route = useRoute()
const router = useRouter()
const isMenuOpen = ref(false)

const handleToogleHamburger = () => {
  isMenuOpen.value = !isMenuOpen.value;
  console.log(isMenuOpen.value)
}

const handleSignOutAction = async() => {

  try {
    
    const response = await handleUserSignOut()

    if(response === 200) {
        router.push("/onboarding")
    }

  } catch (error) {
    throw new Error(error.message)  
  }

}

</script>

<template>

<div class="hidden lg:block min-w-[300px] h-screen lg:border-r-2 md:border-r-[#e5e7eb] lg:fixed lg:left-0 lg:top-0 lg:bottom-0 pt-1.5">
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
        <RouterLink 
        to="/dashboard/commands"
        >
        <li class="w-full h-15 flex items-center p-3 gap-3" :class="route.path == '/dashboard/commands' ? 'bg-blue-200 rounded-md' : ''">
          <img :src="homeIcon" alt="Home sidebar icon" class="w-7"/>
          <span>Naredbe</span>
        </li>
      </RouterLink>
      <RouterLink to="/dashboard/settings">
        <li class="w-full h-15 flex items-center p-3 gap-3" :class="route.path == '/dashboard/settings' ? 'bg-blue-200 rounded-md' : ''">
          <img :src="settingsIcon" alt="Settings sidebar icon" class="w-7"/>
          <span>Postavke</span>
        </li>
      </RouterLink>
      </ul>
    </div>
    <div class="w-full flex gap-3 items-center mt-auto cursor-pointer" @click="handleSignOutAction()">
      <img :src="logoutIcon" alt="Logout sidebar icon"/>
      <span>Odjava</span>
    </div>
  </div>
</div>
<div class="sticky top-0 w-full min-h-[60px] max-h-[60px] shadow-xl lg:hidden flex flex-row items-center justify-between border-[#EEEEEE] rounded-full p-5 z-99 bg-[#f6f9fc]">
  <div>
  <div class="flex items-center gap-3" v-if="profileStore.isLoading">
    <div class="h-[48px] bg-gray-200 rounded-full dark:bg-gray-700 w-[48px]"></div>
    <div class="h-[24px] bg-gray-200 rounded-full dark:bg-gray-700 w-[176px]"></div>
  </div>
  <div class="flex items-center gap-3" v-else>
  <img :src="profileStore.profileData.dog.image" class="rounded-full w-12 h-12" />
  <h1 class="text-md">Pozdrav {{ profileStore.profileData.user.name }} i {{ profileStore.profileData.dog.name }}</h1>
</div>
</div>
<div @click="handleToogleHamburger()">
  <img :src="hamburgerIcon" class="w-12 h-12 cursor-pointer" alt="Hamburger navbar icon"/>
</div>
</div>
<div>

</div>
<Transition name="slide-animation">
<div v-if="isMenuOpen" class="fixed inset-0 w-full h-screen backdrop-blur-xs z-50">
  <ul class="z-30 fixed top-[60px] p-5 bg-white w-full">
        <RouterLink 
        to="/dashboard/commands"
        >
        <li class="w-full h-15 flex items-center p-3 gap-3" :class="route.path == '/dashboard/commands' ? 'bg-blue-200 rounded-md' : ''">
          <img :src="homeIcon" alt="Home sidebar icon" class="w-7"/>
          <span>Naredbe</span>
        </li>
      </RouterLink>
      <RouterLink to="/dashboard/settings">
        <li class="w-full h-15 flex items-center p-3 gap-3" :class="route.path == '/dashboard/settings' ? 'bg-blue-200 rounded-md' : ''">
          <img :src="settingsIcon" alt="Settings sidebar icon" class="w-7"/>
          <span>Postavke</span>
        </li>
      </RouterLink>
      <li class="w-full h-15 flex items-center p-3 gap-3" @click="handleSignOutAction()">
        <img :src="logoutIcon" alt="Logout sidebar icon"/>
        <span>Odjava</span>
      </li>
      </ul>
</div>
</Transition>
</template>


<style scoped>

.slide-animation-enter-from {
transform: translateY(-100px);
opacity: 0;
}

.slide-animation-enter-to{
  transform: translateY(0px);
  opacity: 1;
}

.slide-animation-enter-active {
  transition: all 0.3s ease-in;
}

.slide-animation-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.slide-animation-leave-to {
  transform: translateY(-100px);
  opacity: 0;
}

.slide-animation-leave-active {
  transition: all 0.3s ease-in;
}


</style>



