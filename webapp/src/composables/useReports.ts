import { onMounted, ref } from "vue";
import { getReport, getReports } from "../services/reports";
import { IndividualReport, ReportList, ReportStatus } from "../components/Report/types";

const useReports = () => {
  const selectedReport = ref<IndividualReport>();
  const mappedReports = ref<Record<string, IndividualReport>>({});

  const reports = ref<ReportList>([]);

  const removeFromReports = (reportId: string, status: IndividualReport) => {
    let reportIndex = reports.value.findIndex((report) => report.id === reportId);
    mappedReports.value[reportId] = status;
    if (reportIndex > -1) {
      reports.value.splice(reportIndex, 1);
    }
  };

  const load = async (showArchived?: boolean) => {
    const reportsData = await getReports(showArchived);
    reports.value =
      reportsData?.map((report) => {
        return {
          id: report.id,
          name: report.id.toUpperCase().slice(0, 8),
          date: report.date,
          probability: report.probability ? Math.round(report.probability * 100) : 0,
        };
      }) || [];
  };

  const selectReport = async (reportId: string) => {
    const report = mappedReports.value[reportId];

    if (!report || !report.reportDate) {
      const data = await getReport(reportId);

      if (!data) {
        return;
      }

      mappedReports.value[reportId] = {
        id: data.id,
        name: data.id.toUpperCase().slice(0, 8),
        reportDate: data.reportDate,
        imageUrl: data.image_url || "",
        status: data.status as ReportStatus,
        probability: data.probability,
        tags: data.tags,
        dates: [
          {
            title: "Created Date",
            date: data.image.createdAt,
          },
          {
            title: "Proccessing Date",
            date: data.createdAt,
          },
          {
            title: "Report Date",
            date: data.reportDate,
          },
        ],
      };
    }

    const currentReport = reports.value.find((report) => report.id === reportId);

    if (currentReport) {
      currentReport.reportDate = mappedReports.value[reportId].reportDate;
    }

    selectedReport.value = mappedReports.value[reportId];
  };

  onMounted(async () => {
    await load();
  });

  return {
    reports,
    mappedReports,
    load,
    selectReport,
    selectedReport,
    removeFromReports,
  };
};

export default useReports;
