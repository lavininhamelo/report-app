import { logger } from "../application/helpers/logger";
import { ReportRepository } from "../application/repositories/Report.repository";
import { ReportStatus, ReportUsecases } from "../domain/Report";

export class ReviewreportUseCase implements ReportUsecases.ReviewReport {
  constructor(private ReportRepository: ReportRepository) {}

  async execute(reportId: string, status: ReportStatus): Promise<void> {
    try {
        const result = await this.ReportRepository.updateReportStatus(reportId, status);
        if(!result) {
            throw new Error('Error update report status');
        }
        return
    } catch (error) {
        logger((error as Error).message);
        throw new Error('Error update report status');
    }
  }
}
