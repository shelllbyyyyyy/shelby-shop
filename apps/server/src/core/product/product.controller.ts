import { Body, Controller, Delete, Get, MaxFileSizeValidator, Param, ParseFilePipe, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";

import { AddProductDTO, AddProductVariantDTO, UpdateProductDTO } from "@shelby/dto";

import { ProductService } from "./product.service";
import { SupabaseGuard } from "@/core/auth/supabase/supabase.guard";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("products")
export class ProductContoller {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @UseGuards(SupabaseGuard)
  public async getAllProduct() {
    return await this.productService.getAllProduct();
  }

  @Get("/:slug")
  @UseGuards(SupabaseGuard)
  public async getProduct(@Param("slug") slug: string) {
    const getProduct = await this.productService.getProduct(slug);

    return getProduct;
  }

  @Post()
  @UseGuards(SupabaseGuard)
  @UseInterceptors(FileInterceptor("imageFile"))
  public async addProduct(
    @Body() addProductDTO: AddProductDTO,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 })],
        fileIsRequired: false,
      }),
    )
    imageFile: Express.Multer.File,
  ) {
    const product = await this.productService.addProduct(addProductDTO, imageFile);

    return product;
  }

  @Post("/:slug")
  @UseGuards(SupabaseGuard)
  @UseInterceptors(FileInterceptor("imageFile"))
  public async addVariantProduct(
    @Param("slug") slug: string,
    @Body() addProductVariantDTO: AddProductVariantDTO,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 })],
        fileIsRequired: false,
      }),
    )
    imageFile: Express.Multer.File,
  ) {
    const product = await this.productService.addProductVariant(slug, addProductVariantDTO, imageFile);

    return product;
  }

  @Patch("/:slug")
  @UseGuards(SupabaseGuard)
  @UseInterceptors(FileInterceptor("imageFile"))
  public async updateProduct(
    @Param("slug") slug: string,
    @Body() updateProductDTO: UpdateProductDTO,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 })],
        fileIsRequired: false,
      }),
    )
    imageFile: Express.Multer.File,
  ) {
    const updateProduct = await this.productService.updateProduct(slug, updateProductDTO, imageFile);

    return updateProduct;
  }

  @Get("/variants")
  @UseGuards(SupabaseGuard)
  public async getAllProductVariant() {
    return await this.productService.getAllProductVariant();
  }

  @Delete("/:slug")
  @UseGuards(SupabaseGuard)
  public async deleteProduct(@Param("slug") slug: string) {
    await this.productService.deleteProduct(slug);
  }

  @Delete("/variant/:id")
  @UseGuards(SupabaseGuard)
  public async deleteProductVariant(@Param("id") id: string) {
    await this.productService.deleteProductVariant(id);
  }
}
