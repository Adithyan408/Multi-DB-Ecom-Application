import { IRefreshTokenRepository } from "../../../domain/repositories/IRefreshTokenRespository";
import { ITokenService } from "../../../domain/services/ITokenService";
export declare class RefreshAccessToken {
    private readonly refreshTokenRepository;
    private readonly tokenService;
    constructor(refreshTokenRepository: IRefreshTokenRepository, tokenService: ITokenService);
    execute(refreshToken: string): Promise<string>;
}
