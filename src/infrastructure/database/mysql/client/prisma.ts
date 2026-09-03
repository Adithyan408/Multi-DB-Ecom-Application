import "dotenv/config";
import { PrismaClient } from "../../../../generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const databaseUrl = new URL(process.env.DATABASE_URL!);

const adapter = new PrismaMariaDb({
    host: databaseUrl.hostname,
    port: Number(databaseUrl.port),
    user: decodeURIComponent(databaseUrl.username),
    password: decodeURIComponent(databaseUrl.password),
    database: databaseUrl.pathname.slice(1),
});

export const prisma = new PrismaClient({ adapter });