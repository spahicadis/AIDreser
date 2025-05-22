<script setup>
import { useProfileStore } from '@/stores/profileStore';
import { ref, watch } from 'vue'; 

const props = defineProps({

  commandID: {
    type: [String, undefined],
    required: true,
  },

  commandImg: {
    type: [String, undefined],
    required: true,
  },

  commandTitle: {
    type: [String, undefined],
    required: true,
  },

  commandDifficulty: {
    type: [String, undefined],
    required: true,
  },

  commandLevel: {
    type: [Number, undefined],
    required: true,
  },

})

const profileStore = useProfileStore()
const isDisabled = ref(false)

watch(profileStore, () => {
  if(!profileStore.isLoading && profileStore.profileData.dog.levelNumber < props.commandLevel) {
      isDisabled.value = true
  }
}, {deep: true})



</script>


<template>


  <div class="md:max-w-sm min-h-[400px] flex flex-col rounded-lg justify-between border-2 border-gray-300 shadow-sm">

   <div class="w-full h-[70%] overflow-hidden rounded-tr-md rounded-tl-md">
      <img :src="commandImg" class="w-full h-full object-cover" alt="Command card image" loading=""/>
   </div>

    <div class="w-full h-[30%] flex flex-col justify-between pt-2.5 bg-[#f5f6f7] rounded-br-lg rounded-bl-lg p-2">
      <div class="w-full flex flex-col gap-1">
      <h2 class="font-semibold text-xl">Naziv: {{ commandTitle }}</h2>
      <p class="font-semibold">Težina: {{ commandDifficulty }}</p>
      </div>
      <div class="w-full flex items-center">
        <button class="w-full text-white font-semibold py-1.5 rounded-xl" :class="isDisabled ? 'disabled:opacity-50 bg-[#006FEE] cursor-not-allowed' : 'bg-[#006FEE] cursor-pointer'" :disabled="isDisabled" @click="$emit('handleModal', { modalVisibility: true, commandID: commandID },)">Započni</button>
      </div>
    </div>

  </div>



</template>