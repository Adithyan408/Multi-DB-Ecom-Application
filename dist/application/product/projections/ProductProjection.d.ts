import { ProductCreated } from "../../../domain/events/ProductCreated";
import { IProductReadModelRepository } from "../../../domain/repositories/IProductReadModelRepository";
export declare class ProductProjection {
    private readonly productReadModelRepository;
    constructor(productReadModelRepository: IProductReadModelRepository);
    handle(event: ProductCreated): Promise<void>;
}
