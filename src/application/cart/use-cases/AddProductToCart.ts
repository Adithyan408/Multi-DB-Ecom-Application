import { randomUUID } from "crypto";
import { Cart } from "../../../domain/entities/Cart";
import { ICartRepository } from "../../../domain/repositories/ICartRepository";

interface AddProductToCartInput {
  userId: string;
  productId: string;
  quantity: number;
}

export class AddProductToCart {
  constructor(private readonly cartRepository: ICartRepository) {}

  async execute(input: AddProductToCartInput): Promise<Cart> {
    let cart = await this.cartRepository.findByUserId(input.userId);

    if (!cart) {
      cart = new Cart(
        randomUUID(),
        input.userId,
        [
          {
            productId: input.productId,
            quantity: input.quantity,
          },
        ],
        new Date(),
        new Date(),
      );

      return this.cartRepository.create(cart);
    }

    const existingItem = cart.items.find(
      (item) => item.productId === input.productId,
    );

    if (existingItem) {
      existingItem.quantity += input.quantity;
    } else {
      cart.items.push({
        productId: input.productId,
        quantity: input.quantity,
      });
    }

    return this.cartRepository.update(cart);
  }
}