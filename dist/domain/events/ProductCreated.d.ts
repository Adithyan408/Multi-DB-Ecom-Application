import { Product } from "../entities/Product";
export interface ProductCreated {
    type: "ProductCreated";
    product: Product;
}
