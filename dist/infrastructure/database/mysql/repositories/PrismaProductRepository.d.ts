import { PrismaClient } from "../../../../generated/prisma/client";
import { Product } from "../../../../domain/entities/Product";
import { IProductRepository } from "../../../../domain/repositories/IProductRepository";
export declare class PrismaProductRepository implements IProductRepository {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    create(product: Product): Promise<Product>;
    findById(id: string): Promise<Product | null>;
}
