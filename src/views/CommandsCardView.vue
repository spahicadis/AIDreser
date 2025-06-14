<script setup>
import {
  onMounted,
  ref,
  watch
} from 'vue';
import CommandCardComponent from '@/components/CommandCardComponent.vue';
import {
  useCommandsStore
} from '@/stores/commandsStore.js';
import {
  getSingleComand
} from '../../services/commandsAPI.js';
import CommandCardModal from '@/components/CommandCardModal.vue';
import AIResponseModal from '@/components/AIResponseModal.vue';
import {
  useProfileStore
} from '@/stores/profileStore.js';
import {
  reviewCompletedCommand
} from '../../services/dogsAPI.js';
import {
  toast
} from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const profileStore = useProfileStore()
const commandsStore = useCommandsStore()

//Command modal
const openModal = ref(false)
const contentModal = ref(null);
const isContentLoading = ref(true)

//AI modal
const openAIModal = ref(false)
const isAIResponding = ref(true)
const AIResponse = ref("")

onMounted(async () => {

  try {

    await commandsStore.getCommandsData()

  } catch (error) {
    throw new Error(error.message)
  }

})

const handleAskTrainerAction = async (e) => {
  openModal.value = false;
  openAIModal.value = true;

  try {

    const response = await reviewCompletedCommand(profileStore.profileData.uid, e, profileStore.profileData.dog.levelNumber, profileStore.profileData.dog.commandsFinished)

    if (response.signal == true) {
      toast.success("Uspješno položena naredba.", {
        position: "top-center",
        autoClose: 2000
      })
    } else if (response.signal == false) {
      toast.error("Nažalost pas nije još naučio naredbu.", {
        position: "top-center",
        autoClose: 2000
      })
    }

    AIResponse.value = response.text

  } catch (error) {

    throw new Error(error.message)
  } finally {

    isAIResponding.value = false;
  }

}

const handleModalContent = async (id) => {
  try {
    contentModal.value = await getSingleComand(id);
  } catch (error) {
    throw new Error(error.message)
  } finally {
    setTimeout(() => {
      isContentLoading.value = false
    }, 1000)
  }
}

const handleVisibilityOfModal = async (e) => {

  if (e.modalVisibility === true) {
    openModal.value = e.modalVisibility;
    try {
      await handleModalContent(e.commandID)
    } catch (error) {
      throw new Error(error.message)
    }

  } else {
    openModal.value = e.modalVisibility
    isContentLoading.value = true;
    contentModal.value = null;
  }

}

const handleVisibilityOfAIModal = (e) => {
  openAIModal.value = e
  isAIResponding.value = true;
  AIResponse.value = "";
  isContentLoading.value = true;
  contentModal.value = null;
}

watch(openModal, (newValue) => {
  if (newValue) {
    document.body.style.overflow = "hidden"
    document.body.style.position = "fixed"
    document.body.style.width = "100%"
  }
  if (!newValue) {
    document.body.style.overflow = "visible"
    document.body.style.position = "static"
    document.body.style.width = "100%"
  }
})

const fallback = ref([
  { stepImage: null, stepText: "" },
  { stepImage: null, stepText: "" },
  { stepImage: null, stepText: "" }
]);


</script>

<template>
  <div class="h-full w-full flex flex-col gap-1.5">
    <h2 class="text-xl font-semibold">Naredbe</h2>
    <div
      class="w-full h-full py-8 grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 md:gap-10 gap-8 xl:grid-rows-3 xl:grid-cols-3 justify-items-center">
      <CommandCardComponent v-for="(data, index) in commandsStore.commandsData" :key="index"
        :command-i-d="commandsStore.isLoading ? '' : data.id"
        :command-img="commandsStore.isLoading ? '' : data.commandImage"
        :command-title="commandsStore.isLoading ? '' : data.commandTitle"
        :command-difficulty="commandsStore.isLoading ? '' : data.commandDifficulty"
        :command-level="commandsStore.isLoading ? 0 : data.commandLevel" :is-card-loading="commandsStore.isLoading"
        @handle-modal="handleVisibilityOfModal" />

    </div>
    <CommandCardModal :is-open="openModal" :name-of-command="isContentLoading ? undefined : contentModal.commandTitle"
      :video-for-command="isContentLoading ? '' : contentModal.modalIframe"
      :text-for-command="isContentLoading ? '' : contentModal.modalText"
      :steps-for-command="isContentLoading ? fallback : contentModal.modalSteps"
      :command-question="isContentLoading ? '' : contentModal.commandQuestion" :is-modal-loading="isContentLoading"
      @handle-modal="handleVisibilityOfModal" @send-images="handleAskTrainerAction" />
    <AIResponseModal :is-open="openAIModal" :is-loading="isAIResponding"
      :-a-i-response="AIResponse ? AIResponse : undefined" @close="handleVisibilityOfAIModal" />
  </div>
</template>

<style scoped>
.no-scroll {
  overflow: hidden;
}
</style>
