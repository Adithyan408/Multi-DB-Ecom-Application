import { IRefreshTokenRepository } from "../../../domain/repositories/IRefreshTokenRespository";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { IPasswordService } from "../../../domain/services/IPasswordService";
import { ITokenService } from "../../../domain/services/ITokenService";
export declare class LoginUser {
    private readonly userRepository;
    private readonly passwordService;
    private readonly tokenService;
    private readonly refreshTokenRepository;
    constructor(userRepository: IUserRepository, passwordService: IPasswordService, tokenService: ITokenService, refreshTokenRepository: IRefreshTokenRepository);
    exceute(email: string, password: string): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
        };
        accessToken: string;
        refreshToken: string;
    }>;
}
