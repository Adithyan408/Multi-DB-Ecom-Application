import { RefreshToken } from "../entities/RefreshToken";
export interface IRefreshTokenRepository {
    create(refreshToken: RefreshToken): Promise<RefreshToken>;
    findByTokenHash(tokenHash: string): Promise<RefreshToken | null>;
}
