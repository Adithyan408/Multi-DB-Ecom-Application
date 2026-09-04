import { Cart } from "../../../domain/entities/Cart";
import { ICartRepository } from "../../../domain/repositories/ICartRepository";

export class ClearCart {
  constructor(private readonly cartRepository: ICartRepository) {}

  async execute(userId: string): Promise<Cart | null> {
    const cart = await this.cartRepository.findByUserId(userId);

    if (!cart) {
      return null;
    }

    cart.items.splice(0, cart.items.length);

    return this.cartRepository.update(cart);
  }
}