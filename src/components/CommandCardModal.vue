<script setup>
import { ref, watch } from "vue";
import closeicon from "../assets/modalCloseIcon.svg"
import CommandStepCard from "./CommandStepCard.vue";
import { cloundinaryUplodImage } from "../../services/cloudinaryAPI";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },

  nameOfCommand: {
    type: String,
    required: true,
  },

  videoForCommand: {
    type: String,
    required: true,
  },

  textForCommand: {
    type: String,
    required: true,
  },

  stepsForCommand: {
    type: Array,
    required: true,
  },

  commandQuestion: {
    type: String,
    required: true,
  }

  //Kasnije ostalo za prop drilling mali. Emmits?
})

const file = ref(null)



watch(() => props.isOpen, (visibility) => {
  if(visibility) {
    document.body.classList.add('no-scroll')
  } else {
    document.body.classList.remove('no-scroll')
  }
})




const handleUploadFile = async(e) => {
   file.value = e.target.files[0]
   //uploaded_image.value = await cloundinaryUplodImage(file, "training-photos");
 }

 





</script>


<template>


<Transition name="modal-animation">
<div v-show="isOpen" class="fixed inset-0 flex justify-center items-center z-50">
  <div class="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"></div>  
    <div class="relative bg-white rounded-md shadow-md p-6 z-50 md:w-full max-w-2xl h-auto max-h-[80vh] overflow-y-auto flex flex-col gap-5">
      <div class="w-full h-fit flex justify-between items-center">
          <h3 class="text-lg font-semibold">Naziv: {{  nameOfCommand }}</h3>
          <img :src="closeicon" class="w-8 h-8 cursor-pointer" @click="$emit('handleModal', false)"/>
      </div>
      <div class="w-full flex flex-col gap-1">
        <h3 class="text-md font-semibold">Edukacijski video</h3>
        <iframe width="full" height="320" :src="videoForCommand" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
      <div class="w-full flex flex-col gap-3">
        <h3 class="text-md font-semibold">Koraci</h3>
        <CommandStepCard v-for="(step, index) in stepsForCommand"
        :key="index"
        :step-image="step.stepImage"
        :step-text="step.stepText"
        />
      </div>
      <div class="w-full flex flex-col gap-2.5">
          <h3 class="text-center font-semibold text-md">Nakon odradenih koraka, uslikajte svoga psa kako izvodi naredbu i pošaljite slike treneru.</h3>
          <div class="w-full flex items-center justify-center gap-5">
           <label for="camera" class="bg-[#006FEE] cursor-pointer text-white rounded-xl font-semibold p-2">USLIKAJ</label>
            <input type="file" capture="enviroment" accept="image/*" class="opacity-0 w-0 h-0 absolute" id="camera" @change="handleUploadFile"/>
           <button class="bg-[#006FEE] cursor-pointer text-white rounded-xl font-semibold p-2" @click="$emit('sendImages', {img: file, question: commandQuestion})">POŠALJI TRENERU</button>
          </div>        
      </div>
      <div v-if="uploaded_image" class="w-full h-auto flex flex-col gap-3">
        <h2 class="font-semibold">Slika sa treninga</h2>
        <img :src="uploaded_image" alt="Image from the training" class="max-w-full object-contain" />
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