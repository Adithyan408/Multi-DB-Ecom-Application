"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUser = void 0;
const crypto_1 = __importDefault(require("crypto"));
class LoginUser {
    userRepository;
    passwordService;
    tokenService;
    refreshTokenRepository;
    constructor(userRepository, passwordService, tokenService, refreshTokenRepository) {
        this.userRepository = userRepository;
        this.passwordService = passwordService;
        this.tokenService = tokenService;
        this.refreshTokenRepository = refreshTokenRepository;
    }
    async exceute(email, password) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error("Invalid credentials");
        }
        const passwordMatches = await this.passwordService.compare(password, user.passwordHash);
        if (!passwordMatches) {
            throw new Error("invalid credentials");
        }
        const accessToken = this.tokenService.generateAccessToken(user.id);
        const refreshToken = this.tokenService.generateRefreshToken(user.id);
        const refreshTokenHash = this.tokenService.hashRefreshToken(refreshToken);
        await this.refreshTokenRepository.create({
            id: crypto_1.default.randomUUID(),
            tokenHash: refreshTokenHash,
            userId: user.id,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            createdAt: new Date(),
        });
        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            accessToken,
            refreshToken,
        };
    }
}
exports.LoginUser = LoginUser;
//# sourceMappingURL=LoginUser.js.map