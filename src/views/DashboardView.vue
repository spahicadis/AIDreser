<script setup>
import { useAuthStore } from '@/stores/authStore';
const authStore = useAuthStore();





</script>




<template>

<h1>Dobrodošli {{ authStore.currentUser.email }}</h1>




</template>