"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductProjection = void 0;
class ProductProjection {
    productReadModelRepository;
    constructor(productReadModelRepository) {
        this.productReadModelRepository = productReadModelRepository;
    }
    async handle(event) {
        await this.productReadModelRepository.upsert(event.product);
    }
}
exports.ProductProjection = ProductProjection;
//# sourceMappingURL=ProductProjection.js.map