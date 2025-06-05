<script setup>
import logo from '../assets/OnBoardingLogo.svg'
import { ref, watch } from 'vue';
import { handleUserSignIn } from '../../services/authAPI.js';
import { toast } from 'vue3-toastify';
import { useRouter } from 'vue-router';
const router = useRouter();

const userEmail = ref("");
const userPassword = ref("")
const isDisabled = ref(true)

const resetInputs = () => {
  userEmail.value = ""
  userPassword.value = ""
}

watch([userEmail, userPassword], () => {
  if (userEmail.value && userPassword.value) {
    isDisabled.value = false
  }
  else {
    isDisabled.value = true
  }
})

const handleSignInAction = async () => {

  const user = {
    email: userEmail.value,
    password: userPassword.value,
  }

  try {
    const response = await handleUserSignIn(user)

    if (response.status === 200) {
      toast.success(response.message, {
        position: "top-center",
        autoClose: 3000,
      })
      resetInputs();
      setTimeout(() => {
        router.push("/dashboard/commands")
      }, 2000)

    }

    else {
      toast.error(response.message, {
        position: "top-center",
        autoClose: 3000,
      })
    }

  } catch (error) {

    toast.error(error.message, { position: "top-center", autoClose: 3000 })

  }

}

</script>


<template>

  <div
    class="w-full sm:min-w-md sm:max-w-md min-h-[auto] border rounded-md shadow-md border-[#E0E0E0] flex flex-col gap-4 items-center p-5">

    <img :src="logo" alt="OnBoarding Logo" />

    <h1 class="text-2xl font-semibold">Prijava</h1>

    <div class="w-full sm:min-w-[343px] sm:max-w-[343px] min-h-[atuo] flex flex-col gap-1">
      <label>Email</label>
      <input class="border border-[#C3CCD6] h-[40px] rounded-md pl-3" placeholder="Unesite email za prijavu"
        v-model="userEmail" </div>
      <div class="w-full sm:min-w-[343px] sm:max-w-[343px] min-h-[auto] flex flex-col gap-1">
        <label>Lozinka</label>
        <input type="password" class="border border-[#C3CCD6] h-[40px] rounded-md pl-3"
          placeholder="Unesite lozinka za prijavu" v-model="userPassword" </div>

        <button
          class="w-full sm:min-w-[343px] sm:max-w-[343px] h-[48px] bg-[#006FEE] text-white rounded-[14px] mt-6 sm:mt-12 cursor-pointer font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          @click="handleSignInAction()" :disabled="isDisabled">Prijava</button>

      </div>


</template>