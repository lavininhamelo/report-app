import { ReportQueue } from "../application/contracts/queue/generateReport.queue";
import { AvatarImageService } from "../application/contracts/services/avatar-image.service";
import { ReportService } from "../application/contracts/services/report.service";
import { AvatarImageRepository } from "../application/repositories/AvatarImage.repository";
import { ReportRepository } from "../application/repositories/Report.repository";
import { GeneratereportUsecase } from "../usecases/generate-report.usecase";
import { ListReportsUseCase } from "../usecases/list-reports.usecases";
import { NewAvatarUseCase } from "../usecases/new-avatar.usecase";
import { RegisterreportUsecase } from "../usecases/register-report.usecase";
import { ReviewreportUseCase } from "../usecases/review-report.usecase";
import { ViewreportUseCase } from "../usecases/view-report.usecase";

// Repositories
const registerreportRepository = new ReportRepository();
const avatarImageRepository = new AvatarImageRepository();



const generatereportUsecase = new GeneratereportUsecase(registerreportRepository);
export const reportQueue = new ReportQueue(generatereportUsecase);

const registerreportUsecase = new RegisterreportUsecase(registerreportRepository, reportQueue);
const reviewreportUsecase = new ReviewreportUseCase(registerreportRepository);
const listReportsUsecase = new ListReportsUseCase(registerreportRepository);
const viewreportUsecase = new ViewreportUseCase(registerreportRepository);
const newAvatarUseCase = new NewAvatarUseCase(avatarImageRepository, registerreportUsecase);

export const avatarImageService = new AvatarImageService(newAvatarUseCase);
export const reportService = new ReportService(viewreportUsecase, listReportsUsecase, reviewreportUsecase)
