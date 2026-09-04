import { Request, Response, NextFunction } from "express";
import { AddProductToCart } from "../../../application/cart/use-cases/AddProductToCart";
import { GetCart } from "../../../application/cart/use-cases/GetCart";
import { RemoveCartItem } from "../../../application/cart/use-cases/RemoveCartItem";
import { ClearCart } from "../../../application/cart/use-cases/ClearCart";

export class CartController {
  constructor(
    private readonly addProductToCart: AddProductToCart,
    private readonly getCart: GetCart,
    private readonly removeCartItem: RemoveCartItem,
    private readonly clearCart: ClearCart,
  ) {}

  async addItem(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { userId, productId, quantity } = req.body;

      const cart = await this.addProductToCart.execute({
        userId,
        productId,
        quantity,
      });

      res.status(200).json(cart);
    } catch (error) {
      next(error);
    }
  }
  async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId } = req.body;

      const cart = await this.getCart.execute(userId);

      res.status(200).json(cart);
    } catch (error) {
      next(error);
    }
  }

  async removeItem(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { userId } = req.body;
      const productId = req.params.productId as string;

      const cart = await this.removeCartItem.execute({
        userId,
        productId,
      });

      res.status(200).json(cart);
    } catch (error) {
      next(error);
    }
  }

  async clear(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId } = req.body;

      const cart = await this.clearCart.execute(userId);

      res.status(200).json(cart);
    } catch (error) {
      next(error);
    }
  }
}
