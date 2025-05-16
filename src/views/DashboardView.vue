<script setup>
import { useAuthStore } from '@/stores/authStore';
import { handleUserSignOut } from '../../services/authAPI';
import { useRouter } from 'vue-router';
const authStore = useAuthStore();
const router = useRouter();





const handleSignOutAction = async() => {

  try {

    const response = await handleUserSignOut();
    if(response === 200) {
      router.push("/onboarding")
    }

  } catch (error) {
    console.log(error.messsage);
  }

}


</script>




<template>

<h1>Dobrodošli {{ authStore.currentUser.email || "" }}</h1>

<button class="cursor-pointer" @click="handleSignOutAction()">Odjavite se</button>




</template>