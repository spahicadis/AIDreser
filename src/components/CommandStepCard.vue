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


<div class="w-full h-auto rounded-lg shadow-sm border-gray-300 border-2 flex flex-col">
      <div class="w-full h-[200px] overflow-hidden rounded-tl-md rounded-tr-md">
        <img :src="stepImage" class="w-full h-full object-cover" loading="lazy" alt="Command step image" />
      </div>

      <div class="w-full max-h-[50%] p-2.5 flex items-center justify-center">
        <p>{{ stepText }}</p>
      </div>
</div>

</template>