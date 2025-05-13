<script setup>
import logo from '../assets/OnBoardingLogo.svg'



</script>



<template>

<div class="min-w-sm min-h-[458px] border rounded-md border-[#E0E0E0] shadow-md flex flex-col gap-4 items-center">
<img :src="logo" alt="OnBoarding Logo">
<p>Nemaš vremena za odlaske kod dresera?</p>
<p class="text-center">Ovo je pravo mjesto za tebe.<br/> Pridruži nam se</p>
<div class="flex flex-col gap-2">
<RouterLink to="/login"><button class="mt-12 w-[212px] h-[48px] bg-[#006FEE] text-white rounded-[14px] cursor-pointer">Prijavi se</button></RouterLink>
<span class="text-xs self-end">Nemate račun? <strong class="cursor-pointer"><RouterLink to="/register">Kreirajte ga</RouterLink></strong></span>
</div>
</div>

</template>