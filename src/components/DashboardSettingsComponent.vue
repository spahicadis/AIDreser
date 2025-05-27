<script setup>
import {ref} from 'vue'
import { updateDogDocumentData } from '../../services/dogsAPI';
import { useProfileStore } from '@/stores/profileStore';
import infoIcon from "../assets/infoIcon.svg"
import VueSelect from 'vue3-select-component';

const profileStore = useProfileStore()

const option1 = ref("")
const option2 = ref("")

const newData = ref("")


const handleUpdateDogDocumentData = async() => {
  try {

    if(option1.value == 'dog') {
      await updateDogDocumentData(profileStore.profileData.uid , option2.value, newData.value)
    }
    else {
      alert("Nije jos implementirano za vlasnika bit ce")
    }
    
    option1.value = "";
    option2.value = "";
    newData.value = "";  
    
  } catch (error) {
    throw new Error(error.message)
  }
}





</script>





<template>

<div class="w-full h-auto flex flex-col gap-3.5 border border-[#EEEEEE] shadow-sm rounded-lg p-4">
<div class="w-full h-fit flex items-center gap-5">
  <img :src="infoIcon">
  <h1 class="text-md">Postavke i podaci Vašeg računa</h1>
</div>

<div class="max-w-[343px] flex flex-col gap-4">
  <div class="w-full flex flex-col gap-2">
  <label class="text-md">Odaberite čije podatke želite uređivati</label>
  <VueSelect
  v-model="option1"
  class="border-neutral-300 shadow-sm" 
  placeholder="Podaci psa ili vlasnika"
  :should-autofocus-option="false"
  :options="[
    {label: 'Podaci psa', value: 'dog'},
    {label: 'Podaci vlasnika', value: 'user'},
  ]"
  />
</div>
  <div class="w-full flex flex-col gap-2">
  <label class="text-md">Podatak</label>
  <VueSelect 
  v-model="option2"
  class="border-neutral-300 shadow-sm"
  placeholder="Odaberite podatak za izmjenu"
  :should-autofocus-option="false"
  :options="option1 === 'user' ? [{
    label: 'Ime', value: 'name',
  },
  {
    label: 'Prezime', value: 'surname'
  },
  {
    label: 'Promjeni lozinku', value: 'password'
  },
  ] : option1 === 'dog' ? [{
    label: 'Ime', value: 'name'
  }, {
    label: 'Godine', value: 'age',
  }, {
    label: 'Težina', value: 'weight',
  },
  {
    label: 'Pasmina', value: 'breed',
  }, {
    label: 'Slika', value: 'image',  
  },
  {
    label: 'Poslastica', value: 'treat',
  }
  
  ] : [
    {label: 'Nema podataka za prikaz! ', value: 'none'}
  ] "/>
  </div>
  
  <div class="w-full flex flex-col gap-2">
    <label class="text-md">Podatak</label>
    <input class="h-[40px] rounded-md border-neutral-300 shadow-sm border-1 px-2" placeholder="Izmjenite podatak" v-model="newData"/>
  </div>

  <div class="w-full">
    <button class="bg-[#006FEE] w-full not-even:h-[48px] rounded-lg text-white font-semibold cursor-pointer" @click="handleUpdateDogDocumentData">Spremi</button>
  </div>

</div>


</div>

</template>