import { AvatarImage } from "./AvatarImage";

export type ReportStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface Report {
  id: string;
  imageReference: string;
  reportDate?: Date;
  tags?: string[];
  probability: number;
  status: ReportStatus;
  date: Date;
}

export namespace ReportUsecases {
  export type RegisterReport = { execute: (reportId: string, imageReference: string, imageName: string) => Promise<void> };
  export type GenerateReport = { execute: (reportId: string, imageName: string) => Promise<void> };
  export type ViewReport = { execute: (reportId: string) => Promise<Report & {image: AvatarImage} | null> };
  export type ListReports = { execute: (onlyPending?: boolean) => Promise<Report[]> };
  export type ReviewReport = { execute: (reportId: string, status: ReportStatus) => Promise<void> };
}
