import { Router } from "express";
import { AvatarImageRoutes } from "./avatar-image.route";
import { ReportRoutes } from "./report.routes";

const router = Router();

const reportRoutes = new ReportRoutes()
const avatarRoutes = new AvatarImageRoutes();

const loadRoutes = async (server: any) => {
    await reportRoutes.registerRoutes(router);
    await avatarRoutes.registerRoutes(router);

    server.use(router);
}


export default loadRoutes;
