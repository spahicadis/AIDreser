<script setup>
const props = defineProps({

  stepImage: {
    type: String,
    required: false
  },

  stepText: {
    type: String,
    required: false
  },

  isStepsLoading: {
    type: Boolean,
    required: true,
  },

})


</script>


<template>


  <div class="w-full h-auto rounded-lg shadow-sm border-gray-300 border-2 flex flex-col">

    <div v-if="isStepsLoading || !stepImage" class="w-full overflow-hidden rounded-tl-md rounded-tr-md animate-pulse">
      <svg class="text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
        viewBox="0 0 20 18">
        <path
          d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
      </svg>
    </div>

    <div v-else class="w-full min-h-[auto] overflow-hidden rounded-tl-md rounded-tr-md">
      <img :src="stepImage" class="w-full h-full object-cover object-center" loading="lazy" alt="Command step image" />
    </div>



    <div v-if="isStepsLoading || !stepText" class="p4 animate-pulse">
      <div class="bg-gray-200 animate-pulse w-full h-8 rounded-md"></div>
    </div>

    <div v-else class="p-4 flex items-center justify-center">
      <p>{{ stepText }}</p>
    </div>
  </div>

</template>