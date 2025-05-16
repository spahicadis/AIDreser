<script setup>
import { ref } from 'vue';
import { handleUserSignIn } from '../../services/authAPI.js';
import { toast } from 'vue3-toastify';
import { useRouter } from 'vue-router';
import logo from '../assets/OnBoardingLogo.svg'
const router = useRouter();

const userEmail = ref("");
const userPassword = ref("")

const resetInputs = () => {
  userEmail.value = "",
  userPassword.value = ""
}

const handleSignInAction = async() => {

  const user = {
    email: userEmail.value,
    password: userPassword.value,
  }

  try {
    const response = await handleUserSignIn(user)

    if(response.status === 200) {
      toast.success(response.message, {
      position: "top-center",
      autoClose: 3000,
    })
    resetInputs();
    router.push("/dashboard")
  }

  else {
    toast.error(response.message, {
      position: "top-center",
      autoClose: 3000,
    })
  }

  } catch (error) {

    toast.error(error.message, {position: "top-center", autoClose: 3000})
    
  }


}

</script>


<template>

<div class="min-w-md min-h-[520px] border rounded-md shadow-md border-[#E0E0E0] p-5 flex flex-col gap-4 items-center">

  <img :src="logo" alt="OnBoarding Logo"/>

  <h1 class="text-2xl font-semibold">Prijava</h1>

  <div class="w-[343px] h-[65px] flex flex-col gap-1">
    <label>Email</label>
    <input class="border border-[#C3CCD6] h-[40px] rounded-md pl-3" placeholder="Unesite email za prijavu" v-model="userEmail"
  </div>
  <div class="w-[343px] h-[65px] flex flex-col gap-1">
    <label>Lozinka</label>
    <input class="border border-[#C3CCD6] h-[40px] rounded-md pl-3" placeholder="Unesite lozinka za prijavu" v-model="userPassword"
  </div>

  <button class="w-[343px] h-[48px] bg-[#006FEE] text-white rounded-[14px] mt-13 cursor-pointer" @click="handleSignInAction()">Prijava</button>

</div>


</template>