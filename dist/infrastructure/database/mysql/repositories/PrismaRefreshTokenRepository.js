"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaRefreshTokenRepository = void 0;
class PrismaRefreshTokenRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(refreshToken) {
        const createdToken = await this.prisma.refreshToken.create({
            data: {
                id: refreshToken.id,
                tokenHash: refreshToken.tokenHash,
                userId: refreshToken.userId,
                expiresAt: refreshToken.expiresAt,
                createdAt: refreshToken.createdAt,
            }
        });
        return createdToken;
    }
    async findByTokenHash(tokenHash) {
        const refreshToken = await this.prisma.refreshToken.findUnique({
            where: {
                tokenHash
            }
        });
        return refreshToken;
    }
}
exports.PrismaRefreshTokenRepository = PrismaRefreshTokenRepository;
//# sourceMappingURL=PrismaRefreshTokenRepository.js.map