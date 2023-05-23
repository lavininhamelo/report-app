<template>
<div class="uploader-area">
  <Button class="uploader-area__button">Upload Image</Button>
  <input ref="image" data-testid="uploader-input" @input="handleFileSelect($event)" class="uploader-area__input" type="file" accept="image/*" />
  <p class="uploader-area__text">or drag file in this area</p>
</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useToast } from "vue-toastification";

import { uploadImage } from "../../services/avatar-image";

import Button from "../UI/Button.vue";

const toast = useToast();
const emit = defineEmits(["upload"]);

const image = ref<HTMLInputElement>();

const handleFileSelect = async (event: Event) => {
  const file = (event.target as HTMLInputElement)?.files?.[0];
  if (file) {
    try {
      const response = await uploadImage(file);

      if (image.value) {
        image.value.value = "";
      }

      emit("upload", { id: response.report.report_id, date: response.report.date });
      toast.success("Sucess! The image is beeing processed.");
    } catch (error) {
      toast.error("Error uploading image");
    }
  }
};
</script>

<style scoped>
.uploader-area {
  @apply relative w-full items-center text-sm justify-center flex-col flex rounded bg-primary/10 py-6 border-2 border-primary/50 border-dashed mb-4;
}

.uploader-area__input {
  @apply bg-red-500/10 h-full w-full absolute opacity-0;
}

.uploader-area__text {
  @apply text-gray-500 mt-2;
}

.uploader-area__input::-webkit-file-upload-button {
  @apply hidden;
}
.uploader-area__input {
  @apply bg-red-500/10 h-full w-full absolute opacity-0;
}

.uploader-area__input::-webkit-file-upload-button {
  @apply hidden;
}
</style>
