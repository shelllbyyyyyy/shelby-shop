import { Injectable, NotFoundException } from "@nestjs/common";
import { AddProductDTO, AddProductVariantDTO, UpdateProductDTO } from "./dto";
import { Prisma, Product as ProductModel, ProductVariant as ProductVariantModel } from "@prisma/client";

import { PrismaService } from "@/lib/prisma.service";
import { SupabaseService } from "@/lib/supabase.service";
import { SupabaseBucket } from "@/types/supabase-bucket.enum";
import { titleToSlug } from "@/lib/slugify";

@Injectable()
export class ProductService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly supabaseService: SupabaseService,
  ) {}

  public async getAllProduct() {
    return await this.prismaService.product.findMany({
      include: {
        categoriesOnProducts: {
          include: {
            category: true,
          },
        },
        productVariant: true,
      },
    });
  }

  public async getProduct(slug: string) {
    return await this.prismaService.product.findUnique({
      where: {
        slug,
      },
      include: {
        productVariant: true,
      },
    });
  }

  public async addProduct(addProductDTO: AddProductDTO, imageFile?: Express.Multer.File): Promise<ProductModel> {
    const addProductPayload: Prisma.ProductCreateInput = {
      ...addProductDTO,
    };

    const fileUrl = await this.supabaseService.uploadToPublicStorage(SupabaseBucket.PRODUCT_IMAGES, imageFile);
    addProductPayload.imageUrl = [fileUrl as string];

    const product = await this.prismaService.product.create({
      data: {
        name: addProductPayload.name,
        price: Number(addProductPayload.price),
        description: addProductPayload.description,
        imageUrl: addProductPayload.imageUrl,
        slug: titleToSlug(addProductPayload.name),
        productVariant: {
          create: {
            name: addProductPayload.name,
            price: Number(addProductPayload.price),
            imageUrl: fileUrl,
            label: addProductDTO.label,
            sku: addProductDTO.sku,
          },
        },
        categoriesOnProducts: {
          create: {
            category: {
              connectOrCreate: {
                create: { name: addProductDTO.category },
                where: { name: addProductDTO.category },
              },
            },
          },
        },
      },
      include: {
        productVariant: true,
        categoriesOnProducts: {
          include: {
            category: true,
          },
        },
      },
    });

    return product;
  }

  public async deleteProduct(slug: string) {
    await this.prismaService.product.delete({
      where: {
        slug,
      },
    });
  }

  public async updateProduct(slug: string, updateProductDTO: UpdateProductDTO, imageUrl?: Express.Multer.File) {
    const editProductPayload: Prisma.ProductUpdateInput = {
      ...updateProductDTO,
    };

    if (imageUrl) {
      const fileUrl = await this.supabaseService.uploadToPublicStorage(SupabaseBucket.PRODUCT_IMAGES, imageUrl);
      editProductPayload.imageUrl = [fileUrl as string];
    }

    const convertPrice = Number(editProductPayload.price);
    editProductPayload.price = convertPrice;

    const product = await this.prismaService.product.findUnique({
      where: {
        slug,
      },
    });

    if (!product) throw new NotFoundException("product not found");

    if (editProductPayload.name) {
      editProductPayload.slug = titleToSlug(editProductPayload.name as string);
    }

    const updatedProduct = await this.prismaService.product.update({
      where: {
        slug,
      },
      data: editProductPayload,
    });

    return updatedProduct;
  }

  public async addProductVariant(slug: string, addProductVariantDTO: AddProductVariantDTO, imageFile: Express.Multer.File): Promise<ProductVariantModel> {
    const addProductPayload: Prisma.ProductVariantCreateInput = {
      ...addProductVariantDTO,
    };

    const fileUrl = await this.supabaseService.uploadToPublicStorage(SupabaseBucket.PRODUCT_IMAGES, imageFile);
    addProductPayload.imageUrl = fileUrl;

    const convertPrice = Number(addProductPayload.price);
    addProductPayload.price = convertPrice;

    const product = await this.prismaService.product.findUnique({
      where: {
        slug: slug,
      },
    });

    if (!product) throw new NotFoundException("product not found");

    const addProductVariant = await this.prismaService.productVariant.create({
      data: {
        name: addProductPayload.name,
        imageUrl: addProductPayload.imageUrl,
        price: addProductPayload.price,
        label: addProductPayload.label,
        sku: addProductPayload.sku,
        product: {
          connect: {
            slug: slug,
          },
        },
      },
    });

    if (addProductVariant) {
      await this.prismaService.product.update({
        data: {
          imageUrl: { push: addProductPayload.imageUrl },
        },
        where: {
          slug: slug,
        },
      });
    }

    return addProductVariant;
  }
}
