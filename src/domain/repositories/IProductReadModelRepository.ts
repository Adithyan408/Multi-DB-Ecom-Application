import { Product } from "../entities/Product";

export interface IProductReadModelRepository {
  upsert(product: Product): Promise<void>;
}