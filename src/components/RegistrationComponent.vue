<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { handleUserRegistration } from '../../services/authAPI.js';
import { cloundinaryUplodImage } from '../../services/cloudinaryAPI.js';
import iconhint from '../assets/IconHint.svg'
import uploadIcon from '../assets/uploadIcon.svg'
const router = useRouter();

//Form input states:
const userName = ref("");
const userSurname = ref("");
const userEmail = ref("");
const userPassword = ref("");
const dogName = ref("");
const dogBreed = ref("");
const dogAge = ref("");
const dogWeight = ref("");
const dogTreat = ref("");
const dogImage = ref("");
const uploadedFile = ref();

const isDisabledFirst = ref(true);
const isDisabledSecond = ref(true)

const resetInputs = () => {
  userName.value = "";
  userSurname.value = "";
  userEmail.value = "";
  userPassword.value = "";
  dogName.value = "";
  dogBreed.value = "";
  dogAge.value = "";
  dogWeight.value = "";
  dogTreat.value = "";
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


watch([userName, userSurname, userEmail, userPassword], () => {
  if (userName.value && userSurname.value && userEmail.value && userPassword.value) {
    isDisabledFirst.value = false;
  }
  else {
    isDisabledFirst.value = true;
  }
})
watch([dogName, dogBreed, dogAge, dogWeight, dogTreat, dogImage], () => {
  if (dogName.value && dogBreed.value && dogAge.value && dogWeight.value, dogTreat.value, dogImage.value) {
    isDisabledSecond.value = false;
  }
  else {
    isDisabledSecond.value = true;
  }
})


//Retrieving the name of uploadad file to display it on the form
const handleUploadFile = async (e) => {
  const file = e.target.files[0]
  uploadedFile.value = `Odabrana slika: ${file.name}`
  const image_url = await cloundinaryUplodImage(file);
  dogImage.value = image_url;
}


const handleRegistrationAction = async () => {
  const user = {
    email: userEmail.value,
    password: userPassword.value,
    name: userName.value,
    surname: userSurname.value,
  }

  const dog = {
    name: dogName.value,
    breed: dogBreed.value,
    age: dogAge.value,
    weight: dogWeight.value,
    treat: dogTreat.value,
    image: dogImage.value,
  }

  try {
    const response = await handleUserRegistration(user, dog);

    if (response.status === 200) {
      toast.success(response.message, {
        autoClose: 3000,
        position: "top-center"
      })
      resetInputs()
      setTimeout(() => {
        router.push('/dashboard/commands')
      }, 2000)
    }

    else {
      toast.error(response.message, { autoClose: 3000, position: "top-center" })
    }
  } catch (error) {
    toast.error(error.message, { autoClose: 3000, position: "top-center" })
  }
}


</script>

<template>

  <div class="w-full sm:min-w-md sm:max-w-md flex items-center gap-1.5">
    <div class="flex gap-1.5 items-center">
      <div class="w-8 h-8 flex justify-center items-center border border-[#E0E0E0] rounded-full"
        :class="activeStep === 1 ? 'bg-blue-200' : 'bg-white'">
        1
      </div>
      <span class="">Podaci Vlasnika</span>
    </div>
    <div class="flex-1 bg-[#E0E0E0] h-px mx-2">

    </div>
    <div class="flex gap-1.5 items-center">
      <div class="w-8 h-8 flex justify-center items-center border border-[#E0E0E0] rounded-full"
        :class="activeStep === 2 ? 'bg-blue-200' : 'bg-white'">
        2
      </div>
      <span class="">Podaci Psa</span>
    </div>
  </div>

  <div class="w-full sm:min-w-md sm:max-w-md min-h-[auto] border rounded-md border-[#E0E0E0] shadow-md p-5">
    <div v-if="activeStep === 1" class="w-full flex flex-col items-center gap-2">
      <div class="flex flex-col gap-1 w-full sm:w-[343px] min-h-[auto]">
        <label>Ime</label>
        <input class="border border-[#C3CCD6] h-[40px] rounded-md pl-3" placeholder="Vaše ime" v-model="userName" />
      </div>
      <div class="flex flex-col gap-1 w-full sm:w-[343px] min-h-[auto]">
        <label>Prezime</label>
        <input class="border border-[#C3CCD6] h-[40px] rounded-md pl-3" placeholder="Vaše prezime"
          v-model="userSurname" />
      </div>
      <div class="flex flex-col gap-1 w-full sm:w-[343px] min-h-[auto]">
        <label>Email</label>
        <input class="border border-[#C3CCD6] h-[40px] rounded-md pl-3" placeholder="Vaš email" v-model="userEmail" />
        <div class="flex gap-1.5 items-center">
          <img :src="iconhint" class="w-6 h-6 object-contain" /><span
            class="text-[#6A7682] text-wrap">example@gmail.com</span>
        </div>
      </div>
      <div class="flex flex-col gap-1 w-full sm:w-[343px] min-h-[auto]">
        <label>Lozinka</label>
        <input class="border border-[#C3CCD6] h-[40px] rounded-md pl-3" type="password" placeholder="Unesite lozinku"
          v-model="userPassword" />
      </div>
      <button
        class="w-full sm:w-[343px] h-[48px] bg-[#006FEE] text-white font-semibold rounded-[14px] mt-6 sm:mt-12 cursor-pointer disabled:opacity-50 disbled:cursor-not-allowed"
        @click="handleActiveStep(2)" :disabled="isDisabledFirst">Registriraj psa</button>
    </div>
    <div v-if="activeStep === 2" class="w-full h-full flex flex-col items-center gap-2">
      <div class="flex flex-col gap-1 w-full sm:w-[343px] min-h-[auto]">
        <label>Ime</label>
        <input class="border border-[#C3CCD6] h-[40px] rounded-md pl-3" placeholder="Ime psa" v-model="dogName" />
      </div>
      <div class="flex flex-col gap-1 w-full sm:w-[343px] min-h-[auto]">
        <label>Rasa</label>
        <input class="border border-[#C3CCD6] h-[40px] rounded-md pl-3" placeholder="Rasa psa" v-model="dogBreed" />
      </div>
      <div class="flex flex-col gap-1 w-full sm:w-[343px] min-h-[auto]">
        <label>Starost</label>
        <input class="border border-[#C3CCD6] h-[40px] rounded-md pl-3" placeholder="Godine psa" v-model="dogAge" />
      </div>
      <div class="flex flex-col gap-1 w-full sm:w-[343px] min-h-[auto]">
        <label>Težina</label>
        <input class="border border-[#C3CCD6] h-[40px] rounded-md pl-3" placeholder="Težina psa u kg"
          v-model="dogWeight" />
      </div>
      <div class="flex flex-col gap-1 w-full sm:w-[343px] min-h-[auto]">
        <label>Poslastica</label>
        <input class="border border-[#C3CCD6] h-[40px] rounded-md pl-3" placeholder="Marka poslastice"
          v-model="dogTreat" />
        <div class="flex gap-1.5 items-center">
          <img :src="iconhint" class="w-6 h-6 object-contain" /><span class="text-[#6A7682]">Primjer: Pedigree</span>
        </div>
      </div>
      <div class="flex flex-col gap-1 w-full sm:w-[343px] min-h-[auto]">
        <label>Odaberite sliku Vašeg psa</label>
        <label for="file-input"
          class="h-[40px] rounded-md shadow-md flex items-center justify-center cursor-pointer"><img :src="uploadIcon"
            alt="File upload icon" /></label>
        <input type="file" class="opacity-0 w-0 h-0 absolute" id="file-input" @change="(e) => handleUploadFile(e)" />
        <span class="text-xs">{{ uploadedFile }}</span>
      </div>

      <div class="flex w-full justify-center items-center gap-5 mt-2 sm:mt-12">
        <button class="h-[48px] w-1/2 text-red-700 border border-red-700 rounded-[14px] px-5 cursor-pointer"
          @click="handleActiveStep(1)">Korak natrag</button>
        <button
          class="w-1/2 h-[48px] bg-[#006FEE] text-white rounded-[14px] cursor-pointer font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          @click="handleRegistrationAction" :disabled="isDisabledSecond">Dovršite registraciju</button>
      </div>
    </div>

  </div>

</template>
