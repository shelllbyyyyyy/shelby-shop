import { Injectable, NotFoundException, UnprocessableEntityException } from "@nestjs/common";

import { AuthUser } from "@/core/auth/types";
import { PrismaService } from "@/lib/prisma.service";
import { AddToCartDTO } from "@shelby/dto";

@Injectable()
export class CartService {
  constructor(private readonly prismaService: PrismaService) {}

  public async addToCart(id: string, quantity: number, userId: string) {
    return await this.prismaService.$transaction(async tx => {
      const productStock = await tx.inventory.count({
        where: {
          status: "AVAILABLE",
          productVariantId: id,
          quantity: {
            gte: quantity,
          },
        },
      });

      if (!productStock) {
        throw new UnprocessableEntityException("insufficient stock");
      }

      const cartByProductId = await tx.cart.findFirst({
        where: {
          productVariantId: id,
          deletedAt: null,
          checkoutAt: null,
          userId: userId,
        },
      });

      if (cartByProductId) {
        await tx.cart.update({
          data: {
            quantity: {
              increment: quantity,
            },
          },
          where: {
            id: cartByProductId.id,
          },
        });
      } else {
        await tx.cart.create({
          data: {
            productVariantId: id,
            quantity: quantity,
            userId: userId,
          },
        });
      }
    });
  }

  public async getCart(userId: string) {
    return await this.prismaService.cart.findMany({
      where: { userId, deletedAt: null, checkoutAt: null },
      include: {
        productVariant: {
          include: {
            product: true,
            inventory: {
              where: { status: "AVAILABLE" },
              select: { quantity: true },
            },
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  }

  public async updateCart(productVariantId: string, quantity: number, cartId: string) {
    return await this.prismaService.$transaction(async tx => {
      const productStock = await tx.inventory.count({
        where: {
          status: "AVAILABLE",
          productVariantId,
          quantity: {
            gte: quantity,
          },
        },
      });

      if (!productStock) {
        throw new UnprocessableEntityException("insufficient stock");
      }

      const cart = await tx.cart.update({
        data: {
          quantity,
        },
        where: {
          id: cartId,
        },
      });

      return cart;
    });
  }

  public async deleteItem(userId: string, id: string) {
    try {
      return await this.prismaService.$transaction(async tx => {
        const cartByProductId = await tx.cart.findFirst({
          where: {
            userId,
            productVariantId: id,
            checkoutAt: null,
            deletedAt: null,
          },
        });

        if (cartByProductId) {
          await tx.cart.update({
            where: {
              id: cartByProductId.id,
              productVariantId: id,
            },
            data: {
              deletedAt: new Date(),
            },
          });
        }
      });
    } catch (error) {
      throw new UnprocessableEntityException("Something went wrong !!!");
    }
  }
}
