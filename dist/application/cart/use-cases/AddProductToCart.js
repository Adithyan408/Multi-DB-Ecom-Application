"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddProductToCart = void 0;
const crypto_1 = require("crypto");
const Cart_1 = require("../../../domain/entities/Cart");
class AddProductToCart {
    cartRepository;
    constructor(cartRepository) {
        this.cartRepository = cartRepository;
    }
    async execute(input) {
        let cart = await this.cartRepository.findByUserId(input.userId);
        if (!cart) {
            cart = new Cart_1.Cart((0, crypto_1.randomUUID)(), input.userId, [
                {
                    productId: input.productId,
                    quantity: input.quantity,
                },
            ], new Date(), new Date());
            return this.cartRepository.create(cart);
        }
        const existingItem = cart.items.find((item) => item.productId === input.productId);
        if (existingItem) {
            existingItem.quantity += input.quantity;
        }
        else {
            cart.items.push({
                productId: input.productId,
                quantity: input.quantity,
            });
        }
        return this.cartRepository.update(cart);
    }
}
exports.AddProductToCart = AddProductToCart;
//# sourceMappingURL=AddProductToCart.js.map