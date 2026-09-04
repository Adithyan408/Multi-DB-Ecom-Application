import { Cart } from "../entities/Cart";

export interface ICartRepository {
  findByUserId(userId: string): Promise<Cart | null>;
  create(cart: Cart): Promise<Cart>;
  update(cart: Cart): Promise<Cart>;
}