"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
require("dotenv/config");
const client_1 = require("../../../../generated/prisma/client");
const adapter_mariadb_1 = require("@prisma/adapter-mariadb");
const databaseUrl = new URL(process.env.DATABASE_URL);
const adapter = new adapter_mariadb_1.PrismaMariaDb({
    host: databaseUrl.hostname,
    port: Number(databaseUrl.port),
    user: decodeURIComponent(databaseUrl.username),
    password: decodeURIComponent(databaseUrl.password),
    database: databaseUrl.pathname.slice(1),
});
exports.prisma = new client_1.PrismaClient({ adapter });
//# sourceMappingURL=prisma.js.map