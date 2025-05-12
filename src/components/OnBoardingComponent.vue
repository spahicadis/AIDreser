<script setup>
import logo from '../assets/OnBoardingLogo.svg'



</script>



<template>

<div class="min-w-sm min-h-[458px] border rounded-md border-[#E0E0E0] shadow-md flex flex-col gap-4 items-center">
<img :src="logo" alt="OnBoarding Logo">
<p>Nemaš vremena za odlaske kod dresera?</p>
<p class="text-center">Ovo je pravo mjesto za tebe,<br/> pridruži nam se</p>
<div class="flex flex-col gap-2">
<button class="mt-12 w-[212px] h-[48px] bg-[#006FEE] text-white rounded-[14px]">Prijavi se</button>
<span class="text-xs self-end">Nemate račun? <strong>Kreirajte ga</strong></span>
</div>
</div>

</template>