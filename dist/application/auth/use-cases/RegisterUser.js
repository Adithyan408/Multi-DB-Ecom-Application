"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUser = void 0;
class RegisterUser {
    userRepository;
    passwordService;
    constructor(userRepository, passwordService) {
        this.userRepository = userRepository;
        this.passwordService = passwordService;
    }
    async execute(name, email, password) {
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error("User already exists");
        }
        const passwordHash = await this.passwordService.hash(password);
        const user = {
            id: crypto.randomUUID(),
            name,
            email,
            passwordHash,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        return this.userRepository.create(user);
    }
}
exports.RegisterUser = RegisterUser;
//# sourceMappingURL=RegisterUser.js.map