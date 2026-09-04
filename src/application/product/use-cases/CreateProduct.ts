import crypto from "crypto";
import { Product } from "../../../domain/entities/Product";
import { IProductRepository } from "../../../domain/repositories/IProductRepository";

export interface CreateProductInput{
    name: string,
    description: string,
    price: number,
    stock: number
}

export class CreateProduct{
    constructor(
        private readonly productRepositroy: IProductRepository
    ){}
    async execute(input: CreateProductInput): Promise<Product> {
        const now = new Date();

        const product: Product = {
            id: crypto.randomUUID(),
            name: input.name,
            description: input.description,
            price: input.price,
            stock: input.stock,
            createdAt: now,
            updatedAt: now
        }
        return this.productRepositroy.create(product)
    }
}