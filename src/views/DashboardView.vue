<script setup>
import {ref, onMounted} from 'vue'
import { handleUserSignOut } from '../../services/authAPI';
import { useRouter } from 'vue-router';
import { useProfileStore } from '@/stores/profileStore';

const profileStore = useProfileStore();
const router = useRouter();

onMounted(async() => {

  try {
    await profileStore.getProfileData()
  
  } catch(error) {
    throw new Error(error.messsage)
  }
  
})

const handleSignOutAction = async() => {

  try {

    const response = await handleUserSignOut();
    if(response === 200) {
      router.push("/onboarding")
    }

  } catch (error) {

    throw new Error(error.messsage)
  }

}

</script>




<template>

<div v-if="profileStore.isLoading" class="animate-pulse">
  <h1>Dobrodošli</h1>
  <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
</div>
<div v-else>
  <h1>Dobrodošli {{ profileStore.profileData.user.name }} i {{ profileStore.profileData.dog.name }}</h1>

</div>



<button class="cursor-pointer" @click="handleSignOutAction()">Odjavite se</button>

</template>