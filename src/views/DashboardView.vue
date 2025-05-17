<script setup>
import {onMounted, onUnmounted} from 'vue'
import { handleUserSignOut } from '../../services/authAPI';
import { useProfileStore } from '@/stores/profileStore';
import { getRealtimeDogDocumentData } from '../../services/dogsAPI';
const profileStore = useProfileStore();
let unsubscribe = null;

onMounted(async() => {
  try {
    await profileStore.getProfileData()
  } catch(error) {
    throw new Error(error.messsage)
  }

  unsubscribe = getRealtimeDogDocumentData(profileStore.profileData.uid, (data) => {
    profileStore.profileData.dog = {...data}//Inline callback, koristimo spread operator kako bi kopirali nove podatke u novi objekt
  })

})

//Detachamo listener na unmountu
onUnmounted(() => {
  if(unsubscribe) {
    unsubscribe()
  }
})
</script>




<template>




</template>