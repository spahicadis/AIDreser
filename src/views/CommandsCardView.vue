<script setup>
import { onMounted } from 'vue';
import CommandCardComponent from '@/components/CommandCardComponent.vue';
import { useCommandsStore } from '@/stores/commandsStore';
const commandsStore = useCommandsStore()


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
  <div class="w-full h-full py-8 grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 md:gap-10 gap-8">
    <CommandCardComponent
    v-for="(data, index) in commandsStore.commandsData"
    :key="index"
    :command-i-d="commandsStore.isLoading ? undefined : data.id"
    :command-img="commandsStore.isLoading ? undefined : data.commandImage"
    :command-title="commandsStore.isLoading ? undefined : data.commandTitle"
    :command-difficulty="commandsStore.isLoading ? undefined : data.commandDifficulty"
    :command-level="commandsStore.isLoading ? undefined : data.commandLevel"
    
    />

  </div>
</div>
  

</template>