import service from "./index";

type ReportList = {
  date: string;
  id: string;
  imageReference: string;
  probability: number;
  reportDate: string;
  status: string;
}

export async function getReports(all: boolean = false) {
  try {
    const response = await service.get<{
      reports: ReportList[];
    }>("/reports", {
        params: {
          all,
        },
      });
    return response.data.reports;
  } catch (error) {
    console.error(error);
  }
}

type Report = {
    createdAt: string;
    date: string;
    id: string;
    image: {
      id: string;
      path: string;
      createdAt: string;
    },
    status: "PENDING" | "APPROVED" | "REJECTED";
    tags?: string[];
    reportDate?: string;
    probability?: number;
    image_url?: string;
}

export async function getReport(reportId: string) {
  try {
    const response = await service.get<Report>(`/report/${reportId}`);
    return {
      ...response.data,
      probability: response.data?.probability ? Math.round(response.data?.probability * 100) : 0,
      status: response.data.status.toUpperCase() || "PENDING"

    }
  } catch (error) {
    console.error(error);
  }
}

export async function reviewReport(reportId: string, status: string) {
  try {
    const response = await service.put(`/review-report/${reportId}`, {
      status,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}