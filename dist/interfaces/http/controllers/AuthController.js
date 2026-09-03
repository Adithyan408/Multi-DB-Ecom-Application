"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const RegisterUser_1 = require("../../../application/auth/use-cases/RegisterUser");
const LoginUser_1 = require("../../../application/auth/use-cases/LoginUser");
const PrismaUserRepository_1 = require("../../../infrastructure/database/mysql/repositories/PrismaUserRepository");
const BcryptPasswordService_1 = require("../../../infrastructure/services/BcryptPasswordService");
const JwtTokenService_1 = require("../../../infrastructure/services/JwtTokenService");
const userRepository = new PrismaUserRepository_1.PrismaUserRepository();
const passwordService = new BcryptPasswordService_1.BcryptPasswordService();
const tokenService = new JwtTokenService_1.JwtTokenService();
const registerUser = new RegisterUser_1.RegisterUser(userRepository, passwordService);
const loginUser = new LoginUser_1.LoginUser(userRepository, passwordService, tokenService);
class AuthController {
    async register(req, res, next) {
        try {
            const { name, email, password } = req.body;
            const user = await registerUser.execute(name, email, password);
            return res.status(201).json({
                success: true,
                message: "User registered succesfully",
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            });
        }
        catch (error) {
            next(error);
        }
    }
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const result = await loginUser.exceute(email, password);
            return res.status(200).json({
                success: true,
                message: "Login Successfull",
                data: result
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map