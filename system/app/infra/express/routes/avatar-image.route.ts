import { Router } from "express";
import uploader from "../../multer/index";
import { avatarImageService } from "../../../factories";

export class AvatarImageRoutes {
  constructor() {}

  async registerRoutes(router: Router) {
    router.post("/new-image", uploader.single("file"), avatarImageService.newImage.bind(avatarImageService));
    router.get("/file/:path", avatarImageService.getFile.bind(avatarImageService));
  }
}

export default  AvatarImageRoutes;
