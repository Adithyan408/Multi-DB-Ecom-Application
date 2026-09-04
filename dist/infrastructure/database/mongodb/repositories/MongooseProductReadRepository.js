"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseProductReadRepository = void 0;
const ProductReadModel_1 = require("../models/ProductReadModel");
class MongooseProductReadRepository {
    async findAll() {
        const products = await ProductReadModel_1.ProductReadModel.find().lean();
        return products.map((product) => ({
            id: product._id,
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        }));
    }
    async findById(id) {
        const product = await ProductReadModel_1.ProductReadModel.findById(id).lean();
        if (!product) {
            return null;
        }
        return {
            id: product._id,
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        };
    }
}
exports.MongooseProductReadRepository = MongooseProductReadRepository;
//# sourceMappingURL=MongooseProductReadRepository.js.map