import { PrismaClient } from "@prisma/client";
import { logger } from "../../application/helpers/logger";

export const prisma = new PrismaClient();
export const loadDatabase = async () => {
    logger("Loading database...");
    await prisma.$connect();
};
