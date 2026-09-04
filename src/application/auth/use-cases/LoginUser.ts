import { IRefreshTokenRepository } from "../../../domain/repositories/IRefreshTokenRespository";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { IPasswordService } from "../../../domain/services/IPasswordService";
import { ITokenService } from "../../../domain/services/ITokenService";
import crypto from "crypto"

export class LoginUser {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordService: IPasswordService,
    private readonly tokenService: ITokenService,
    private readonly refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  async exceute(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const passwordMatches = await this.passwordService.compare(
      password,
      user.passwordHash,
    );
    if (!passwordMatches) {
      throw new Error("invalid credentials");
    }
    const accessToken = this.tokenService.generateAccessToken(user.id);
    const refreshToken = this.tokenService.generateRefreshToken(user.id);

    const refreshTokenHash = this.tokenService.hashRefreshToken(refreshToken);

    await this.refreshTokenRepository.create({
      id: crypto.randomUUID(),
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
