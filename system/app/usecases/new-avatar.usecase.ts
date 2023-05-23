import { randomUUID } from "crypto";
import { logger } from "../application/helpers/logger";
import { AvatarImageRepository } from "../application/repositories/AvatarImage.repository";
import { AvatarImageUsecases } from "../domain/AvatarImage";
import { RegisterreportUsecase } from "./register-report.usecase";


export class NewAvatarUseCase implements AvatarImageUsecases.NewImage {
  constructor(
    private avatarImageRepository: AvatarImageRepository,
    private registerreport: RegisterreportUsecase
  ) {}

  async execute(imageName: string, userReference: string): Promise<{
    id: string;
    path: string;
    report_id: string;
    date: Date;
  }> {
    const reportId = randomUUID();

    try { 
      const avatarImageRegistry = await this.avatarImageRepository.saveAvatarImage(imageName, userReference, reportId);
      if(!avatarImageRegistry) {
        throw new Error("Error on save avatar image");
      }

      await this.registerreport.execute(reportId, imageName, avatarImageRegistry.id);
      return {
        path: imageName, 
        id: avatarImageRegistry.id,
        report_id: reportId as string,
        date: avatarImageRegistry.createdAt,
      }
    } catch (error) {
      logger((error as Error).message);
      throw new Error("Error on save avatar image");
    }
  }
}
