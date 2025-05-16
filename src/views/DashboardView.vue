<script setup>
import {ref, reactive, onMounted} from 'vue'
import { useAuthStore } from '@/stores/authStore';
import { handleUserSignOut } from '../../services/authAPI';
import { getUserDocumentData } from '../../services/usersAPI';
import { getDogDocumentData } from '../../services/dogsAPI';
import { useRouter } from 'vue-router';
const authStore = useAuthStore();
const router = useRouter();

let userData = ref({});
let dogData = ref({})


/*const dogData = reactive({
  name: null,
  breed: null,
  age: null,
  breed: null,
  weight: null,
  treat: null,
  image: null,
  commandsFinished: null,
  level: null,
})*/




const readUserDocumentData = async() => {
  try {
    const response = await getUserDocumentData(authStore.currentUser.uid)
    userData.value = {
      ...response
    }
    
  } catch (error) {
    throw new Error(error.message)
  }
}


const readDogDocumentData = async() => {
  try {
    const response = await getDogDocumentData(authStore.currentUser.uid)
    dogData.value = {
      ...response
    }
  } catch (error) {
    
  }
}

onMounted(() => {
  readUserDocumentData()
  readDogDocumentData()
})



const handleSignOutAction = async() => {

  try {

    const response = await handleUserSignOut();
    if(response === 200) {
      router.push("/onboarding")
    }

  } catch (error) {
    console.log(error.messsage);
  }

}


</script>




<template>

<h1>Doborošli {{ userData.name }} {{ userData.surname }}</h1>
<hr/>
<h2>Dobrodošli {{ dogData.name }} {{ dogData.breed }} {{ dogData.age }} {{ dogData.weight }} {{ dogData.commandsFinished }} {{ dogData.level }} {{ dogData.treat }}</h2>
<img class="w-15 h-15 object-contain rounded-full" :src="dogData.image"/>


<button class="cursor-pointer" @click="handleSignOutAction()">Odjavite se</button>

</template>