"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshAccessToken = void 0;
class RefreshAccessToken {
    refreshTokenRepository;
    tokenService;
    constructor(refreshTokenRepository, tokenService) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.tokenService = tokenService;
    }
    async execute(refreshToken) {
        const tokenHash = this.tokenService.hashRefreshToken(refreshToken);
        const storedToken = await this.refreshTokenRepository.findByTokenHash(tokenHash);
        if (!storedToken) {
            throw new Error("Invalid refresh token");
        }
        if (storedToken.expiresAt < new Date()) {
            throw new Error("Refresh token expired");
        }
        return this.tokenService.generateAccessToken(storedToken.userId);
    }
}
exports.RefreshAccessToken = RefreshAccessToken;
//# sourceMappingURL=RefreshAccessToken.js.map