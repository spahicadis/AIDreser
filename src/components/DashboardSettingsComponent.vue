<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router';
import { updateDogDocumentData } from '../../services/dogsAPI.js';
import { updateUserDocumentData } from '../../services/usersAPI.js';
import { handleDeleteAccount } from '../../services/authAPI.js';
import { useProfileStore } from '@/stores/profileStore.js';
import infoIcon from "../assets/infoIcon.svg"
import VueSelect from 'vue3-select-component';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { cloundinaryUplodImage } from '../../services/cloudinaryAPI.js'

const profileStore = useProfileStore()
const router = useRouter()

const option1 = ref("")
const option2 = ref("")
const newData = ref("")
const currentValue = ref("")
const dangerModal = ref(false)


const handleUpdateDogDocumentData = async () => {
  try {
    if (option1.value === 'dog') {
      await updateDogDocumentData(profileStore.profileData.uid, option2.value, newData.value)
    }

    if (option1.value === 'user') {
      await updateUserDocumentData(profileStore.profileData.uid, option2.value, newData.value)
    }

    toast.success(`Podaci ${option1.value === 'user' ? 'korisnika' : 'psa'} uspješno ažurirani`)

  } catch (error) {
    throw new Error(error.message)

  } finally {
    option1.value = "";
    option2.value = "";
    newData.value = "";
    currentValue.value = "";
  }
}


const handleFileUpload = async (e) => {
  const file = e.target.files[0]
  const img_url = await cloundinaryUplodImage(file)
  newData.value = img_url
}

watch([option1, option2], () => {
  if (option1.value && option2.value) {
    const key1 = option1.value;
    const key2 = option2.value;
    if (key1 === 'user' && key2 === 'password') {
      currentValue.value = `Trenutna vrijednost: xxxxxxxxxxx`;
    }
    else
      currentValue.value = `Trenutna vrijednost: ${profileStore.profileData[key1][key2]}`;//Nije klasicna dot notacija za pristup vrijednostima jer su kljucevi u ovom slucaju dinamicki tj ovise o userovom selectu;

  }
})

const handleDangerModal = (e) => {
  dangerModal.value = e;
}




const handleDeleteAction = async () => {
  try {
    const response = await handleDeleteAccount(profileStore.profileData.uid)
    if (response === 200) {
      setTimeout(() => {
        toast.success("Račun uspješno obrisan. Hvala na korištenju AIDresera.")
      })
      router.push('/onboarding')
    }
    else {
      toast.error("Pogreška prilikom brisanja računa. Molimo ponovo se prijavite i pokušajte.")
    }
  } catch (error) {
    throw new Error(error.message)
  }
}


</script>



<template>

  <div class="w-full flex flex-col gap-3.5 border border-[#EEEEEE] shadow-sm rounded-lg p-4">
    <div class="w-full h-fit flex items-center gap-5">
      <img :src="infoIcon" alt="Info description">
      <h1 class="text-md">Postavke i podaci Vašeg računa</h1>
    </div>

    <div class="max-w-[343px] flex flex-col gap-4">
      <div class="w-full flex flex-col gap-2">
        <label class="text-md">Odaberite čije podatke želite uređivati</label>
        <VueSelect v-model="option1" class="border-neutral-300 shadow-sm" placeholder="Podaci psa ili vlasnika"
          :should-autofocus-option="false" :options="[
            { label: 'Podaci psa', value: 'dog' },
            { label: 'Podaci vlasnika', value: 'user' },
          ]" />
      </div>
      <div class="w-full flex flex-col gap-2">
        <label class="text-md">Podatak</label>
        <VueSelect v-model="option2" class="border-neutral-300 shadow-sm" placeholder="Odaberite podatak za izmjenu"
          :should-autofocus-option="false" :options="option1 === 'user' ? [{
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
            { label: 'Nema podataka za prikaz! ', value: 'none' }
          ]" />
      </div>

      <div class="w-full flex flex-col gap-2">
        <label class="text-md">Podatak</label>
        <input class="h-[40px] rounded-md border-neutral-300 shadow-sm border-1 px-2"
          :placeholder="currentValue ? currentValue : 'Izmjenite podatak'" v-model="newData"
          v-if="option2 !== 'image'" />
        <label v-if="option2 === 'image'" for="image-upload"
          class="p-3 border-neutral-300 shadow-md rounded-md max-w-fit text-lg font-semibold cursor-pointer">Nova
          slika</label>
        <input v-if="option2 === 'image'" type="file" id="image-upload" class="opacity-0 h-0 w-0 absolute"
          @change="handleFileUpload">
      </div>

      <div class="w-full flex flex-col gap-3 items-start">
        <button
          class="bg-[#006FEE] w-full h-[48px] rounded-lg text-white font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          @click="handleUpdateDogDocumentData()" :disabled="!newData">Spremi</button>
        <button class="bg-red-500 p-2 rounded-md text-white cursor-pointer" @click="handleDangerModal(true)">Akcija
          brisanja računa</button>
      </div>

    </div>
  </div>
  <Transition name="modal-animation">
    <div v-if="dangerModal" class="fixed inset-0 flex items-center justify-center z-49">
      <div class="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"></div>
      <div class="relative p-5 flex flex-col rounded-md bg-white w-full md:max-w-sm gap-3.5 mx-3 ">
        <h3 class="font-semibold">Akcija brisanja</h3>
        <p>Jeste li sigurni da želite obrisati račun?</p>
        <div class="w-full flex justify-end items-center mt-3 gap-5">
          <button class="p-2 bg-[#006FEE] opacity-85 rounded-md cursor-pointer text-white"
            @click="handleDangerModal(false)">Odustani</button>
          <button class="bg-red-500 p-2 rounded-md text-white cursor-pointer font-bold"
            @click="handleDeleteAction()">Obriši</button>
        </div>
      </div>
    </div>
  </Transition>



</template>

<style scoped>
.modal-animation-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.modal-animation-enter-to {
  opacity: 1;
  transform: scale(1);
}

.modal-animation-enter-active {
  transition: all 300ms ease-out;
}

.modal-animation-leave-from {
  opacity: 1;
  transform: scale(1)
}

.modal-animation-leave-to {
  opacity: 0;
  transform: scale(0.95)
}

.modal-animation-leave-active {
  transition: all 200ms ease-out
}
</style>