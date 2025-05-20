<script setup>
import closeicon from "../assets/modalCloseIcon.svg"
import CommandStepCard from "./CommandStepCard.vue";
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },

  nameOfCommand: {
    type: String,
    required: true
  },

  videoForCommand: {
    type: String,
    required: true,
  },

  stepsForCommand: {
    type: Array,
    required: true
  }



  //Kasnije ostalo za prop drilling mali. Emmits?
})





</script>


<template>


<Transition name="modal-animation">
<div v-show="isOpen" class="fixed inset-0 flex justify-center items-center z-47">
<div class="z-48 fixed mx-auto flex flex-col gap-2 lg:min-w-xl lg:h-[810px] bg-white rounded-lg px-5 py-1 border border-gray-300 shadow-sm overflow-hidden">
  <div class="w-full h-16 flex justify-between items-center">
    <h2 class="text-xl font-semibold">{{ nameOfCommand }}</h2>
    <img @click="$emit('handleModal', false)" :src="closeicon" class="w-10 h-10 object-contain cursor-pointer" alt="Close modal icon"/>
  </div>

 <div class="w-full flex flex-col gap-1.5">
  <h3 class="text-lg font-semibold">Edukacijski video</h3>
  <iframe width="100%" height="315" :src="videoForCommand" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> 
 </div> 

 <div class="w-full flex flex-col gap-2 h-[35%]">
  <h3 class="text-lg font-semibold">Koraci</h3>
  <div class="w-full h-full flex justify-between items-center overflow-x-hidden gap-2">
    <CommandStepCard
    v-for="(step, index) in stepsForCommand"
    :key="index"
    :step-image="step.stepImage"
    :step-text="step.stepText"
    />
  </div>
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