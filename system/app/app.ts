import express, { Express } from "express";
import cors from "cors";
import loadRoutes from "./infra/express/routes";
import { logger } from "./application/helpers/logger";
import { loadDatabase } from "./infra/prisma";
import { reportQueue } from "./factories";

class App {
  server: Express;
  prisma: any;

  constructor() {
    this.server = express();
    this.loadMiddleware();
    
  }

  loadMiddleware() {
    reportQueue.process();
    this.server.use(cors({
      origin: '*',
    }));
    this.server.use(express.json());
  }

  async start(port: number) {
    await loadDatabase();
    await loadRoutes(this.server);
    logger("Loading server...");
    await this.server.listen(port, () => logger(`Running on port ${port}`));
  }
}

export default new App();
