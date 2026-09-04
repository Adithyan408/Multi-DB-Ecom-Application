import crypto from "crypto";
import { Product } from "../../../domain/entities/Product";
import { ProductCreated } from "../../../domain/events/ProductCreated";
import { IProductRepository } from "../../../domain/repositories/IProductRepository";
import { InMemoryEventBus } from "../../events/InMemoryEventBus";

export interface CreateProductInput {
  name: string;
  description: string;
  price: number;
  stock: number;
}

export class CreateProduct {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly eventBus: InMemoryEventBus
  ) {}

  async execute(input: CreateProductInput): Promise<Product> {
    const now = new Date();

    const product: Product = {
      id: crypto.randomUUID(),
      name: input.name,
      description: input.description,
      price: input.price,
      stock: input.stock,
      createdAt: now,
      updatedAt: now,
    };

    const createdProduct = await this.productRepository.create(product);

    await this.eventBus.publish<ProductCreated>({
      type: "ProductCreated",
      product: createdProduct,
    });

    return createdProduct;
  }
}