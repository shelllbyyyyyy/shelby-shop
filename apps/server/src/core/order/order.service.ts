import { Injectable, UnprocessableEntityException } from "@nestjs/common";

import { PrismaService } from "@/lib/prisma.service";
import { SnapService } from "@/lib/midtrans/snap.service";
import { CheckoutDTO, SuccessDTO } from "@shelby/dto";

@Injectable()
export class OrderService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly snapService: SnapService,
  ) {}

  public async getSnapToken(userId: string, checkoutDTO: CheckoutDTO) {
    return await this.prismaService.$transaction(async tx => {
      const { items, qty } = checkoutDTO;
      const address = await tx.address.findFirst({
        where: { userId: userId },
      });

      const customerDetails = {
        id: address.id,
        first_name: address.first_name,
        last_name: address.last_name,
        email: address.email,
        phone_number: address.phone_number,
        address: address.address,
        postal_code: address.postal_code,
        city: address.city,
        country_code: address.country_code,
      };

      const order = await tx.order.create({
        data: {
          totalPrice: 0,
          quantity: 0,
          status: "CREATED",
          user: { connect: { id: userId } },
        },
      });

      if (qty !== undefined) {
        const variant = await tx.productVariant.findUnique({
          where: { id: items[0] },
          include: { product: { include: { categoriesOnProducts: { select: { category: { select: { name: true } } } } } } },
        });

        const category = await tx.category.findFirst({
          where: { categoriesOnProducts: { some: { productId: variant.productId } } },
        });

        await tx.order.update({
          where: { id: order.id },
          data: {
            totalPrice: variant.price * qty,
            quantity: qty,
            status: "PROCESSING",
          },
        });

        const itemDetails = {
          id: variant.id,
          name: variant.product.name,
          variant: variant.label,
          category: category.name,
          price: variant.price,
          quantity: qty,
          sku: variant.sku,
        };

        const SnapTransaction = {
          transaction_details: { order_id: "BY-SHOP" + "-" + order.id, gross_amount: variant.price * qty },
          item_details: [itemDetails],
          customer_details: customerDetails,
        };

        const trx = this.snapService.transaction(SnapTransaction);

        return trx;
      } else {
        const carts = await tx.cart.findMany({
          where: { userId, productVariantId: { in: items }, checkoutAt: null, deletedAt: null },
          include: { productVariant: { include: { product: { include: { categoriesOnProducts: { include: { category: { select: { name: true } } } } } } } } },
        });

        const totalAmount = carts.reduce((total, item) => total + item.productVariant.price * item.quantity, 0);
        const totalQuantity = carts.reduce((total, item) => total + item.quantity, 0);

        await tx.order.update({
          where: { id: order.id },
          data: {
            totalPrice: totalAmount,
            quantity: totalQuantity,
            status: "PROCESSING",
            cart: {
              connect: carts.map(item => ({ id: item.id })),
            },
          },
          include: {
            cart: true,
          },
        });

        await tx.cart.updateMany({
          where: { userId: userId, productVariantId: { in: items } },
          data: { checkoutAt: new Date() },
        });

        const itemDetails = carts.map(item => {
          const { productVariant, quantity } = item;
          const { id, price, sku, label, product } = productVariant;
          const { name, categoriesOnProducts } = product;
          for (const i of categoriesOnProducts) {
            return {
              id,
              name,
              variant: label,
              category: i.category.name,
              price,
              quantity,
              sku,
            };
          }
        });

        const totalPrice = itemDetails.reduce((total, item) => total + item.price * item.quantity, 0);

        const SnapTransaction = {
          transaction_details: { order_id: "BY-SHOP" + "-" + order.id, gross_amount: totalPrice },
          item_details: itemDetails,
          customer_details: customerDetails,
        };

        const trx = this.snapService.transaction(SnapTransaction);

        return trx;
      }
    });
  }

  public async paymentSuccess(userId: string, payload: SuccessDTO) {
    return await this.prismaService.$transaction(async tx => {
      const { id } = payload;
      try {
        const order = await tx.order.findFirst({
          where: { userId, status: "PROCESSING" },
        });

        const carts = await tx.cart.findMany({
          where: { orderId: order.id },
          include: { productVariant: true },
        });

        if (id) {
          const inventory = await tx.inventory.findFirst({
            where: { productVariantId: id, status: "AVAILABLE" },
          });
          await tx.inventory.update({
            where: { id: inventory.id },
            data: {
              quantity: { decrement: order.quantity },
            },
          });

          const productStock = await tx.inventory.count({
            where: {
              status: "AVAILABLE",
              productVariantId: id,
              quantity: {
                lt: 1,
              },
            },
          });

          if (productStock) {
            await tx.inventory.update({
              where: { id: inventory.id },
              data: {
                quantity: 0,
                status: "RESERVED",
              },
            });
          }
        } else {
          return await Promise.all(
            carts.map(async cart => {
              await tx.inventory.updateMany({
                where: { productVariantId: cart.productVariantId },
                data: {
                  quantity: { decrement: cart.quantity },
                },
              });

              const productStock = await tx.inventory.count({
                where: {
                  status: "AVAILABLE",
                  productVariantId: cart.productVariantId,
                  quantity: { lt: 1 },
                },
              });

              if (productStock) {
                await tx.inventory.updateMany({
                  where: { productVariantId: cart.productVariantId },
                  data: {
                    status: "RESERVED",
                  },
                });
              }

              await tx.cart.updateMany({
                where: { userId: userId, orderId: order.id },
                data: { deletedAt: new Date() },
              });
            }),
          );
        }

        await tx.order.update({
          where: { id: order.id },
          data: {
            status: "COMPLETED",
          },
        });
      } catch (error) {
        throw new UnprocessableEntityException("something went wrong !!!");
      }
    });
  }
}
