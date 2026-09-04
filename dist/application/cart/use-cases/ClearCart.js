"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClearCart = void 0;
class ClearCart {
    cartRepository;
    constructor(cartRepository) {
        this.cartRepository = cartRepository;
    }
    async execute(userId) {
        const cart = await this.cartRepository.findByUserId(userId);
        if (!cart) {
            return null;
        }
        cart.items.splice(0, cart.items.length);
        return this.cartRepository.update(cart);
    }
}
exports.ClearCart = ClearCart;
//# sourceMappingURL=ClearCart.js.map