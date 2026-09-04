"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCart = void 0;
class GetCart {
    cartRepository;
    constructor(cartRepository) {
        this.cartRepository = cartRepository;
    }
    async execute(userId) {
        return this.cartRepository.findByUserId(userId);
    }
}
exports.GetCart = GetCart;
//# sourceMappingURL=GetCart.js.map