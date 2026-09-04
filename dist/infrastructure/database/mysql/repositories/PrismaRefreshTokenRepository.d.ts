import { PrismaClient } from "../../../../generated/prisma/client";
import { RefreshToken } from "../../../../domain/entities/RefreshToken";
import { IRefreshTokenRepository } from "../../../../domain/repositories/IRefreshTokenRespository";
export declare class PrismaRefreshTokenRepository implements IRefreshTokenRepository {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    create(refreshToken: RefreshToken): Promise<RefreshToken>;
    findByTokenHash(tokenHash: string): Promise<RefreshToken | null>;
}
