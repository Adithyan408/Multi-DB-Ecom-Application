import { Cart } from "../../../domain/entities/Cart";
import { ICartRepository } from "../../../domain/repositories/ICartRepository";

interface RemoveCartItemInput {
  userId: string;
  productId: string;
}

export class RemoveCartItem {
  constructor(private readonly cartRepository: ICartRepository) {}

  async execute(input: RemoveCartItemInput): Promise<Cart | null> {
    const cart = await this.cartRepository.findByUserId(input.userId);

    if (!cart) {
      return null;
    }

    const updatedItems = cart.items.filter(
      (item) => item.productId !== input.productId,
    );

    cart.items.splice(0, cart.items.length, ...updatedItems);

    return this.cartRepository.update(cart);
  }
}
