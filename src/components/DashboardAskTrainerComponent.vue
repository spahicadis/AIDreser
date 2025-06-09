<script setup>
import { ref } from "vue";
import infoIcon from "../assets/infoIcon.svg"
import VueSelect from "vue3-select-component";
import { ask_trainer } from "../../services/geminiAPI";
import AIResponseModal from "./AIResponseModal.vue";
import { useCommandsStore } from "@/stores/commandsStore";
const commandStore = useCommandsStore()

const commandSelected = ref("")
const userQuestion = ref("")
const isModalOpen = ref(false)
const AI_response = ref(null)
const isLoading = ref(true)


const handleAskTrainer = async () => {
  isModalOpen.value = true
  const commandQuestionObj = {
    command: commandSelected.value,
    question: userQuestion.value
  }

  commandSelected.value = ""
  userQuestion.value = ""

  try {
    const response = await ask_trainer(commandQuestionObj)
    AI_response.value = response

  } catch (error) {
    throw new Error(error.message)
  }
  finally {
    isLoading.value = false;
  }
}

const handleCloseModal = (e) => {
  isModalOpen.value = e
  AI_response.value = null
  isLoading.value = true
}


</script>




<template>


  <div class="w-full flex flex-col gap-3.5 border border-[#EEEEEE] rounded-lg shadow-md p-4">
    <div class="w-full h-fit flex items-center gap-5">
      <img :src="infoIcon" alt="Info description" />
      <h1 class="text-md">Pitajte trenera više o naredbi ili problemu s kojim se susrećete</h1>
    </div>

    <div class="w-full max-w-[343px] flex flex-col gap-2">
      <label class="text-md">Odaberite o kojoj se naredbi radi</label>
      <VueSelect placeholder="Naziv naredbe" class="border-neutral-300 shadow-sm" :should-autofocus-option="false"
        :options="[
          { label: 'Stoj', value: 'The question is about the command where the dog stands.' },
          { label: 'Sjedni', value: 'The question is related to the sit command.' },
          { label: 'Lezi', value: 'The question is related to the lie down command.' },
          { label: 'Daj šapu', value: 'The question is related to the give paw command.' },
          { label: 'Daj obje šape', value: 'The question is related to the give both paws command.' },
          { label: 'Osmijeh', value: 'The question is related to the smile command' },
          { label: 'Između nogu', value: 'The question is related to the between two legs command' },
          { label: 'Okreni se na leđima', value: 'The question is related to the roll over command' },
          { label: 'Mahni', value: 'The question is related to the wave with paw command' },
          { label: 'Sakrij se', value: 'The question is related to the hide with paw over muzzle command' },

        ]" v-model="commandSelected" />
      <label class="text-md">Postavite pitanje</label>
      <textarea v-model="userQuestion" class="border border-neutral-300 shadow-sm rounded-md p-2 text-start"
        placeholder="Sadržaj Vašeg pitanja..."></textarea>
      <button
        class="bg-[#006FEE] w-full h-[48px] rounded-lg text-white font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="!commandSelected || !userQuestion" @click="handleAskTrainer">Pitaj trenera</button>
    </div>
  </div>
  <AIResponseModal :is-open="isModalOpen" :is-loading="isLoading" :-a-i-response="AI_response ? AI_response : undefined"
    @close="handleCloseModal" />

</template>