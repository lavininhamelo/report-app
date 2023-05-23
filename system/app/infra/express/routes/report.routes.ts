import { Router } from "express";
import { reportService } from "../../../factories";

export class ReportRoutes {
  constructor() {}

async registerRoutes(router: Router) {
    router.get("/report/:id", (req, res) => reportService.getReport(req, res));
    router.get("/reports", (req, res) => {
      reportService.getReports(req, res);
    });
    router.put("/review-report/:id", (req, res) => reportService.updateReportStatus(req, res));
  }
}

export default ReportRoutes;