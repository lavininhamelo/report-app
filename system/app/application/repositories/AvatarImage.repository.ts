import { prisma } from "../../infra/prisma";
import { Repository } from "./Repository";

export class AvatarImageRepository implements Repository {

  async saveAvatarImage(path: string, userReference: string, reportId: string){

    const avatar = await prisma.avatarImage.create({
      data: {
       path,
       reportId,
       userReference,
      },
    });

    if (!avatar) {
      throw new Error("Error on save avatar image");
    }

    return avatar;
  }
}
