import { Product } from "../../../../domain/entities/Product";
import { IProductReadModelRepository } from "../../../../domain/repositories/IProductReadModelRepository";
export declare class MongooseProductReadModelRepository implements IProductReadModelRepository {
    upsert(product: Product): Promise<void>;
}
