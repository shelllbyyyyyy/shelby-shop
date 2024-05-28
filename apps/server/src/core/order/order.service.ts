import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { Prisma } from "@shelby/db";

import { PrismaService } from "@/lib/prisma.service";
import { SnapService } from "@/lib/midtrans/snap.service";
import { REALTIME_CHANNEL_STATES } from "@supabase/supabase-js";

@Injectable()
export class OrderService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly snapService: SnapService,
  ) {}

  public async getSnapToken(userId: string, items: string[]) {
    return await this.prismaService.$transaction(async tx => {
      const carts = await tx.cart.findMany({
        where: { userId, productVariantId: { in: items }, checkoutAt: null, deletedAt: null },
        include: { productVariant: { include: { product: true } } },
      });

      if (!carts) throw new UnprocessableEntityException("something wrong !!!");

      const totalAmount = carts.reduce((total, item) => {
        return total + item.productVariant.price * item.quantity;
      }, 0);

      const totalQuantity = carts.reduce((total, item) => {
        return total + item.quantity;
      }, 0);

      const productVariantIds = carts.map(item => item.productVariant.productId);

      const category = await tx.category.findFirst({
        where: { categoriesOnProducts: { some: { productId: { in: productVariantIds } } } },
      });

      const address = await tx.address.findFirst({
        where: { userId: userId },
      });

      const order = await tx.order.create({
        data: {
          totalPrice: 0,
          quantity: 0,
          status: "CREATED",
          user: { connect: { id: userId } },
        },
      });

      for (const item of carts) {
        await tx.order.update({
          where: { id: order.id },
          data: {
            totalPrice: totalAmount,
            quantity: totalQuantity,
            status: "PROCESSING",
            cart: {
              connect: { id: item.id },
            },
          },
        });
      }

      await tx.cart.deleteMany({
        where: { userId: userId, productVariantId: { in: productVariantIds } },
      });

      if (!totalAmount || !carts || !address) {
        throw new UnprocessableEntityException("Something missing !!!");
      }

      const itemDetails = carts.map(item => {
        const { productVariant, quantity } = item;
        const { id, price, sku, label, product } = productVariant;

        return {
          id: id,
          name: product.name,
          category: category.name,
          price: price,
          quantity: quantity,
          sku: sku,
          variant: label,
        };
      });

      const totalPrice = itemDetails.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);

      const SnapTransaction = {
        transaction_details: { order_id: "BY-SHOP" + "-" + order.id, gross_amount: totalPrice },
        item_details: itemDetails,
        customer_details: {
          id: address.id,
          first_name: address.first_name,
          last_name: address.last_name,
          email: address.email,
          phone_number: address.phone_number,
          address: address.address,
          postal_code: address.postal_code,
          city: address.city,
          country_code: address.country_code,
        },
      };

      const trx = this.snapService.transaction(SnapTransaction);

      if (!trx) {
        await tx.order.update({
          where: { id: order.id },
          data: { status: "CANCELLED" },
        });
      }

      return trx;
    });
  }

  public async paymentSuccess(userId: string) {
    return await this.prismaService.$transaction(async tx => {
      const order = await tx.order.findFirst({
        where: { userId, status: "PROCESSING" },
      });

      if (order) {
        const carts = await tx.cart.findMany({
          where: { userId },
          include: { productVariant: { include: { product: true } } },
        });

        if (!carts) throw new UnprocessableEntityException("something wrong !!!");

        for (const i of carts) {
          await tx.inventory.updateMany({
            where: { productVariantId: i.productVariantId },
            data: {
              quantity: { decrement: i.quantity },
            },
          });

          const productStock = await tx.inventory.count({
            where: {
              productVariantId: i.productVariantId,
              quantity: {
                lte: 1,
              },
            },
          });

          if (productStock) {
            await tx.inventory.updateMany({
              where: { productVariantId: i.productVariantId },
              data: {
                status: "RESERVED",
              },
            });
          }

          await tx.cart.deleteMany({
            where: { userId: userId, orderId: order.id },
          });

          await tx.order.update({
            where: { id: order.id },
            data: {
              status: "COMPLETED",
            },
          });
        }
      }
    });
  }
}
