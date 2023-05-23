import { logger } from "../application/helpers/logger";
import { ReportRepository } from "../application/repositories/Report.repository";
import { AvatarImage } from "../domain/AvatarImage";
import { Report, ReportStatus, ReportUsecases } from "../domain/Report";

export class ViewreportUseCase implements ReportUsecases.ViewReport {
  constructor(private ReportRepository: ReportRepository) {}

  async execute(reportId: string): Promise<Report & {image: AvatarImage} | null> {
    try {
      const report = await this.ReportRepository.getReport(reportId);
      
      if (report) {
        return {
          ...report,
          reportDate: report.reportDate || undefined,
          tags: report.tags?.split(",") || [],
          probability: report.probability || 0,
          status: report.status as ReportStatus || "pending",
          image: report.image,
          date: report.createdAt,
        };
      }
      return null;
    } catch (error) {
      logger((error as Error).message);
      throw new Error("Error get report");
    }
  }
}
