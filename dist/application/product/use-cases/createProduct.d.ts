import { Product } from "../../../domain/entities/Product";
import { IProductRepository } from "../../../domain/repositories/IProductRepository";
import { InMemoryEventBus } from "../../events/InMemoryEventBus";
export interface CreateProductInput {
    name: string;
    description: string;
    price: number;
    stock: number;
}
export declare class CreateProduct {
    private readonly productRepository;
    private readonly eventBus;
    constructor(productRepository: IProductRepository, eventBus: InMemoryEventBus);
    execute(input: CreateProductInput): Promise<Product>;
}
