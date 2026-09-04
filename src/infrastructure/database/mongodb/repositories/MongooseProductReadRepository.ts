import { Product } from "../../../../domain/entities/Product";
import { IProductReadRepository } from "../../../../domain/repositories/IProductReadRepository";
import { ProductReadModel } from "../models/ProductReadModel";

export class MongooseProductReadRepository
    implements IProductReadRepository
{
    async findAll(): Promise<Product[]> {
        const products = await ProductReadModel.find().lean();

        return products.map((product) => ({
            id: product._id,
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        }));
    }

    async findById(id: string): Promise<Product | null> {
        const product = await ProductReadModel.findById(id).lean();

        if (!product) {
            return null;
        }

        return {
            id: product._id,
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        };
    }
}