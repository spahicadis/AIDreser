<script setup>
import logo from '../assets/OnBoardingLogo.svg'
</script>

<template>
  <div
    class="sm:min-w-sm sm:max-w-sm min-h-[auto] border rounded-md border-[#E0E0E0] shadow-md flex flex-col gap-4 items-center p-5">
    <img :src="logo" alt="OnBoarding Logo">
    <p class="font-semibold text-lg sm:text-xl text-center text-wrap">Nemaš vremena za odlaske kod dresera?</p>
    <p class="text-center text-base font-semibold text-wrap">Ovo je pravo mjesto za tebe. Pridruži nam se</p>
    <div class="flex flex-col gap-2">
      <RouterLink to="/login"><button
          class="mt-6 sm:mt-12 w-full sm:w-[212px] h-[48px] bg-[#006FEE] text-white rounded-[14px] cursor-pointer font-bold">Prijavi
          se</button></RouterLink>
      <span class="text-xs self-end">Nemate račun? <strong class="cursor-pointer">
          <RouterLink to="/register">Kreirajte ga</RouterLink>
        </strong></span>
    </div>
  </div>
</template>
