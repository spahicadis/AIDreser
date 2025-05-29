<script setup>
import {ref} from 'vue'
import { useRouter } from 'vue-router';
import { updateDogDocumentData } from '../../services/dogsAPI';
import { updateUserDocumentData } from '../../services/usersAPI';
import { useProfileStore } from '@/stores/profileStore';
import { cloundinaryUplodImage } from '../../services/cloudinaryAPI';
import { deleteDogDocument } from '../../services/dogsAPI';
import { deleteUserDocument } from '../../services/usersAPI';
import infoIcon from "../assets/infoIcon.svg"
import VueSelect from 'vue3-select-component';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { auth } from '../../services/firebase';
const profileStore = useProfileStore()
const router = useRouter()

const option1 = ref("")
const option2 = ref("")
const newData = ref("")


const handleUpdateDogDocumentData = async() => {
  try {
    if(option1.value === 'dog') {
      await updateDogDocumentData(profileStore.profileData.uid , option2.value, newData.value)
    }
   
    if(option1.value === 'user') {
      await updateUserDocumentData(profileStore.profileData.uid, option2.value, newData.value)
    }
    
    toast.success(`Podaci ${option1.value === 'user' ? 'korisnika' : 'psa'} uspješno ažurirani`)
    
  } catch (error) {
    throw new Error(error.message)

  } finally {
    option1.value = "";
    option2.value = "";
    newData.value = "";  
  }
}


const handleFileUpload = async(e) => {
  const file = e.target.files[0]
  const img_url = await cloundinaryUplodImage(file)
  newData.value = img_url
}


const handleDelete = async() => {
  try {
    await Promise.all([
      deleteUserDocument(profileStore.profileData.uid),
      deleteDogDocument(profileStore.profileData.uid)
    ])
    let user = auth.currentUser
    user?.delete()
    router.push('/onboarding')

  } catch (error) {
    throw new Error(error.message)
  }
}


</script>



<template>

<div class="w-full h-auto flex flex-col gap-3.5 border border-[#EEEEEE] shadow-sm rounded-lg p-4">
<div class="w-full h-fit flex items-center gap-5">
  <img :src="infoIcon" alt="Info description">
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
    <input class="h-[40px] rounded-md border-neutral-300 shadow-sm border-1 px-2" placeholder="Izmjenite podatak" v-model="newData" v-if="option2!=='image'"/>
    <label v-if="option2==='image'" for="image-upload" class="p-3 border-neutral-300 shadow-md rounded-md max-w-fit text-lg font-semibold cursor-pointer">Nova slika</label>
    <input v-if="option2==='image'" type="file" id="image-upload" class="opacity-0 h-0 w-0 absolute" @change="handleFileUpload">
  </div>

  <div class="w-full flex flex-col gap-3 items-start">
    <button class="bg-[#006FEE] w-full not-even:h-[48px] rounded-lg text-white font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"  @click="handleUpdateDogDocumentData"  :disabled="!newData">Spremi</button>
    <button class="bg-red-500 p-2 rounded-md text-white cursor-pointer" @click="handleDelete">Obriši račun</button>
  </div>

</div>


</div>

</template>