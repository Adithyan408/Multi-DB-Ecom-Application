import { Product } from "../../../../domain/entities/Product";
import { IProductReadRepository } from "../../../../domain/repositories/IProductReadRepository";
export declare class MongooseProductReadRepository implements IProductReadRepository {
    findAll(): Promise<Product[]>;
    findById(id: string): Promise<Product | null>;
}
