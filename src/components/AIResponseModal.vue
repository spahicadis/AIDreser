<script setup>
import { ref } from 'vue';

const props = defineProps({

  isOpen: {
    type: Boolean,
    required: true,
  },

  isLoading: {
    type: Boolean,
    required: true,
  },

  AIResponse: {
    type: [String, undefined],
    required: false
  }


})








</script>




<template>

<Transition name="modal-animation">
<div v-if="isOpen" class="fixed inset-0 flex justify-center items-center z-49">
  <div class="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"></div>
  <div class="relative rounded-md shadow-md bg-white z-50 p-3 w-full max-w-sm h-auto flex flex-col gap-3">
    <div class="w-full">
      <p v-if="isLoading">Pregled slike u tijeku...</p>
      <p v-if="AIResponse">{{ AIResponse }}</p>
    </div>
    <div>

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


.no-scroll {
  overflow: hidden;
}

</style>