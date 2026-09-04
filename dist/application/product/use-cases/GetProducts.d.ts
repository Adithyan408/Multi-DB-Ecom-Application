import { Product } from "../../../domain/entities/Product";
import { IProductReadRepository } from "../../../domain/repositories/IProductReadRepository";
export declare class GetProducts {
    private readonly productReadRepository;
    constructor(productReadRepository: IProductReadRepository);
    execute(): Promise<Product[]>;
}
