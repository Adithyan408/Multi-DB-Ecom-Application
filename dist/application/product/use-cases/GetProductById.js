"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProductById = void 0;
class GetProductById {
    productReadRepository;
    constructor(productReadRepository) {
        this.productReadRepository = productReadRepository;
    }
    async execute(id) {
        return this.productReadRepository.findById(id);
    }
}
exports.GetProductById = GetProductById;
//# sourceMappingURL=GetProductById.js.map