<script setup>
import {ref, computed, watch} from 'vue'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { cloundinaryUplodImage } from '../../services/cloudinaryAPI';
import { handleUserRegistration } from '../../services/registrationAPI';
import iconhint from '../assets/IconHint.svg'
import uploadicon from '../assets/UploadIcon.svg'

//Form input states:
const userName = ref("");
const userSurname = ref("");
const userEmail = ref("");
const userPassword = ref("");
const userRepeatedPassword = ref("");
const dogName = ref("");
const dogBreed = ref("");
const dogAge = ref("");
const dogWeight = ref("");
const dogTreat = ref("");
const dogImage = ref("");
const uploadedFile = ref()

const resetInputs = () => {
  userName.value = "";
  userSurname.value = "";
  userEmail.value = "";
  userPassword.value = "";
  userRepeatedPassword.value = "";
  dogName.value = "";
  dogBreed.value = "";
  dogAge.value = "";
  dogWeight.value = "";
  dogTreat.value  = "";
  dogImage.value = "";
  uploadedFile.value = ""
}

//Form step indicator 
const activeStep = ref(1);


//Check before going on next step. Validates if all inputs if fulfilled and valids
//Displaying messasges based on "errors"
const handleActiveStep = (step) => {
  activeStep.value = step
}




//Retrieving the name of uploadad file to display it on the form
const handleUploadFile = async(e) => {
  const file = e.target.files[0]
  uploadedFile.value = `Odabrana slika: ${file.name}`
  const image_url = await cloundinaryUplodImage(file);
  dogImage.value = image_url;
}


const handleRegistrationAction = async() => {
  const user = {
    email: userEmail.value,
    password: userPassword.value,
  }

  //TODO slati podakte o psu. Objekt dog!

  try {
    const response = await handleUserRegistration(user);
  
    if(response.status === 200) {
      toast.success(response.message, {
        autoClose: 1000,
        position: "top-center"
      })
      resetInputs()
    }

    else {
      toast.error(response.message, {autoClose: 2000, position: "top-center"})
    }
  } catch (error) {
    toast.error(error.message, {autoClose: 2000, position: "top-center"})
  }
}


</script>

<template>

  <div class="min-w-md flex items-center gap-1.5">
    <div class="flex gap-1.5 items-center">
      <div class="w-8 h-8 flex justify-center items-center border border-[#E0E0E0] rounded-full" :class="activeStep === 1 ? 'bg-blue-200' : 'bg-white'" >
        1
      </div>
      <span class="">Podaci Vlasnika</span>
    </div>
    <div class="flex-1 bg-[#E0E0E0] h-px mx-2">

    </div>
    <div class="flex gap-1.5 items-center">
      <div class="w-8 h-8 flex justify-center items-center border border-[#E0E0E0] rounded-full" :class="activeStep === 2 ? 'bg-blue-200' : 'bg-white'">
        2
      </div>
      <span class="">Podaci Psa</span>
    </div>
  </div>

  <div class="min-w-md min-h-[700px] border rounded-md border-[#E0E0E0] shadow-md p-5">
    <div v-if="activeStep === 1" class="w-full h-full flex flex-col items-center gap-2">
    <div class="flex flex-col gap-1 w-[343px] h-[76px]">
      <label>Ime</label>
      <input class="border border-[#C3CCD6] h-[40px] rounded-md pl-3" placeholder="Vaše ime"/>
    </div>
    <div class="flex flex-col gap-1 w-[343px] h-[76px]">
      <label>Prezime</label>
      <input class="border border-[#C3CCD6] h-[40px] rounded-md pl-3" placeholder="Vaše prezime"/>
    </div>
    <div class="flex flex-col gap-1 w-[343px] h-[101px]">
      <label>Email</label>
      <input class="border border-[#C3CCD6] h-[40px] rounded-md pl-3" placeholder="Vaš email"/>
      <div class="flex gap-1.5 items-center">
        <img :src="iconhint" class="w-6 h-6 object-contain"/><span class="text-[#6A7682]">example@gmail.com</span>
      </div>
    </div>
    <div class="flex flex-col gap-1 w-[343px] h-[76px]">
      <label>Lozinka</label>
      <input class="border border-[#C3CCD6] h-[40px] rounded-md pl-3" type="password" placeholder="Unesite lozinku"/>
    </div>
    <div class="flex flex-col gap-1 w-[343px] h-[76px]">
      <label>Lozinka</label>
      <input class="border border-[#C3CCD6] h-[40px] rounded-md pl-3" type="password" placeholder="Ponovite lozinku"/>
    </div>

    <button class="w-[343px] h-[48px] bg-[#006FEE] text-white rounded-[14px] mt-13 cursor-pointer" @click="handleActiveStep(2)">Registriraj psa</button>
  </div>
  <div v-if="activeStep === 2" class="w-full h-full flex flex-col items-center gap-2 relative">
    <div class="flex flex-col gap-1 w-[343px] h-[76px]">
      <label>Ime</label>
      <input class="border border-[#C3CCD6] h-[40px] rounded-md pl-3" placeholder="Ime psa"/>
    </div>
    <div class="flex flex-col gap-1 w-[343px] h-[76px]">
      <label>Rasa</label>
      <input class="border border-[#C3CCD6] h-[40px] rounded-md pl-3" placeholder="Rasa psa"/>
    </div>
    <div class="flex flex-col gap-1 w-[343px] h-[76px]">
      <label>Starost</label>
      <input class="border border-[#C3CCD6] h-[40px] rounded-md pl-3" placeholder="Godine psa"/>
    </div>
    <div class="flex flex-col gap-1 w-[343px] h-[101px]">
      <label>Poslastica</label>
      <input class="border border-[#C3CCD6] h-[40px] rounded-md pl-3" placeholder="Marka poslastice"/>
      <div class="flex gap-1.5 items-center">
        <img :src="iconhint" class="w-6 h-6 object-contain"/><span class="text-[#6A7682]">Primjer: Pedigree</span>
      </div>
    </div>
    <div class="flex flex-col gap-1 w-[343px] h-[101px]">
      <label>Odaberite sliku Vašeg psa</label>
      <label for="file-input" class="w-[150px] h-[40px] rounded-md shadow-md flex items-center justify-center cursor-pointer"><img :src="uploadicon" alt="File upload icon"/></label>
      <input type="file" class="opacity-0 w-0 h-0 absolute" id="file-input" @change="(e) => handleUploadFile(e)"/>
      <span>{{ uploadedFile }}</span>
    </div>
  
    <div class="flex items-center gap-5 mt-13">
      <button class="h-[48px] text-red-700 hover:text-white border border-red-700 hover:bg-red-700 rounded-[14px] px-5 cursor-pointer" @click="handleActiveStep(1)">Korak natrag</button>   
      <button class="w-[180px] h-[48px] bg-[#006FEE] text-white rounded-[14px]">Dovršite registraciju</button>
    </div>
  </div>
  
</div>

</template>









