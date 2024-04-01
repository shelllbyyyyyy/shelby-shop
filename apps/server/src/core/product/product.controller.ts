import { Body, Controller, Delete, Get, HttpStatus, MaxFileSizeValidator, Param, ParseFilePipe, Patch, Post, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { AddProductDTO, UpdateProductDTO } from "./dto";

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
    console.log(imageFile);
    const product = await this.productService.addProduct(addProductDTO, imageFile);

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

  @Delete("/:slug")
  @UseGuards(SupabaseGuard)
  public async deleteProduct(@Param("slug") slug: string) {
    await this.productService.deleteProduct(slug);
  }
}
