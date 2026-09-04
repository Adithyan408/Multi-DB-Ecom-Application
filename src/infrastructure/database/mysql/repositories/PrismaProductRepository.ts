import { PrismaClient } from "../../../../generated/prisma/client";
import { Product } from "../../../../domain/entities/Product";
import { IProductRepository } from "../../../../domain/repositories/IProductRepository";

export class PrismaProductRepository implements IProductRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async create(product: Product): Promise<Product> {
        const createdProduct = await this.prisma.product.create({
            data: {
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt,
            },
        });

        return {
            ...createdProduct,
            price: Number(createdProduct.price),
        };
    }

    async findById(id: string): Promise<Product | null> {
        const product = await this.prisma.product.findUnique({
            where: { id },
        });

        if (!product) {
            return null;
        }

        return {
            ...product,
            price: Number(product.price),
        };
    }
}