import { PrismaClient } from "../../../../generated/prisma/client";
import { Cart, CartItem } from "../../../../domain/entities/Cart";
import { ICartRepository } from "../../../../domain/repositories/ICartRepository";

export class PrismaCartRepository implements ICartRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findByUserId(userId: string): Promise<Cart | null> {
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

  async create(cart: Cart): Promise<Cart> {
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

  async update(cart: Cart): Promise<Cart> {
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

  private toDomain(cart: {
    id: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    items: {
      productId: string;
      quantity: number;
    }[];
  }): Cart {
    const items: CartItem[] = cart.items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }));

    return new Cart(
      cart.id,
      cart.userId,
      items,
      cart.createdAt,
      cart.updatedAt,
    );
  }
}