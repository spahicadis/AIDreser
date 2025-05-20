<script setup>
const props = defineProps({

  stepImage: {
    type: [String ,undefined],
    required: true
  },

  stepText: {
    type: [String, undefined],
    required: true
  }
})






</script>





<template>


<div class="w-1/3 h-full rounded-lg shadow-sm border-gray-300 border-2">
      <div class="w-full overflow-hidden h-[50%] rounded-tl-md rounded-tr-m">
        <img :src="stepImage" class="w-full h-full object-cover" loading="lazy" alt="Command step image" />
      </div>

      <div class="w-full h-[50%] p-2.5">
        <p class="text-center text-xs max-w-[180px]">{{ stepText }}</p>
      </div>

</div>

</template>