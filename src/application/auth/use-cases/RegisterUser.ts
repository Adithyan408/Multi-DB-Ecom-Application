import { IUserRepository } from "../../../domain/repositories/IUserRepository";

export class RegisterUser { 
    constructor(
        private readonly userRepository: IUserRepository
    ){}
    
    async execute(
        name: string,
        email: string,
        passwordHash: string
    ){
        const existingUser = await this.userRepository.findByEmail(email);

        if(existingUser){
            throw new Error("User already exists");
        }

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