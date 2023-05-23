import { Queue } from "bull";
import { createQueue } from "../../../infra/bull/queue.adapter";
import { ReportUsecases } from "../../../domain/Report";
import { logger } from "../../helpers/logger";

interface reportPayload {
  reportId: string;
  imageName: string;
}

export class ReportQueue {
  queue: Queue;

  constructor(private generatereportUsecase: ReportUsecases.GenerateReport) {
    this.queue = createQueue("report");
  }

  async add(args: reportPayload) {
    const { reportId, imageName } = args;
    const payload: reportPayload = {
      reportId,
      imageName,
    };

    logger(`Adding report ${reportId} to queue`);
    return await this.queue.add(payload);
  }

  async process() {
    this.queue.process(async (job) => {
      setTimeout(() => {
        this.generatereportUsecase.execute(job.data.reportId, job.data.imageName);
        logger(`Report ${job.data.reportId} processed.`);
      }, 10000);
    });
  }
}
