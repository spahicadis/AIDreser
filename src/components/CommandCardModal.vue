<script setup>
import { ref, defineEmits, useTemplateRef, nextTick } from "vue";
import closeicon from "../assets/modalCloseIcon.svg"
import CommandStepCard from "./CommandStepCard.vue";

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

const emits = defineEmits(["handleModal", "sendImages"]);


const file = ref(null)
const preview = ref(null)
const imageView = useTemplateRef('image-preview')
const isUploaded = ref(false)


const handleUploadFile = async(e) => {
   file.value = e.target.files[0]
   if(file.value) {
    preview.value = URL.createObjectURL(file.value)
    isUploaded.value = true;
   }
   await nextTick()//Cekamo da se DOM ucita rjesenja sa interneta 
   if(preview.value) {
    imageView.value.scrollIntoView({behavior: 'smooth'})
   }

   //uploaded_image.value = await cloundinaryUplodImage(file, "training-photos");
 }


const handleCloseModal = () => {

  emits("handleModal", false)

  file.value = null;
  preview.value = null;
  isUploaded.value = false;

}


const handleSendImages = () => {

  emits("sendImages", {img: file.value, question: props.commandQuestion})

  file.value = null;
  preview.value = null;
  isUploaded.value = false;

}



</script>


<template>


<Transition name="modal-animation">
<div v-show="isOpen" class="fixed inset-0 flex justify-center items-center z-50">
  <div class="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"></div>  
    <div class="relative bg-white rounded-md shadow-md p-6 z-50 md:w-full max-w-2xl h-auto max-h-[80vh] overflow-y-auto flex flex-col gap-5 mx-3">
      <div class="w-full h-fit flex justify-between items-center">
          <h3 class="text-lg font-semibold">Naziv: {{  nameOfCommand }}</h3>
          <img :src="closeicon" class="w-8 h-8 cursor-pointer" @click="handleCloseModal"/>
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
          <h3 class="text-center font-semibold text-md">Nakon odrađenih koraka, uslikajte svoga psa kako izvodi naredbu i pošaljite slike treneru.</h3>
          <div class="w-full flex items-center justify-center gap-5">
           <label for="camera" class="bg-[#006FEE] cursor-pointer text-white rounded-xl font-semibold p-2">USLIKAJ</label>
            <input type="file" capture="enviroment" accept="image/*" class="opacity-0 w-0 h-0 absolute" id="camera" @change="handleUploadFile"/>
           <button class="text-white rounded-xl font-semibold p-2" :class="isUploaded ? 'bg-[#006FEE] cursor-pointer' : 'opacity-50 cursor-not-allowed bg-[#006FEE]'"  @click="handleSendImages">POŠALJI TRENERU</button>
          </div>        
      </div>
      <div v-if="preview" class="w-full h-auto flex flex-col gap-3">
        <h2 class="font-semibold">Slika sa treninga:</h2>
        <img ref="image-preview" :src="preview" alt="Image from the training" class="max-w-full w-1/2  rounded-md" />
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