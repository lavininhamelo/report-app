import { Request, Response } from "express";
import { logger } from "../../helpers/logger";
import { NewAvatarUseCase } from "../../../usecases/new-avatar.usecase";
import path from "path";
import fs from "fs";

export class AvatarImageService {
  constructor(private newImageUsecase: NewAvatarUseCase) {
  }

  async newImage(req: Request, res: Response) {
    const filepath = req.file?.filename;

    if (!filepath) {
      return res.status(400).json({ error: "No file received!" });
    }

    try {
      const userReference = req.headers["user-reference"] as string;
      const result = await this.newImageUsecase.execute(filepath, userReference);
      return res.status(200).json({ message: "Image saved successfully", report: result });
    } catch (error) {
      logger((error as Error).message);
      return res.status(500).json({ error: "Something is wrong is the server." });
    }
  }

  async getFile(req: Request, res: Response) {
    try {
      const filePathParams = req.params.path;
  
      const filePath = path.join(__dirname,'..', '..', '..', '..', 'tmp', 'uploads', filePathParams);
  
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: "File not found" });
      }
  
      res.sendFile(filePath);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  
}
