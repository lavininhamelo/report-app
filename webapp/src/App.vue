<template>
  <section class="app">
    <Header :class="focus" :reports="reports" @refresh="load()" />

    <section :class="focus" class="reports-list">
      <ImageUploader @upload="onUpload" />

      <section class="reports-list__header">
        <h2 class="reports-list__header__title">{{ headerTitle }}</h2>
        <Button color="neutro" type="outline" @click="showArchived = !showArchived">
          {{ filterButtonLabel }}
        </Button>
      </section>

      <main class="reports-list__body">
        <p v-if="reports.length === 0" class="reports-list__no-reports">No report to review.</p>
        <template v-else>
          <ReportCard
            v-for="report of reports"
            :key="report.id"
            @click="selectReport(report.id)"
            :name="report.name"
            :date="report.date"
            :probability="report.probability"
            :isSelected="selectedReport?.id === report.id"
          />
        </template>
      </main>
    </section>

    <Footer :focus="focus" />
    <ReportDetails
      v-if="selectedReport"
      :report="selectedReport"
      @reviewed="removeFromReports"
      @refresh="selectReport"
      @close="selectedReport = undefined"
    />
  </section>
</template>
<script setup lang="ts">
import { ref, computed, watch } from "vue";

import useReports from "./composables/useReports";

import { Report } from "./components/Report/types";
import ReportCard from "./components/Report/ReportCard.vue";
import ReportDetails from "./components/Report/ReportDetails.vue";
import ImageUploader from "./components/Report/ImageUploader.vue";

import Footer from "./components/UI/Footer.vue";
import Button from "./components/UI/Button.vue";
import Header from "./components/UI/Header.vue";

const { selectedReport, load, selectReport, reports, removeFromReports } = useReports();

const onUpload = async (report: Report) => {
  if (!reports) return;

  reports.value.push({
    id: report.id,
    date: report.date,
    name: report.id.slice(0, 8).toUpperCase(),
    probability: 0,
  });
};

const showArchived = ref(false);

const headerTitle = computed(() => (showArchived.value ? "All Reports" : "Pending Reports"));
const filterButtonLabel = computed(() => (showArchived.value ? "Hide archived" : "Show archived"));
const focus = computed(() => (selectedReport.value ? "blur" : "blur-none"));

watch(
  () => showArchived.value,
  async () => {
    await load(showArchived.value);
  }
);
</script>

<style scoped>
.reports-list {
  @apply bg-white rounded-xl p-8;
  height: calc(100vh - 144px);
}

.reports-list__header {
  @apply flex items-center justify-between w-full;
}

.reports-list__header__title {
  @apply mb-4 font-semibold text-lg mt-8;
}

.reports-list__body {
  @apply flex flex-col overflow-auto h-[70%];
}

.reports-list__no-reports {
  @apply text-gray-500 text-left text-sm mt-1 h-full;
}

.app {
  @apply bg-secondary px-8 h-full overflow-auto;
  max-height: 100vh;
  height: full;
}
</style>
