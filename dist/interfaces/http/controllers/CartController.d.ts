import { Request, Response, NextFunction } from "express";
import { AddProductToCart } from "../../../application/cart/use-cases/AddProductToCart";
import { GetCart } from "../../../application/cart/use-cases/GetCart";
import { RemoveCartItem } from "../../../application/cart/use-cases/RemoveCartItem";
import { ClearCart } from "../../../application/cart/use-cases/ClearCart";
export declare class CartController {
    private readonly addProductToCart;
    private readonly getCart;
    private readonly removeCartItem;
    private readonly clearCart;
    constructor(addProductToCart: AddProductToCart, getCart: GetCart, removeCartItem: RemoveCartItem, clearCart: ClearCart);
    addItem(req: Request, res: Response, next: NextFunction): Promise<void>;
    get(req: Request, res: Response, next: NextFunction): Promise<void>;
    removeItem(req: Request, res: Response, next: NextFunction): Promise<void>;
    clear(req: Request, res: Response, next: NextFunction): Promise<void>;
}
