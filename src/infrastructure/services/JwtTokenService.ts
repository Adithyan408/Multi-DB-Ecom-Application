import jwt from "jsonwebtoken";
import { ITokenService } from "../../domain/services/ITokenService";

export class JwtTokenService implements ITokenService {
    private readonly secret = process.env.JWT_SECRET!;
    generateAccessToken(userId: string): string {
        return jwt.sign(
            {userId}, 
            this.secret,
            {expiresIn: "15m"}
        )
    }

    generateRefreshToken(userId: string): string {
        return jwt.sign(
            {userId},
            this.secret,
            {expiresIn: "7d"}
        )
    }
}