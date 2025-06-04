<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();


</script>




<template>

<div class="p-5 w-full ">
  <h1 class="text-xl font-semibold">Stranica ne postoji</h1>
  <span class="text-sm text-gray-800 underline cursor-pointer" @click="router.back()">Povratak gdje ste bili</span>
</div>
</template>