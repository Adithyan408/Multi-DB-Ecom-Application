"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaCartRepository = void 0;
const Cart_1 = require("../../../../domain/entities/Cart");
class PrismaCartRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByUserId(userId) {
        const cart = await this.prisma.cart.findUnique({
            where: { userId },
            include: {
                items: true,
            },
        });
        if (!cart) {
            return null;
        }
        return this.toDomain(cart);
    }
    async create(cart) {
        const createdCart = await this.prisma.cart.create({
            data: {
                id: cart.id,
                userId: cart.userId,
                items: {
                    create: cart.items.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                    })),
                },
            },
            include: {
                items: true,
            },
        });
        return this.toDomain(createdCart);
    }
    async update(cart) {
        const updatedCart = await this.prisma.$transaction(async (tx) => {
            await tx.cartItem.deleteMany({
                where: {
                    cartId: cart.id,
                },
            });
            return tx.cart.update({
                where: {
                    id: cart.id,
                },
                data: {
                    items: {
                        create: cart.items.map((item) => ({
                            productId: item.productId,
                            quantity: item.quantity,
                        })),
                    },
                },
                include: {
                    items: true,
                },
            });
        });
        return this.toDomain(updatedCart);
    }
    toDomain(cart) {
        const items = cart.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
        }));
        return new Cart_1.Cart(cart.id, cart.userId, items, cart.createdAt, cart.updatedAt);
    }
}
exports.PrismaCartRepository = PrismaCartRepository;
//# sourceMappingURL=PrismaCartRepository.js.map