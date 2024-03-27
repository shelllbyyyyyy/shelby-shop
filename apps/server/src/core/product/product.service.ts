import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { AddProductDTO, UpdateProductDTO } from "@shelby/dto";
import { Prisma, Product as ProductModel } from "@shelby/db";

import { PrismaService } from "@/lib/prisma.service";
import { SupabaseService } from "@/lib/supabase.service";
import { SupabaseBucket } from "@/types/supabase-bucket.enum";

@Injectable()
export class ProductService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly supabaseService: SupabaseService,
  ) {}

  public async getAllProduct() {
    return await this.prismaService.product.findMany();
  }

  public async getProduct(slug: string) {
    return await this.prismaService.product.findUnique({
      where: {
        slug,
      },
    });
  }

  public async addProduct(addProductDTO: AddProductDTO, imageFile: Express.Multer.File): Promise<ProductModel> {
    const addProductPayload: Prisma.ProductCreateInput = {
      ...addProductDTO,
    };

    const fileUrl = await this.supabaseService.uploadToPublicStorage(SupabaseBucket.PRODUCT_IMAGES, imageFile);

    addProductPayload.imageUrl = fileUrl;

    const titleToSlug = (title: string) => {
      let Slug: string;
      Slug = title.toLowerCase();
      Slug = Slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, "");
      Slug = Slug.replace(/ /gi, "-");
      Slug = Slug.replace(/\-\-\-\-\-/gi, "-");
      Slug = Slug.replace(/\-\-\-\-/gi, "-");
      Slug = Slug.replace(/\-\-\-/gi, "-");
      Slug = Slug.replace(/\-\-/gi, "-");
      Slug = "@" + Slug + "@";
      Slug = Slug.replace(/\@\-|\-\@|\@/gi, "");
      return Slug;
    };

    addProductPayload.slug = titleToSlug(addProductPayload.name);

    const product = await this.prismaService.product.create({
      data: addProductPayload,
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

      editProductPayload.imageUrl = fileUrl;
    }

    const product = await this.prismaService.product.findUnique({
      where: {
        slug,
      },
    });

    if (!product) throw new NotFoundException("product not found");

    if (editProductPayload.name) {
      const titleToSlug = (title: string) => {
        let Slug: string;
        Slug = title.toLowerCase();
        Slug = Slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, "");
        Slug = Slug.replace(/ /gi, "-");
        Slug = Slug.replace(/\-\-\-\-\-/gi, "-");
        Slug = Slug.replace(/\-\-\-\-/gi, "-");
        Slug = Slug.replace(/\-\-\-/gi, "-");
        Slug = Slug.replace(/\-\-/gi, "-");
        Slug = "@" + Slug + "@";
        Slug = Slug.replace(/\@\-|\-\@|\@/gi, "");
        return Slug;
      };

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
}
