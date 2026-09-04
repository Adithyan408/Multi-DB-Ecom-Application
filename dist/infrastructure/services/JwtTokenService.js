"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtTokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
class JwtTokenService {
    secret = process.env.JWT_SECRET;
    generateAccessToken(userId) {
        return jsonwebtoken_1.default.sign({ userId }, this.secret, { expiresIn: "15m" });
    }
    generateRefreshToken(userId) {
        return jsonwebtoken_1.default.sign({ userId }, this.secret, { expiresIn: "7d" });
    }
    hashRefreshToken(token) {
        return crypto_1.default
            .createHash("sha256")
            .update(token)
            .digest("hex");
    }
}
exports.JwtTokenService = JwtTokenService;
//# sourceMappingURL=JwtTokenService.js.map