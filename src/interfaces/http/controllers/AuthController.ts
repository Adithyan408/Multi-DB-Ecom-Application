import { NextFunction, Request, Response } from "express";
import { RegisterUser } from "../../../application/auth/use-cases/RegisterUser";
import { LoginUser } from "../../../application/auth/use-cases/LoginUser";
import { PrismaUserRepository } from "../../../infrastructure/database/mysql/repositories/PrismaUserRepository";
import { BcryptPasswordService } from "../../../infrastructure/services/BcryptPasswordService";
import { JwtTokenService } from "../../../infrastructure/services/JwtTokenService";
import { PrismaRefreshTokenRepository } from "../../../infrastructure/database/mysql/repositories/PrismaRefreshTokenRepository";
import {prisma} from "../../../infrastructure/database/mysql/client/prisma";
import { RefreshAccessToken } from "../../../application/auth/use-cases/RefreshAccessToken";

const userRepository = new PrismaUserRepository()
const passwordService = new BcryptPasswordService()
const tokenService = new JwtTokenService()
const refreshTokenRepository = new PrismaRefreshTokenRepository(prisma);
const refreshAccessToken = new RefreshAccessToken(refreshTokenRepository, tokenService)

const registerUser = new RegisterUser(
    userRepository, 
    passwordService
)
const loginUser = new LoginUser(
    userRepository, 
    passwordService, 
    tokenService,
    refreshTokenRepository
)

export class AuthController {
    async register(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const {name, email, password} = req.body;
            const user = await registerUser.execute(
                name, 
                email,
                password
            );

            return res.status(201).json({
                success: true,
                message: "User registered succesfully",
                data:{
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            })
        } catch (error) {
            next(error);
        }
    }

    async login(
        req: Request,
        res: Response,
        next: NextFunction
    ){
        try {
            const {email, password} = req.body;

            const result = await loginUser.exceute(
                email, 
                password
            )
            return res.status(200).json({
                success:true,
                message:"Login Successfull",
                data: result
            })
        } catch (error) {
            next(error)
        }
    }
    async refresh(req: Request, res: Response):Promise<void>{
        const {refreshToken} = req.body;

        const accessToken = await refreshAccessToken.execute(refreshToken);
        res.status(200).json({
            success: true, 
            message: "Access Token refreshed successfully",
            data:{
                accessToken
            }
        })
    }
}