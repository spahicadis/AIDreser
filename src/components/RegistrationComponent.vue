<script setup>
import {ref, computed, watch} from 'vue'
import { cloundinaryUplodImage } from '../../services/CloudinaryAPI';
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

//Form step indicator 
const activeStep = ref(1);
const formErrNextStepInputRequiredMessage = ref(false);
const formErrNextStepInputValidateMessage = ref(false)
const nextStepButtonUIDisabled = ref(true);

//Check before going on next step. Validates if all inputs if fulfilled and valids
//Displaying messasges based on "errors"
const handleActiveStep = (step) => {
  if(!userName.value || !userSurname.value || !userEmail.value || !userPassword.value || !userRepeatedPassword.value || emailValidator.value !== 0 || passwordValidator.value !== 0 || repeatedPasswordValidator.value !== 0) {
    if(!userName.value || !userSurname.value || !userEmail.value || !userPassword.value || !userRepeatedPassword.value) {
      formErrNextStepInputRequiredMessage.value = true;
    }
    if(emailValidator.value !== 0 || passwordValidator.value !== 0 || repeatedPasswordValidator.value !== 0) {
      formErrNextStepInputValidateMessage.value = true
    }
    return
  }
  
  formErrNextStepInputRequiredMessage.value = false;
  formErrNextStepInputValidateMessage.value = false
  activeStep.value = step
}
//Basic checks for email.
//I understand that it's not that important because any email can go through during registration, but at least the format should be standard.
const emailValidator = computed(() => {
  //Email validations
  if(userEmail.value) {
    //Special characters
    if(/[!#$%^&*()+\=\[\]{};':"\\|,<>\/?~`]/.test(userEmail.value)) {
    return 1;
  }

  //Contain @
  if(!userEmail.value.includes("@")) {
    return 2
  }
  
  //Correct email format
  const partsOfTheEmail = userEmail.value.split("@");
  if(partsOfTheEmail.length === 2 && !partsOfTheEmail[1].length) {
    return 3
  }
  //Corect domain format
  if(partsOfTheEmail[1]) {
    const partsOfTheDomain = partsOfTheEmail[1].split(".");
    if(partsOfTheDomain.length !== 2 ||!partsOfTheDomain[0].length || !partsOfTheDomain[1].length) {
      return 4
    }
  }
}

return 0;
})

//Password verification. One check is related to the firebase policy, the others are additional
const passwordValidator = computed(() => {
   //Password validations
if(userPassword.value) {
  //Check length firebase policy for password
  if(userPassword.value.length < 6) {
    return 1;
  }

  //Chech if password containts minimum one special character
  if(!/[`~!@#$%^&*()_\-+={}[\]\\|:;"'<>,.?/]/.test(userPassword.value)) {
    return 2;
  }

  //Chech if password containts minimum one uppercase letter
  if(!/[A-Z]/.test(userPassword.value)) {
    return 3;
  }

  //Chech if password containts minimum one number
  if(!/[0-9]/.test(userPassword.value)) {
    return 4;
  }
}
return 0;
})

//Checking that passwords are equal
const repeatedPasswordValidator = computed(() => {
  //Check if repeated password is same as a password
if(userRepeatedPassword.value && userPassword.value) {
if(userRepeatedPassword.value != userPassword.value) {
  return 1
}
}
return 0;
})

//We keep track of input and validator states to keep the UI in sync after changes/fixes
//Also button indicator for UI
watch([userName, userSurname, userEmail, userPassword, userRepeatedPassword, emailValidator, passwordValidator, repeatedPasswordValidator], () => {
   if(userName.value && userSurname.value && userEmail.value && userPassword.value && userRepeatedPassword.value) {
    formErrNextStepInputRequiredMessage.value = false;
  }    
  if(emailValidator.value === 0 && passwordValidator.value === 0 && repeatedPasswordValidator.value === 0) {
    formErrNextStepInputValidateMessage.value = false;
  }
  if(userName.value && userSurname.value && userEmail.value && userPassword.value && userRepeatedPassword.value && emailValidator.value === 0 && passwordValidator.value === 0 && repeatedPasswordValidator.value === 0) {
    nextStepButtonUIDisabled.value = false;
  }
  if(!userName.value || !userSurname.value || !userEmail.value || !userPassword.value || !userRepeatedPassword.value || emailValidator.value !== 0 || passwordValidator.value !== 0 || repeatedPasswordValidator.value !== 0) {
    nextStepButtonUIDisabled.value = true;
  }
 })


 const checkDogAge = computed(() => {
  if(dogAge.value) {
    if(dogAge.value <= 1) {
      return 1;
    }
    if(dogAge.value > 1 && dogAge.value < 7) {
      return 2;
    }
    if(dogAge.value >= 7) {
      return 3
    }
  }
 })


//Retrieving the name of uploadad file to display it on the form
const uploadedFile = ref()
const handleUploadFile = async(e) => {
  const file = e.target.files[0]
  uploadedFile.value = `Odabrana slika: ${file.name}`
  const image_url = await cloundinaryUplodImage(file);
  dogImage.value = image_url;
  console.log(dogImage.value);
}

const formErrFinishStepInputRequiredMessage = ref(false);
const registerButtonUIDisabled = ref(true);
const handleRegistrationAction = async() => {

  if(!dogName.value || !dogAge.value || !dogBreed.value || !dogWeight.value || !dogTreat.value || !dogImage.value) {
    formErrFinishStepInputRequiredMessage.value = true;
    return;
  }
  //TODO



}



watch([dogName, dogBreed, dogAge, dogWeight, dogTreat, dogImage], () => {
  if(dogName.value && dogBreed.value && dogAge.value && dogWeight.value && dogTreat.value && dogImage.value) {
    formErrFinishStepInputRequiredMessage.value = false;
    registerButtonUIDisabled.value = false;
  }
})


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
      <input class="border border-[#C3CCD6] h-[40px] rounded-md pl-3" placeholder="Vaše ime" v-model="userName"/>
    </div>
    <div class="flex flex-col gap-1 w-[343px] h-[76px]">
      <label>Prezime</label>
      <input class="border border-[#C3CCD6] h-[40px] rounded-md pl-3" placeholder="Vaše prezime" v-model="userSurname"/>
    </div>
    <div class="flex flex-col gap-1 w-[343px] h-fit">
      <label>Email</label>
      <input class="border border-[#C3CCD6] h-[40px] rounded-md pl-3" placeholder="Vaš email" v-model="userEmail"/>
      <span class="text-red-500" v-if="emailValidator === 1">Email ne smije sadržavati specijalne znakove</span>
      <span class="text-red-500" v-if="emailValidator === 2">Email mora sadržavati @</span>
      <span class="text-red-500" v-if="emailValidator === 3">Neispravan format maila</span>
      <span class="text-red-500" v-if="emailValidator === 4">Neispravan format domene</span>
      <div class="flex gap-1.5 items-center">
        <img :src="iconhint" class="w-6 h-6 object-contain"/>
        <span class="text-[#6A7682]">example@gmail.com</span> 
      </div>
    </div>
    <div class="flex flex-col gap-1 w-[343px] h-fit">
      <label>Lozinka</label>
      <input class="border border-[#C3CCD6] h-[40px] rounded-md pl-3" type="password" placeholder="Unesite lozinku" v-model="userPassword"/>
      <span class="text-red-500" v-if="passwordValidator === 1">Lozinka mora sadržavati minimalno 6 znakova</span>
      <span class="text-red-500" v-if="passwordValidator === 2">Lozinka mora sadržavati barem jedan specijalni znak</span>
      <span class="text-red-500" v-if="passwordValidator === 3">Lozinka mora sadržavati barem jedno veliko slovo</span>
      <span class="text-red-500" v-if="passwordValidator === 4">Lozinka mora sadržavati barem jedan broj</span>
    </div>
    <div class="flex flex-col gap-1 w-[343px] h-fit">
      <label>Lozinka</label>
      <input class="border border-[#C3CCD6] h-[40px] rounded-md pl-3" type="password" placeholder="Ponovite lozinku" v-model="userRepeatedPassword"/>
      <span class="text-red-500" v-if="repeatedPasswordValidator === 1">Lozinke nisu iste</span>
    </div>

    <button class="w-[343px] h-[48px] bg-[#006FEE] text-white rounded-[14px] mt-13" :class="nextStepButtonUIDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer opacity-100'" @click="handleActiveStep(2)">Registriraj psa</button>
    <span v-if="formErrNextStepInputRequiredMessage" class="text-red-500">Molimo ispunite sva polja</span>
    <span v-if="formErrNextStepInputValidateMessage" class="text-red-500">Molimo popravite unesene vrijednosti</span>
  </div>
  <div v-if="activeStep === 2" class="w-full h-full flex flex-col items-center gap-2 relative">
    <div class="flex flex-col gap-1 w-[343px] h-[76px]">
      <label>Ime</label>
      <input class="border border-[#C3CCD6] h-[40px] rounded-md pl-3" placeholder="Ime psa" v-model="dogName"/>
    </div>
    <div class="flex flex-col gap-1 w-[343px] h-[76px]">
      <label>Rasa</label>
      <input class="border border-[#C3CCD6] h-[40px] rounded-md pl-3" placeholder="Rasa psa" v-model="dogBreed"/>
    </div>
    <div class="flex flex-col gap-1 w-[343px] h-fit">
      <label>Starost</label>
      <input class="border border-[#C3CCD6] h-[40px] rounded-md pl-3" placeholder="Godine psa" v-model="dogAge"/>
      <span class="text-green-600" v-if="checkDogAge === 1">Idealno vrijeme za početak dresure!</span>
      <span class="text-blue-600" v-if="checkDogAge === 2">Vaš pas je još uvijek odličan za učenje!</span>
      <span class="text-orange-500" v-if="checkDogAge === 3">Vaš pas je u odrasloj dobi. Budite strpljivi!</span>
    </div>
    <div class="flex flex-col gap-1 w-[343px] h-[76px]">
      <label>Težina</label>
      <input class="border border-[#C3CCD6] h-[40px] rounded-md pl-3" placeholder="Težina psa u kg" v-model="dogWeight"/>
    </div>
    <div class="flex flex-col gap-1 w-[343px] h-[101px]">
      <label>Poslastica</label>
      <input class="border border-[#C3CCD6] h-[40px] rounded-md pl-3" placeholder="Marka poslastice" v-model="dogTreat"/>
      <div class="flex gap-1.5 items-center">
        <img :src="iconhint" class="w-6 h-6 object-contain"/><span class="text-[#6A7682]">Primjer: Pedigree</span>
      </div>
    </div>
    <div class="flex flex-col gap-1 w-[343px] h-[101px]">
      <label>Odaberite sliku Vašeg psa</label>
      <label for="file-input" class="w-[150px] h-[40px] rounded-md shadow-md flex items-center justify-center cursor-pointer"><img :src="uploadicon" alt="File upload icon"/></label>
      <input type="file" accept="image/*" class="opacity-0 w-0 h-0 absolute" id="file-input" @change="(e) => handleUploadFile(e)"/>
      <span>{{ uploadedFile }}</span>
    </div>
  
    <div class="flex items-center gap-5 mt-3.5">
      <button class="h-[48px] text-red-700 hover:text-white border border-red-700 hover:bg-red-700 rounded-[14px] px-5 cursor-pointer" @click="handleActiveStep(1)">Korak natrag</button>   
      <button class="w-[180px] h-[48px] bg-[#006FEE] text-white rounded-[14px]" :class="registerButtonUIDisabled  ? 'cursor-not-allowed opacity-50' : 'cursor-pointer opacity-100'" @click="handleRegistrationAction()">Dovršite registraciju</button>
    </div>
    <span v-if="formErrFinishStepInputRequiredMessage" class="text-red-500">Molimo ispunite sva polja</span>
  </div>
</div>


</template>









