import { Request, Response } from "express";
import { ReportUsecases } from "../../../domain/Report";
import { logger } from "../../helpers/logger";

export class ReportService {
  constructor(
    private viewreportUsecase: ReportUsecases.ViewReport,
    private listReportsUsecase: ReportUsecases.ListReports,
    private reviewreportUsecase: ReportUsecases.ReviewReport
  ) {}

  async getReport(req: Request, res: Response) {
    const url = process.env.APP_URL || "http://localhost:3333";
    const reportId = req.params.id;

    if (!reportId) {
      return res.status(400).json({ error: "Report Id is required" });
    }

    try {
      const report = await this.viewreportUsecase.execute(reportId);
      if (!report) {
        return res.status(404).json({ error: "Report not found" });
      }
      
      return res.status(200).json({ ...report, image_url: `${url}/file/${report.image.path}`   });
    } catch (error) {
      logger((error as Error).message);
      return res.status(500).json({ error: "Something is wrong is the server." });
    }
  }
  
  async getReports(req: Request, res: Response) {
    try {
      const onlyPending = req.query.all === "true";
      const reports = await this.listReportsUsecase.execute(!onlyPending);
      
      return res.status(200).json({ reports });
    } catch (error) {
      logger((error as Error).message);
      return res.status(500).json({ error: "Something is wrong is the server." });
    }
  }

  async updateReportStatus(req: Request, res: Response) {
    const reportId = req.params.id;
    const { status } = req.body;

    if (!reportId) {
      return res.status(400).json({ error: "Report Id is required" });
    }

    if (!status) {
      return res.status(400).json({ error: "New status is required" });
    }

    if (status !== "approved" && status !== "rejected") {
      return res.status(400).json({ error: "Invalid status" });
    }

    try {
      await this.reviewreportUsecase.execute(reportId, status.toUpperCase());
      return res.status(200).json({ message: "report status updated" });
    } catch (error) {
      logger((error as Error).message);
      return res.status(500).json({ error: "Something is wrong is the server." });
    }
  }
}
