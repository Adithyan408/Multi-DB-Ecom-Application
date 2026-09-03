"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaUserRepository = void 0;
const prisma_1 = require("../client/prisma");
class PrismaUserRepository {
    async findByEmail(email) {
        const user = await prisma_1.prisma.user.findUnique({
            where: {
                email
            }
        });
        return user;
    }
    async create(user) {
        const createUser = await prisma_1.prisma.user.create({
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                passwordHash: user.passwordHash,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        });
        return createUser;
    }
}
exports.PrismaUserRepository = PrismaUserRepository;
//# sourceMappingURL=PrismaUserRepository.js.map