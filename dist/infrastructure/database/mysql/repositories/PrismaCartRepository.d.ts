import { PrismaClient } from "../../../../generated/prisma/client";
import { Cart } from "../../../../domain/entities/Cart";
import { ICartRepository } from "../../../../domain/repositories/ICartRepository";
export declare class PrismaCartRepository implements ICartRepository {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    findByUserId(userId: string): Promise<Cart | null>;
    create(cart: Cart): Promise<Cart>;
    update(cart: Cart): Promise<Cart>;
    private toDomain;
}
