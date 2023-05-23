import { Repository } from "./Repository";
import { ReportStatus } from "../../domain/Report";
import { prisma } from "../../infra/prisma";



export class ReportRepository implements Repository {
  async registerreport(id: string, imageReference: string) {
    const report =  await prisma.report.create({
      data: { 
        id,
        imageReference,
      },
    });

    return report;
  }

  async addreportAnalysis(id: string, tags: string, probability: number) {
    return await prisma.report.update({
      where: { id },
      data: {
        tags,
        probability,
        reportDate: new Date(),
      },
    });
  }

  async updateReportStatus(id: string, status: ReportStatus) {
    return await prisma.report.update({
      where: { id },
      data: {
        status,
      },
    });
  }

  async getReport(id: string) {
    return await prisma.report.findUnique({
      where: { id },
      include: {
        image: true,
      },
    });
  }

  async getReports(onlyPending = true) {
    return await prisma.report.findMany({
      orderBy: {
        probability: "desc",
      }, 
      where: {
        status: onlyPending ? "pending" : undefined,
      }
    });
  }
}
