"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProduct = void 0;
const crypto_1 = __importDefault(require("crypto"));
class CreateProduct {
    productRepository;
    eventBus;
    constructor(productRepository, eventBus) {
        this.productRepository = productRepository;
        this.eventBus = eventBus;
    }
    async execute(input) {
        const now = new Date();
        const product = {
            id: crypto_1.default.randomUUID(),
            name: input.name,
            description: input.description,
            price: input.price,
            stock: input.stock,
            createdAt: now,
            updatedAt: now,
        };
        const createdProduct = await this.productRepository.create(product);
        await this.eventBus.publish({
            type: "ProductCreated",
            product: createdProduct,
        });
        return createdProduct;
    }
}
exports.CreateProduct = CreateProduct;
//# sourceMappingURL=CreateProduct.js.map