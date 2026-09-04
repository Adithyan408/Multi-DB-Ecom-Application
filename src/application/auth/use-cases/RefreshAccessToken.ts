import { IRefreshTokenRepository } from "../../../domain/repositories/IRefreshTokenRespository";
import { ITokenService } from "../../../domain/services/ITokenService";

export class RefreshAccessToken {
    constructor(
        private readonly refreshTokenRepository: IRefreshTokenRepository,
        private readonly tokenService: ITokenService
    ) {}

    async execute(refreshToken: string): Promise<string> {
        const tokenHash = this.tokenService.hashRefreshToken(refreshToken);

        const storedToken =
            await this.refreshTokenRepository.findByTokenHash(tokenHash);

        if (!storedToken) {
            throw new Error("Invalid refresh token");
        }

        if (storedToken.expiresAt < new Date()) {
            throw new Error("Refresh token expired");
        }

        return this.tokenService.generateAccessToken(storedToken.userId);
    }
}