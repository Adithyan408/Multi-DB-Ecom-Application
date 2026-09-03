import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { IPasswordService } from "../../../domain/services/IPasswordService";
export declare class RegisterUser {
    private readonly userRepository;
    private readonly passwordService;
    constructor(userRepository: IUserRepository, passwordService: IPasswordService);
    execute(name: string, email: string, password: string): Promise<import("../../../domain/entities/User").User>;
}
