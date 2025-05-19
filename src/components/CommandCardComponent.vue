<script setup>
const props = defineProps({

  commandID: {
    type: [String, undefined],
    required: false,
  },

  commandImg: {
    type: [String, undefined],
    required: false,
  },

  commandTitle: {
    type: [String, undefined],
    required: false,
  },

  commandDifficulty: {
    type: [String, undefined],
    required: false,
  }

})

</script>


<template>


  <div class="md:min-w-xs min-h-[400px]  shadow-lg flex flex-col rounded-lg justify-between border-[#f5f6f7]">

   <div class="w-full h-[70%] overflow-hidden rounded-tr-lg rounded-tl-lg">
      <img :src="commandImg" class="w-full h-full object-cover" alt="Command card image"/>
   </div>

    <div class="w-full h-[30%] flex flex-col justify-between pt-2.5 bg-[#f5f6f7] rounded-br-lg rounded-bl-lg p-2">
      <div class="w-full flex flex-col gap-1">
      <h2 class="font-semibold ">{{ commandTitle }}</h2>
      <p class="font-semibold">Težina: {{ commandDifficulty }}</p>
      </div>
      <div class="w-full flex items-center">
        <button class="bg-[#006FEE] w-full text-white font-semibold py-1.5 rounded-xl cursor-pointer">Započni</button>
      </div>
    </div>

  </div>



</template>