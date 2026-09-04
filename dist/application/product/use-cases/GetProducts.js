"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProducts = void 0;
class GetProducts {
    productReadRepository;
    constructor(productReadRepository) {
        this.productReadRepository = productReadRepository;
    }
    async execute() {
        return this.productReadRepository.findAll();
    }
}
exports.GetProducts = GetProducts;
//# sourceMappingURL=GetProducts.js.map