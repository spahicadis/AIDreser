<script setup>
import {ref, watch, reactive} from 'vue'
import { updateDogDocumentData } from '../../services/dogsAPI';
import { useProfileStore } from '@/stores/profileStore';
import infoIcon from "../assets/infoIcon.svg"
import VueSelect from 'vue3-select-component';
const option1 = ref("")
const option2 = ref("")
const profileStore = useProfileStore()
const newData = ref("")


const constDataForEdit = reactive([])

//Dynamic data based on choice



const handleUpdateDogDocumentData = async() => {
  try {
      await updateDogDocumentData(profileStore.profileData.uid , "name", newData.value)
    
  } catch (error) {
    throw new Error(error.message)
  }
}





</script>





<template>

<div class="w-full min-h-[70%] flex flex-col gap-3.5 border border-[#EEEEEE] shadow-sm rounded-lg p-3">
<div class="w-full h-fit flex items-center gap-5">
  <img :src="infoIcon">
  <h1 class="text-md">Postavke i podaci Vašeg računa</h1>
</div>

<div class="w-fit h-fit flex flex-col gap-3">
  <label class="text-md">Odaberite za koga želite uređivati podatke</label>
  <VueSelect
  v-model="option1" 
  placeholder="Vrsta podataka"
  :should-autofocus-option="false"
  :options="[
    {label: 'Podaci vlasnika', value: 'user'},
    {label: 'Podaci psa', value: 'dog'},
  ]"
  />
</div>

<div v-if="option1">
<div class="w-fit h-fit flex flex-col gap-4">
  <label class="text-md">Odaberite podatak za uređivanje</label>
  <VueSelect
  v-model="option2" 
  placeholder="Vrsta podataka"
  :should-autofocus-option="false"
  :options="[
    {label: 'Ime', value: 'name'},
  ]"
  />
</div>
<div v-if="option2">
  <input type="text" class="border" v-model="newData"> 
</div>
<button @click="handleUpdateDogDocumentData">Azurirajte podatak</button>
</div>
</div>

</template>