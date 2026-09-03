import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { IPasswordService } from "../../../domain/services/IPasswordService";
import { ITokenService } from "../../../domain/services/ITokenService";

export class LoginUser{
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly passwordService: IPasswordService,
        private readonly tokenService: ITokenService
    ){}

    async exceute(email: string, password: string){
        const user = await this.userRepository.findByEmail(email)
        if(!user){
            throw new Error("Invalid credentials")
        }
        const passwordMatches = await this.passwordService.compare(password, user.passwordHash)
        if(!passwordMatches){
            throw new Error("invalid credentials")
        }
        const accessToken = this.tokenService.generateAccessToken(user.id);
        const refreshToken = this.tokenService.generateRefreshToken(user.id);

        return{
            user:{
                id: user.id,
                name: user.name,
                email: user.email
            },
            accessToken,
            refreshToken
        }
    }
}