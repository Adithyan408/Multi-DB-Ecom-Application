import { Product } from "../../../domain/entities/Product";
import { IProductReadRepository } from "../../../domain/repositories/IProductReadRepository";

export class GetProductById {
  constructor(
    private readonly productReadRepository: IProductReadRepository
  ) {}

  async execute(id: string): Promise<Product | null> {
    return this.productReadRepository.findById(id);
  }
}