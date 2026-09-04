import { ProductCreated } from "../../../domain/events/ProductCreated";
import { IProductReadModelRepository } from "../../../domain/repositories/IProductReadModelRepository";

export class ProductProjection {
  constructor(
    private readonly productReadModelRepository: IProductReadModelRepository
  ) {}

  async handle(event: ProductCreated): Promise<void> {
    await this.productReadModelRepository.upsert(event.product);
  }
}