<template>
<div class="card">
  <div class="card__content">
    <h2 class="card__name">Report {{ name }}</h2>
    <p class="card__date">{{ formatReportDate(date) }}</p>
  </div>
  
  <div class="card__probability" :class="probabilityTag">
    {{ probability || 0 }}%
  </div>
</div>

</template>

<script setup lang="ts">
import { computed } from "vue";
import { formatReportDate } from "../../helpers/formatReportDate";

const props = defineProps({
  isSelected: Boolean,
  name: String,
  date: String,
  probability: Number,
});

const probabilityTag = computed(() => {
  if (!props.probability) return "border-gray-400 text-gray-400";

  if (props.probability <= 0) {
    return "border-gray-500 text-gray-500";
  } else if (props.probability <= 25) {
    return "border-green-500 text-green-500";
  } else if (props.probability <= 50) {
    return "border-yellow-500 text-yellow-500";
  } else if (props.probability <= 75) {
    return "border-primary text-primary";
  } else if (props.probability <= 90) {
    return "border-red-500 text-red-500";
  } else {
    return "border-black text-black";
  }
});
</script>

<style scoped>

.card {
  @apply mb-4 rounded-tr-none rounded-br-none border-l-4 border-secondary/50 rounded flex items-center justify-between px-4 py-4 w-full h-24 bg-gray-100;
}

.card__content {
  @apply mr-4;
}

.card__name {
  @apply text-base text-gray-700 font-semibold;
}

.card__date {
  @apply text-gray-500 text-sm mt-1;
}

.card__probability {
  @apply border-4 font-bold text-xs rounded-full w-12 h-12 flex items-center justify-center;
}

</style>
