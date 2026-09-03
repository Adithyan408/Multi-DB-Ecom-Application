import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { IPasswordService } from "../../../domain/services/IPasswordService";
import { ITokenService } from "../../../domain/services/ITokenService";
export declare class LoginUser {
    private readonly userRepository;
    private readonly passwordService;
    private readonly tokenService;
    constructor(userRepository: IUserRepository, passwordService: IPasswordService, tokenService: ITokenService);
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
