<template>
  <header class="header text-white py-2 h-24 flex items-center justify-between">
    <div class="header__title flex flex-col justify-center">
      <h1 class="text-xl font-bold">Reports</h1>
      <p class="text-gray-300 text-sm">You have {{ reports.length }} new reports</p>
    </div>
    <Icon @click="refresh" class="text-4xl"> refresh </Icon>
  </header>
</template>

<script setup lang="ts">
import { POSITION, useToast } from "vue-toastification";
import Icon from "./Icon.vue";
const toast = useToast();
const emit = defineEmits(["refresh"]);

defineProps({
  reports: {
    type: Array,
    required: true,
  },
});

function refresh() {
  toast.success("Refreshing...", {
    position: POSITION.TOP_CENTER,
    timeout: 500,
  });
  emit("refresh");
}
</script>
