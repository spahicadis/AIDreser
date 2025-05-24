<script setup>
import { onMounted, ref, watch } from 'vue';
import CommandCardComponent from '@/components/CommandCardComponent.vue';
import { useCommandsStore } from '@/stores/commandsStore';
import { getSingleComand } from '../../services/commandsAPI';
import CommandCardModal from '@/components/CommandCardModal.vue';
import AIResponseModal from '@/components/AIResponseModal.vue';
import { useProfileStore } from '@/stores/profileStore';
import { reviewCompletedCommand } from '../../services/dogsAPI';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const profileStore = useProfileStore();
const commandsStore = useCommandsStore()

//Command modal
const openModal = ref(false)
const contentModal = ref(null);
const isContentLoading = ref(true)

//AI modal
const openAIModal = ref(false)
const isAIResponding = ref(true)
const AIResponse = ref("")



onMounted(async() => {

  try {

    await commandsStore.getCommandsData()
    console.log(commandsStore.commandsData)

  } catch(error) {
    throw new Error(error.message)
  }

})


const handleAskTrainerAction = async (e) => {
  openModal.value = false;
  openAIModal.value = true;

  try {

      const response = await reviewCompletedCommand(profileStore.profileData.uid, e, profileStore.profileData.dog.levelNumber, profileStore.profileData.dog.commandsFinished)

      if(response.signal == true) {
        toast.success("Uspješno položena naredba.", {
          position: "top-center",
          autoClose: 2000
        })
      }
      else if(response.signal == false) {
        toast.error("Nažalost pas nije još naučio naredbu.", {
          position: "top-center",
          autoClose: 2000
        })
      }
      
      AIResponse.value = response.text


            

  } catch (error) {

      throw new Error(error.message)    
  }
  finally {
    
    isAIResponding.value = false;
  }

}

const handleModalContent = async(id) => {
  try {
    contentModal.value = await getSingleComand(id);
    console.log(contentModal.value)
  } catch (error) {
    throw new Error(error.message)
  }
  finally {
    isContentLoading.value = false
  }
}


const handleVisibilityOfModal = async(e) => {

  if(e.modalVisibility === true) {
    openModal.value = e.modalVisibility;
    try {
      await handleModalContent(e.commandID)
    } catch (error) {
      throw new Error(error.message)
    }
    
  }
  openModal.value = e.modalVisibility

}

const handleVisibilityOAIModal = (e) => {
  openAIModal.value = e
  isAIResponding.value = true;
  AIResponse.value = "";
}


watch([openModal, openAIModal], () => {
  if(openModal.value === true || openAIModal.value === true) {
    document.body.classList.add('no-scroll')
  }
})



</script>


<template>

  
  
<div class="h-full w-full flex flex-col gap-1.5">
  <h2 class="text-xl font-semibold">Naredbe</h2>
  <div class="w-full h-full py-8 grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 md:gap-10 gap-8 xl:grid-rows-3 xl:grid-cols-3 justify-items-center">
    <CommandCardComponent
    v-for="(data, index) in commandsStore.commandsData"
    :key="index"
    :command-i-d="commandsStore.isLoading ? undefined : data.id"
    :command-img="commandsStore.isLoading ? undefined : data.commandImage"
    :command-title="commandsStore.isLoading ? undefined : data.commandTitle"
    :command-difficulty="commandsStore.isLoading ? undefined : data.commandDifficulty"
    :command-level="commandsStore.isLoading ? undefined : data.commandLevel"
    @handle-modal="handleVisibilityOfModal"
    />

  </div>
  <CommandCardModal
  :is-open="openModal"
  :name-of-command="isContentLoading ? undefined : contentModal.commandTitle"
  :video-for-command="isContentLoading ? undefined : contentModal.modalIframe"
  :text-for-command="isContentLoading ? undefined : contentModal.modalText"
  :steps-for-command="isContentLoading ? undefined : contentModal.modalSteps"
  :command-question="isContentLoading ? undefined : contentModal.commandQuestion"
  @handle-modal="handleVisibilityOfModal"
  @send-images="handleAskTrainerAction"
  />
  <AIResponseModal
  :is-open="openAIModal"
  :is-loading="isAIResponding"
  :-a-i-response="AIResponse ? AIResponse : undefined"
  @close="handleVisibilityOAIModal"
  
  />
</div>
  

</template>


<style scoped>

.no-scroll {
  overflow: hidden;
  width: 100%;
  position: fixed;
}

</style>