import { Router } from "express";
import { CartController } from "../controllers/CartController";
import { AddProductToCart } from "../../../application/cart/use-cases/AddProductToCart";
import { PrismaCartRepository } from "../../../infrastructure/database/mysql/repositories/PrismaCartRepository";
import { prisma } from "../../../infrastructure/database/mysql/client/prisma";
import { GetCart } from "../../../application/cart/use-cases/GetCart";
import { RemoveCartItem } from "../../../application/cart/use-cases/RemoveCartItem";
import { ClearCart } from "../../../application/cart/use-cases/ClearCart";

const cartRepository = new PrismaCartRepository(prisma);

const addProductToCart = new AddProductToCart(cartRepository);
const getCart = new GetCart(cartRepository);

const removeCartItem = new RemoveCartItem(cartRepository);

const clearCart = new ClearCart(cartRepository);

const cartController = new CartController(
  addProductToCart,
  getCart,
  removeCartItem,
  clearCart,
);

const cartRouter = Router();

cartRouter.post("/items", (req, res, next) =>
  cartController.addItem(req, res, next),
);
cartRouter.post("/items", (req, res, next) =>
  cartController.addItem(req, res, next),
);

cartRouter.get("/", (req, res, next) => cartController.get(req, res, next));

cartRouter.delete("/items/:productId", (req, res, next) =>
  cartController.removeItem(req, res, next),
);

cartRouter.delete("/", (req, res, next) =>
  cartController.clear(req, res, next),
);

export default cartRouter;
