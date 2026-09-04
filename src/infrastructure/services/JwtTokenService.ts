import jwt from "jsonwebtoken";
import crypto from "crypto"
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
    hashRefreshToken(token: string): string {
        return crypto
            .createHash("sha256")
            .update(token)
            .digest("hex")
    }
}