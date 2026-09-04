import { Product } from "../entities/Product";
export interface IProductReadRepository {
    findAll(): Promise<Product[]>;
    findById(id: string): Promise<Product | null>;
}
