"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaProductRepository = void 0;
class PrismaProductRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(product) {
        const createdProduct = await this.prisma.product.create({
            data: {
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt,
            },
        });
        return {
            ...createdProduct,
            price: Number(createdProduct.price),
        };
    }
    async findById(id) {
        const product = await this.prisma.product.findUnique({
            where: { id },
        });
        if (!product) {
            return null;
        }
        return {
            ...product,
            price: Number(product.price),
        };
    }
}
exports.PrismaProductRepository = PrismaProductRepository;
//# sourceMappingURL=PrismaProductRepository.js.map