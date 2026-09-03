"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUser = void 0;
class LoginUser {
    userRepository;
    passwordService;
    tokenService;
    constructor(userRepository, passwordService, tokenService) {
        this.userRepository = userRepository;
        this.passwordService = passwordService;
        this.tokenService = tokenService;
    }
    async excute(email, password) {
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
        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            accessToken,
            refreshToken
        };
    }
}
exports.LoginUser = LoginUser;
//# sourceMappingURL=LoginUser.js.map