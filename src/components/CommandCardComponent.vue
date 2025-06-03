<script setup>
import { useProfileStore } from '@/stores/profileStore';
import { ref, watch } from 'vue'; 

const props = defineProps({

  commandID: {
    type: [String, undefined, null],
    required: false,
  },

  commandImg: {
    type: [String, undefined, null],
    required: false,
  },

  commandTitle: {
    type: [String, undefined, null],
    required: false,
  },

  commandDifficulty: {
    type: [String, undefined, null],
    required: false,
  },

  commandLevel: {
    type: [Number, undefined, null],
    required: false,
  },

  isCardLoading: {
    type: Boolean,
    required: false,
  }

})

const profileStore = useProfileStore()
const isDisabled = ref(false)

watch(profileStore, () => {
  if(!profileStore.isLoading && profileStore.profileData.dog.levelNumber < props.commandLevel) {
      isDisabled.value = true
  }
  else if(!profileStore.isLoading && profileStore.profileData.dog.levelNumber <= props.commandLevel) {
    isDisabled.value = false;
  }
}, {deep: true})






</script>


<template>


<div v-if="isCardLoading" class="w-full 2xl:w-[384px] md:max-w-sm min-h-[400px] flex flex-col rounded-lg justify-between border-2 border-gray-300 shadow-sm animate-pulse">
  <div class="w-full h-[70%] overflow-hidden rounded-tr-md rounded-tl-md animate-pulse flex items-center justify-center">
    <svg class="w- text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
        </svg>
  </div>
  <div class="w-full h-[30%] flex flex-col justify-between pt-2.5 bg-[#f5f6f7] rounded-br-lg rounded-bl-lg p-2 animate-pulse">
  </div>
</div>


  <div v-else class="md:max-w-sm min-h-[400px] flex flex-col rounded-lg justify-between border-2 border-gray-300 shadow-sm">

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