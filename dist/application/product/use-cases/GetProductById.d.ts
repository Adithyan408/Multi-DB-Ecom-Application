import { Product } from "../../../domain/entities/Product";
import { IProductReadRepository } from "../../../domain/repositories/IProductReadRepository";
export declare class GetProductById {
    private readonly productReadRepository;
    constructor(productReadRepository: IProductReadRepository);
    execute(id: string): Promise<Product | null>;
}
