import { PrismaClient } from "../../../../generated/prisma/client";
import { RefreshToken } from "../../../../domain/entities/RefreshToken";
import { IRefreshTokenRepository } from "../../../../domain/repositories/IRefreshTokenRespository";


export class PrismaRefreshTokenRepository implements IRefreshTokenRepository {
    constructor(private readonly prisma: PrismaClient){}

    async create(refreshToken: RefreshToken): Promise<RefreshToken>{
        const createdToken = await this.prisma.refreshToken.create({
            data:{
                id: refreshToken.id,
                tokenHash: refreshToken.tokenHash,
                userId: refreshToken.userId,
                expiresAt: refreshToken.expiresAt,
                createdAt: refreshToken.createdAt,
            }
        })
        return createdToken
    }

    async findByTokenHash(tokenHash: string): Promise<RefreshToken | null> {
        const refreshToken = await this.prisma.refreshToken.findUnique({
            where:{
                tokenHash
            }
        })
        return refreshToken
    }
}