<template>
  <button class="btn" :class="buttonStyle">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { PropType } from "vue";

const props = defineProps({
  size: String as PropType<"small" | "medium" | "large">,
  color: String as PropType<"primary" | "secondary" | "danger" | "success" | "neutro">,
  type: String as PropType<"outline">,
});

const buttonSize = `btn--size-${props.size || "medium"} `;
const buttonColor = `btn--color-${props.color || "primary"}`
const buttonStyle = buttonSize + buttonColor + (props.type ? `--${props.type}` : "");

</script>

<style scoped>
.btn {
  @apply flex items-center justify-center rounded border-0 shadow-sm transition-colors;
}

.btn--size-small {
  @apply px-2 py-1 text-xs;
}

.btn--size-medium {
  @apply px-4 py-2 text-sm;
}

.btn--size-large {
  @apply px-6 py-3 text-base ;
}

.btn--color-primary {
  @apply text-white bg-primary hover:bg-orange-600 active:bg-orange-600/90;
}

.btn--color-secondary {
  @apply text-white bg-secondary/95 hover:bg-secondary active:bg-blue-600/90;
}

.btn--color-danger {
  @apply text-white bg-red-500/95 hover:bg-red-500 active:bg-red-500/90 ;
}

.btn--color-success {
  @apply text-white bg-green-500/95 hover:bg-green-600 active:bg-green-600/90;
}

.btn--color-neutro {
  @apply text-white bg-gray-500/95 hover:bg-gray-500 active:bg-gray-500/90;
}

.btn--color-neutro--outline {
  @apply text-gray-500 border border-gray-500 hover:bg-gray-500/10 active:bg-gray-500/5;
}

.btn--color-primary--outline {
  @apply text-primary border border-primary hover:bg-primary/10 active:bg-primary/5;
}

.btn--color-secondary--outline {
  @apply text-secondary border border-secondary hover:bg-secondary/10 active:bg-secondary/5;
}

.btn--color-danger--outline {
  @apply text-red-500 border border-red-500 hover:bg-red-500/10 active:bg-red-500/5;
}

.btn--color-success--outline {
  @apply text-green-500 border border-green-500 hover:bg-green-500/10 active:bg-green-500/5;
}






</style>
