import { ITokenService } from "../../domain/services/ITokenService";
export declare class JwtTokenService implements ITokenService {
    private readonly secret;
    generateAccessToken(userId: string): string;
    generateRefreshToken(userId: string): string;
}
