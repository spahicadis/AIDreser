<script setup>
import {ref, watch, reactive} from 'vue'
import { updateDogDocumentData } from '../../services/dogsAPI';
import { useProfileStore } from '@/stores/profileStore';
import infoIcon from "../assets/infoIcon.svg"
import VueSelect from 'vue3-select-component';

const profileStore = useProfileStore()

const option1 = ref("")
const option2 = ref("")

const newData = ref("")


//Dynamic data based on choice


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
    {label: 'Podaci psa', value: 'dog'},
    {label: 'Podaci vlasnika', value: 'user'},
  ]"

  />  
</div>

<div v-if="option1" class="w-fit h-fit flex flex-col gap-3">

  <VueSelect 
  v-model="option2"
  placeholder="Odaberite podatak"
  :should-autofocus-option="false"
  :options="option1 === 'user' ? [{
  label: 'Ime', value: 'name'
  },
  {
    label: 'Prezime', value: 'surname'
  },
  {
    label: 'Lozinka', value: 'password'
  }
  ] : [{
    label: 'Ime', value: 'name'
  }]"/>
</div>

<div v-if="option2" class="w-fit h-fit flex flex-col gap-3">

  <input class="border border-[#C3CCD6] h-[40px] rounded-md pl-3" placeholder="Novi podatak" v-model="newData"/>
  <button class="w-[343px] h-[48px] bg-[#006FEE] text-white rounded-[14px] mt-13 cursor-pointer" @click="handleUpdateDogDocumentData">Ažuriraj izmjene</button>
</div>

</div>

</template>