<template>
  <footer :class="focus">Developer by Lavinia Melo</footer>
</template>

<script setup lang="ts">
defineProps({
  focus: {
    type: String,
    default: "focus",
  },
});
</script>

<style scoped>
footer {
    @apply h-12 w-full py-4 text-white;
}
</style>
