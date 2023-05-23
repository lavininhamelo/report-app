export type ReportStatus = "PENDING" | "APPROVED" | "REJECTED";

export type Report = {
  id: string;
  date?: string;
  reportDate?: string;
  name: string;
  probability: number;
};
export type ReportList = Report[];
export type IndividualReport = {
  id: string;
  name: string;
  reportDate?: string;
  imageUrl: string;
  status: ReportStatus;
  probability: number;
  tags?: string[];
  dates: {
    title: string;
    date?: string;
  }[];
};