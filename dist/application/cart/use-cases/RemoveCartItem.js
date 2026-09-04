"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveCartItem = void 0;
class RemoveCartItem {
    cartRepository;
    constructor(cartRepository) {
        this.cartRepository = cartRepository;
    }
    async execute(input) {
        const cart = await this.cartRepository.findByUserId(input.userId);
        if (!cart) {
            return null;
        }
        const updatedItems = cart.items.filter((item) => item.productId !== input.productId);
        cart.items.splice(0, cart.items.length, ...updatedItems);
        return this.cartRepository.update(cart);
    }
}
exports.RemoveCartItem = RemoveCartItem;
//# sourceMappingURL=RemoveCartItem.js.map