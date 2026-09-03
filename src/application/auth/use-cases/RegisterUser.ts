import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { IPasswordService } from "../../../domain/services/IPasswordService";

export class RegisterUser { 
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly passwordService: IPasswordService
    ){}
    
    async execute(
        name: string,
        email: string,
        password: string
    ){
        const existingUser = await this.userRepository.findByEmail(email);

        if(existingUser){
            throw new Error("User already exists");
        }
        const passwordHash = await this.passwordService.hash(password);
        const user = {
            id:crypto.randomUUID(),
            name, 
            email,
            passwordHash,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        return this.userRepository.create(user)
    }

}