import { Product } from "../../../../domain/entities/Product";
import { IProductReadModelRepository } from "../../../../domain/repositories/IProductReadModelRepository";
import { ProductReadModel } from "../models/ProductReadModel";

export class MongooseProductReadModelRepository
  implements IProductReadModelRepository
{
  async upsert(product: Product): Promise<void> {
    await ProductReadModel.findByIdAndUpdate(
      product.id,
      {
        _id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      },
      {
        upsert: true,
        new: true,
      }
    );
  }
}