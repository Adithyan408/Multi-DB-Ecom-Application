"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseProductReadModelRepository = void 0;
const ProductReadModel_1 = require("../models/ProductReadModel");
class MongooseProductReadModelRepository {
    async upsert(product) {
        await ProductReadModel_1.ProductReadModel.findByIdAndUpdate(product.id, {
            _id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        }, {
            upsert: true,
            new: true,
        });
    }
}
exports.MongooseProductReadModelRepository = MongooseProductReadModelRepository;
//# sourceMappingURL=MongooseProductReadModelRepository.js.map