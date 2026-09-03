import {prisma} from "../client/prisma";
import { IUserRepository } from "../../../../domain/repositories/IUserRepository";
import { User } from "../../../../domain/entities/User";

export class PrismaUserRepository implements IUserRepository{
    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        return user
    }
    async create(user: User): Promise<User> {
        const createUser = await prisma.user.create({
            data:{
                id: user.id,
                name: user.name,
                email: user.email,
                passwordHash: user.passwordHash,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        })
        return createUser
    }
}