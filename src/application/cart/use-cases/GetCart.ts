import { Cart } from "../../../domain/entities/Cart";
import { ICartRepository } from "../../../domain/repositories/ICartRepository";

export class GetCart {
  constructor(private readonly cartRepository: ICartRepository) {}

  async execute(userId: string): Promise<Cart | null> {
    return this.cartRepository.findByUserId(userId);
  }
}