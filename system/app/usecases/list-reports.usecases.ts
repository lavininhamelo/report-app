import { logger } from "../application/helpers/logger";
import { ReportRepository } from "../application/repositories/Report.repository";
import { Report, ReportStatus, ReportUsecases } from "../domain/Report";

export class ListReportsUseCase implements ReportUsecases.ListReports {
  constructor(private ReportRepository: ReportRepository) {}

  async execute(onlyPending?: boolean): Promise<Report[]> {
    try {
      const reports = await this.ReportRepository.getReports(onlyPending) || [];
      return reports.map(report => ({
        id: report.id,
        imageReference: report.imageReference,
        status: report.status as ReportStatus,
        reportDate: report.reportDate || undefined,
        probability: report.probability || 0,
        date: report.createdAt,
      }));
    } catch (error) {
      logger((error as Error).message);
      throw new Error("Error to list reports");
    }
  }
  
}
