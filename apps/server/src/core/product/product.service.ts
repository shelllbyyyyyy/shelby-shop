import { Injectable, NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import { AddProductDTO, AddProductVariantDTO, UpdateProductDTO } from "@shelby/dto";
import { Prisma, Product as ProductModel, ProductVariant as ProductVariantModel } from "@shelby/db";

import { PrismaService } from "@/lib/prisma.service";
import { SupabaseService } from "@/lib/supabase.service";
import { getRandomId, getWordInitials, slugToTitle, titleCase, tittleToSlug, upperCase } from "@/lib/formatter";
import { SupabaseBucket } from "@/types/supabase-bucket.enum";
import { config } from "@/config";

@Injectable()
export class ProductService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly supabaseService: SupabaseService,
  ) {}

  public async getAllProduct() {
    try {
      return await this.prismaService.product.findMany({
        include: {
          categoriesOnProducts: {
            include: {
              category: true,
            },
          },
          productVariant: { include: { inventory: true } },
        },
      });
    } catch (error) {
      throw new UnprocessableEntityException("something went wrong !!!");
    }
  }

  public async getProduct(slug: string) {
    try {
      return await this.prismaService.product.findUnique({
        where: {
          slug,
        },
        include: {
          productVariant: true,
        },
      });
    } catch (error) {
      throw new UnprocessableEntityException("something went wrong !!!");
    }
  }

  public async addProduct(addProductDTO: AddProductDTO, imageFile: Express.Multer.File): Promise<ProductModel> {
    const addProductPayload: Prisma.ProductCreateInput = {
      ...addProductDTO,
    };

    const slugs = tittleToSlug(addProductPayload.name);
    addProductPayload.slug = slugs;

    const fileUrl = await this.supabaseService.uploadToPublicStorage(SupabaseBucket.PRODUCT_IMAGES, imageFile);
    addProductPayload.imageUrl = [fileUrl as string];

    const SKU = getWordInitials(addProductPayload.name) + " " + getWordInitials(addProductDTO.category) + " " + upperCase(addProductDTO.label) + " " + getRandomId("0123456789", 6);
    const sku = tittleToSlug(SKU);

    try {
      const checkProduct = await this.prismaService.product.findFirst({
        where: { slug: addProductPayload.slug },
      });

      if (checkProduct) {
        throw new UnprocessableEntityException("product name is already created, update a product to create a new variant");
      }

      const product = await this.prismaService.product.create({
        data: {
          name: addProductPayload.name,
          price: Number(addProductPayload.price),
          description: addProductPayload.description,
          imageUrl: addProductPayload.imageUrl,
          slug: tittleToSlug(addProductPayload.name),
          productVariant: {
            create: {
              price: Number(addProductPayload.price),
              imageUrl: fileUrl,
              label: addProductDTO.label,
              sku: upperCase(sku),
              inventory: {
                create: {
                  quantity: 1,
                  status: "AVAILABLE",
                },
              },
            },
          },
          categoriesOnProducts: {
            create: {
              category: {
                connectOrCreate: {
                  create: { name: titleCase(addProductDTO.category) },
                  where: { name: titleCase(addProductDTO.category) },
                },
              },
            },
          },
        },
        include: {
          productVariant: { include: { inventory: true } },
          categoriesOnProducts: {
            include: {
              category: true,
            },
          },
        },
      });

      return product;
    } catch (error) {
      throw new UnprocessableEntityException("something went wrong !!!");
    }
  }

  public async deleteProduct(slug: string) {
    try {
      const { imageUrl } = await this.prismaService.product.findFirst({
        where: { slug },
      });

      if (!imageUrl) {
        throw new NotFoundException("product not found");
      } else {
        const path = imageUrl.map(x => {
          return x.replace(`${config.supabaseBucketUrl}${SupabaseBucket.PRODUCT_IMAGES}/`, "");
        });

        await this.supabaseService.deleteFilesFromStorage(SupabaseBucket.PRODUCT_IMAGES, path);
      }

      return await this.prismaService.product.delete({
        where: {
          slug,
        },
      });
    } catch (error) {
      throw new UnprocessableEntityException("something went wrong !!!");
    }
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

    if (editProductPayload.name) {
      editProductPayload.slug = tittleToSlug(editProductPayload.name as string);
    }

    try {
      const product = await this.prismaService.product.findUnique({
        where: {
          slug,
        },
      });

      if (imageUrl) {
        return await this.prismaService.product.update({
          where: {
            slug,
          },
          data: {
            imageUrl: { push: editProductPayload.imageUrl as string },
          },
        });
      }

      if (!product) throw new NotFoundException("product not found");

      const updatedProduct = await this.prismaService.product.update({
        where: {
          slug,
        },
        data: {
          name: editProductPayload.name,
          price: editProductPayload.price,
          description: editProductPayload.description,
        },
      });

      return updatedProduct;
    } catch (error) {
      console.log(error);

      throw new UnprocessableEntityException("something went wrong !!!");
    }
  }

  public async getAllProductVariant() {
    try {
      return await this.prismaService.productVariant.findMany({
        include: {
          inventory: true,
        },
      });
    } catch (error) {
      throw new UnprocessableEntityException("something went wrong !!!");
    }
  }

  public async addProductVariant(slug: string, addProductVariantDTO: AddProductVariantDTO, imageFile: Express.Multer.File): Promise<ProductVariantModel> {
    const addProductPayload: Prisma.ProductVariantCreateInput = {
      ...addProductVariantDTO,
    };

    try {
      const [product, category] = await Promise.all([
        this.prismaService.product.findUnique({
          where: {
            slug: slug,
          },
        }),

        this.prismaService.category.findFirst({
          where: { categoriesOnProducts: { some: { product: { slug } } } },
          select: { name: true },
        }),
      ]);

      if (!category) throw new NotFoundException("category not found");
      if (!product) throw new NotFoundException("product not found");

      const fileUrl = await this.supabaseService.uploadToPublicStorage(SupabaseBucket.PRODUCT_IMAGES, imageFile);
      addProductPayload.imageUrl = fileUrl;

      const convertPrice = Number(addProductPayload.price);
      addProductPayload.price = convertPrice;

      const SKU =
        getWordInitials(slugToTitle(slug as string)) + " " + getWordInitials(category.name) + " " + upperCase(addProductPayload.label) + " " + getRandomId("0123456789", 6);
      const sku = tittleToSlug(SKU);

      addProductPayload.sku = sku;

      const addProductVariant = await this.prismaService.productVariant.create({
        data: {
          imageUrl: addProductPayload.imageUrl,
          price: addProductPayload.price,
          label: addProductPayload.label,
          sku: upperCase(addProductPayload.sku),
          inventory: {
            create: {
              status: "AVAILABLE",
              quantity: 1,
            },
          },
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
    } catch (error) {
      throw new UnprocessableEntityException("something went wrong !!!");
    }
  }

  public async deleteProductVariant(id: string) {
    try {
      const { imageUrl, product } = await this.prismaService.productVariant.findFirst({
        where: { id },
        include: { product: { select: { slug: true, imageUrl: true } } },
      });

      if (!imageUrl || !product.slug) {
        throw new NotFoundException("product not found");
      } else {
        const file = imageUrl.replace(`${config.supabaseBucketUrl}${SupabaseBucket.PRODUCT_IMAGES}/`, "");
        await this.supabaseService.deleteFilesFromStorage(SupabaseBucket.PRODUCT_IMAGES, [file]);

        const slug = product.slug;
        const files = product.imageUrl;

        const update = files.filter(i => i != imageUrl);

        await this.prismaService.product.update({
          where: { slug },
          data: {
            imageUrl: update,
          },
        });
      }

      const result = await this.prismaService.productVariant.delete({
        where: {
          id,
        },
      });

      return result;
    } catch (error) {
      throw new UnprocessableEntityException("something went wrong !!!");
    }
  }
}
