import { ReportQueue } from "../application/contracts/queue/generateReport.queue";
import { logger } from "../application/helpers/logger";
import { ReportRepository } from "../application/repositories/Report.repository";
import { ReportUsecases } from "../domain/Report";

export class RegisterreportUsecase implements ReportUsecases.RegisterReport {
  constructor(private ReportRepository: ReportRepository, private reportQueue: ReportQueue) {}

  async execute(reportId: string, imageName: string, imageReference: string): Promise<void> {
    try {
      await this.ReportRepository.registerreport(reportId, imageReference);
      await this.reportQueue.add({ reportId, imageName });
    } catch (error) {
      logger((error as Error).message);
      throw new Error("Error on register report");
    }
  }
}
