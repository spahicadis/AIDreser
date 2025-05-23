<script setup>
import { onMounted, ref } from 'vue';
import CommandCardComponent from '@/components/CommandCardComponent.vue';
import { useCommandsStore } from '@/stores/commandsStore';
import { getSingleComand } from '../../services/commandsAPI';
import { image_visualizer } from '../../services/geminiAPI';
import CommandCardModal from '@/components/CommandCardModal.vue';
import AIResponseModal from '@/components/AIResponseModal.vue';
import { updateDogDocumentData } from '../../services/dogsAPI';
import { useProfileStore } from '@/stores/profileStore';
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
}


const handleAskTrainerAction = async (e) => {
  openModal.value = false;
  openAIModal.value = true;
  try {
      const response = await image_visualizer(e.img, e.question);
      AIResponse.value = response;

      if(response === "yes") {
        const currentLevel = profileStore.profileData.dog.levelNumber
        const commandFinished = profileStore.profileData.dog.commandsFinished

        await updateDogDocumentData(profileStore.profileData.uid, "levelNumber", currentLevel + 1)
        await updateDogDocumentData(profileStore.profileData.uid, "commandsFinished", commandFinished + 1)
      }

  } catch (error) {
      throw new Error(error.message)    
  }
  finally {
    isAIResponding.value = false;
  }

}


onMounted(async() => {

  try {

    await commandsStore.getCommandsData()
    console.log(commandsStore.commandsData)

  } catch(error) {
    throw new Error(error.message)
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