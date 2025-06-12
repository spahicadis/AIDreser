import { defineStore } from "pinia";
import { ref } from "vue";
import { getAllCommands } from "../../services/commandsAPI";

export const useCommandsStore = defineStore('commandsStore', () => {

  const commandsData = ref(null)
  const isLoading = ref(true)


  const getCommandsData = async() => {

  try {

    commandsData.value = await getAllCommands()

  } catch(error) {

    throw new Error(error.message)
  } finally {
    setTimeout(() => {
      isLoading.value = false
    }, 1000)
    
  }
    
  }

return {
  commandsData,
  isLoading,
  getCommandsData
}
})