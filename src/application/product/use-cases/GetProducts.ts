import { Product } from "../../../domain/entities/Product";
import { IProductReadRepository } from "../../../domain/repositories/IProductReadRepository";

export class GetProducts {
    constructor(
        private readonly productReadRepository: IProductReadRepository
    ) {}

    async execute(): Promise<Product[]> {
        return this.productReadRepository.findAll();
    }
}