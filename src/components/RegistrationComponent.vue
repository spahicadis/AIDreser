<script setup>
import {ref} from 'vue'
import iconhint from '../assets/IconHint.svg'
import uploadicon from '../assets/UploadIcon.svg'

const activeStep = ref(1);
const handleActiveStep = (step) => {
  activeStep.value = step
}

const uploadedFile = ref()

const handleUploadFile = (e) => {
  const file = e.target.files;
  const fileName = file[0]
  uploadedFile.value = `Odabrana slika: ${fileName.name}`
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
  
      
      <button class="w-[343px] h-[48px] bg-[#006FEE] text-white rounded-[14px] cursor-pointer ">Dovršite registraciju</button>
    
      <button class="absolute bottom-0 left-0  p-1.5 rounded-md shadow-lg text-red-500 cursor-pointer" @click="handleActiveStep(1)">Korak natrag</button>   
  </div>
</div>


</template>









