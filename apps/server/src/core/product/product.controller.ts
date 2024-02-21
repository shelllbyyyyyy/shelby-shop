import { Body, Controller, Delete, Get, HttpStatus, MaxFileSizeValidator, Param, ParseFilePipe, Patch, Post, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { AddProductDTO, UpdateProductDTO } from "@shelby/dto";

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
  @UseInterceptors(FileInterceptor("product-image"))
  public async addProduct(
    @Body() addProductDTO: AddProductDTO,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 })],
        fileIsRequired: false,
      }),
    )
    imageUrl?: Express.Multer.File,
  ) {
    const product = await this.productService.addProduct(addProductDTO, imageUrl);

    return product;
  }

  @Patch("/:slug")
  @UseGuards(SupabaseGuard)
  public async updateProduct(
    @Param("id") id: string,
    @Body() updateProductDTO: UpdateProductDTO,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 })],
        fileIsRequired: false,
      }),
    )
    imageUrl?: Express.Multer.File,
  ) {
    const updateProduct = await this.productService.updateProduct(id, updateProductDTO, imageUrl);
    return updateProduct;
  }

  @Delete("/:slug")
  @UseGuards(SupabaseGuard)
  public async deleteProduct(@Param("id") id: string) {
    await this.productService.deleteProduct(id);
  }
}
