"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
class Cart {
    id;
    userId;
    items;
    createdAt;
    updatedAt;
    constructor(id, userId, items, createdAt, updatedAt) {
        this.id = id;
        this.userId = userId;
        this.items = items;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.Cart = Cart;
//# sourceMappingURL=Cart.js.map