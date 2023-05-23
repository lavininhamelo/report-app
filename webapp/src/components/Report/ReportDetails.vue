<template>
  <section class="modal">
    <section class="modal-container">
      <section class="report" v-if="selectedReport && selectedReport.reportDate">
        <header class="report__header">
          <div class="report__header-container">
            <p class="report__header__title">Report {{ selectedReport.name }}</p>
            <div class="report__header__status" :class="status.style">{{ status.text }}</div>
          </div>
          <Icon @click="$emit('close')" class="report__header__btn-close">close</Icon>
        </header>

        <main class="report__data">
          <div v-for="(date, index) in selectedReport.dates" :data-testid="'test-date-'+index" :key="index" class="report__status">
            <div class="report__status-index">{{ index + 1 }}</div>
            <div class="report__status-data">
              <p>{{ date.title }}</p>
              <p>{{ formatReportDate(date.date) }}</p>
            </div>
          </div>

          <h2>Classified Tags</h2>
          <div class="report__data__tags">
            <span v-for="tag in selectedReport.tags" :key="tag">{{ tag }}</span>
          </div>

          <h2>Probability</h2>
          <div class="report__area__probability">
            <div class="report__area__probability-bar"><span :style="probabilityBarWidth"></span></div>
            <div class="report__area__probability-number">{{ selectedReport.probability }}%</div>
          </div>

          <div class="report__avatar">
            <h2>Uploaded Image</h2>
            <img  :class="focusImg" :src="selectedReport.imageUrl" alt="Uploaded Image" />
            <Button @click="changeFocus" class="report__avatar-btn">{{ buttonImageFocusLabel }}</Button>
          </div>
        </main>

        <div v-if="selectedReport.status === 'PENDING'" class="report__actions">
          <Button color="danger" @click="rejectReport(selectedReport.id)"> Reject </Button>
          <Button color="success" @click="approveReport(selectedReport.id)"> Approve </Button>
        </div>
      </section>

      <div v-else-if="selectedReport" class="report-loading">
        <Icon class="report-loading__icon">sentiment_very_dissatisfied</Icon>
        <p>Report is being processed...</p>
        <Button class="report-loading__button" color="success" @click="refresh">Refresh</Button>
      </div>

      <div v-else>
        <Button class="report-loading__button" color="danger" type="outline" @click="$emit('close')">Close</Button>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, PropType } from "vue";
import { useToast } from "vue-toastification";

import { IndividualReport } from "./types";
import { formatReportDate } from "../../helpers/formatReportDate";
import { reviewReport } from "../../services/reports";
import Button from "../UI/Button.vue";
import Icon from "../UI/Icon.vue";

const emit = defineEmits(["close", "reviewed", "refresh"]);
const props = defineProps({
  report: {
    type: Object as PropType<IndividualReport>,
    required: true,
  },
});

const toast = useToast();
const focusImage = ref(false);
const selectedReport = computed(() => props.report);

const status = computed(() => {
  switch (selectedReport.value?.status.toUpperCase()) {
    case "APPROVED":
      return {
        text: "Approved",
        style: "border-green-500 text-green-500",
      };
    case "REJECTED":
      return {
        text: "Rejected",
        style: "border-red-500 text-red-500",
      };
    default:
      return {
        text: "Pending",
        style: "border-gray-500 text-gray-500",
      };
  }
});

const changeFocus = () => (focusImage.value = !focusImage.value);
const buttonImageFocusLabel = computed(() => (focusImage.value ? "Hide Image" : "Reveal Image"));
const focusImg = computed(() => (focusImage.value ? "blur-none" : "blur-lg"));
const probabilityBarWidth = computed(() => `width: ${selectedReport.value.probability}%`);

async function approveReport(reportId: string) {
  try {
    await reviewReport(reportId, "approved");
    toast.success("Report has been approved!");
    emit("reviewed", reportId, "approved");
    emit("close");
  } catch (error) {
    toast.error("Error approving report");
  }
}

async function rejectReport(reportId: string) {
  try {
    await reviewReport(reportId, "rejected");
    toast.success("Report has been rejected!");
    emit("reviewed", reportId, "rejected");
    emit("close");
  } catch (error) {
    toast.error("Error rejecting report");
  }
}

function refresh() {
  emit("refresh", selectedReport.value.id);
}
</script>

<style scoped>
.modal {
  @apply fixed top-0 left-0 bg-secondary/60 z-50 h-screen w-screen p-2 md:p-10 lg:p-20 flex items-center justify-center;
}

.modal-container {
  @apply max-w-[1280px] flex justify-center bg-gray-100 w-full h-full p-4 rounded-lg shadow-lg;
}

.report {
  @apply w-full px-4 py-4 h-full;
}

.report h2 {
  @apply mt-4 font-semibold text-lg;
}

.report__header {
  @apply flex justify-between w-full h-12;
}

.report__header-container {
  @apply flex items-center gap-4;
}

.report__header__title {
  @apply text-gray-800 text-xl font-bold;
}

.report__header__status {
  @apply rounded-xl border-2 px-3;
}

.report__header__btn-close {
  @apply text-xl text-gray-600 font-bold;
}

.report__data {
  @apply overflow-auto h-[85%] rounded-lg;
}

.report__status {
  @apply rounded shadow bg-white flex items-center h-20 px-8 mt-4;
}

.report__status-index {
  @apply rounded-full border-4 border-primary w-10 h-10 flex items-center justify-center font-bold;
}

.report__status-data {
  @apply flex flex-col ml-4;
}

.report__status-data p {
  @apply text-gray-700 text-left text-sm mt-1;
}

.report__subtitle {
  @apply mt-8 text-lg font-semibold;
}

.report__data__tags {
  @apply flex gap-4 flex-wrap;
}

.report__data__tags span {
  @apply rounded-full bg-primary/10 text-primary text-sm font-semibold px-4 py-2 mt-4 uppercase;
}

.report__area__probability {
  @apply flex w-full items-center mt-4;
}

.report__area__probability-bar {
  @apply w-full rounded-lg bg-gray-300 h-4;
}

.report__area__probability-bar span {
  @apply h-4 rounded-lg bg-primary w-full block;
}

.report__area__probability-number {
  @apply text-primary ml-4 font-semibold;
}

.report__avatar {
  @apply relative;
}

.report__avatar img {
  @apply w-full mt-8 rounded-lg shadow-lg;
}

.report__avatar-btn {
  @apply absolute bottom-10 right-10;
}

.report-loading {
  @apply flex flex-col items-center justify-center text-gray-500;
}

.report-loading__icon {
  @apply text-8xl;
}

.report-loading p {
  @apply mx-auto my-8;
}

.report-loading__button {
  @apply mt-4;
}

.report__actions {
  @apply flex items-center justify-end gap-2 h-16;
}
</style>
