"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
class CartController {
    addProductToCart;
    getCart;
    removeCartItem;
    clearCart;
    constructor(addProductToCart, getCart, removeCartItem, clearCart) {
        this.addProductToCart = addProductToCart;
        this.getCart = getCart;
        this.removeCartItem = removeCartItem;
        this.clearCart = clearCart;
    }
    async addItem(req, res, next) {
        try {
            const { userId, productId, quantity } = req.body;
            const cart = await this.addProductToCart.execute({
                userId,
                productId,
                quantity,
            });
            res.status(200).json(cart);
        }
        catch (error) {
            next(error);
        }
    }
    async get(req, res, next) {
        try {
            const { userId } = req.body;
            const cart = await this.getCart.execute(userId);
            res.status(200).json(cart);
        }
        catch (error) {
            next(error);
        }
    }
    async removeItem(req, res, next) {
        try {
            const { userId } = req.body;
            const productId = req.params.productId;
            const cart = await this.removeCartItem.execute({
                userId,
                productId,
            });
            res.status(200).json(cart);
        }
        catch (error) {
            next(error);
        }
    }
    async clear(req, res, next) {
        try {
            const { userId } = req.body;
            const cart = await this.clearCart.execute(userId);
            res.status(200).json(cart);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.CartController = CartController;
//# sourceMappingURL=CartController.js.map