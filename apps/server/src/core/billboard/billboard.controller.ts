import { Body, Controller, Delete, Get, MaxFileSizeValidator, Param, ParseFilePipe, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";

import { BillboardDTO, EditBillboardDTO } from "@shelby/dto";

import { BillboardService } from "./billboard.service";
import { SupabaseGuard } from "@/core/auth/supabase/supabase.guard";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("billboard")
export class BillboardContoller {
  constructor(private readonly billboardService: BillboardService) {}

  @Get()
  @UseGuards(SupabaseGuard)
  public async getAllBillboard() {
    return await this.billboardService.getAllBillboard();
  }

  @Get("/:id")
  @UseGuards(SupabaseGuard)
  public async getBillboard(@Param("id") id: string) {
    const getBillboard = await this.billboardService.getBillboard(id);

    return getBillboard;
  }

  @Post()
  @UseGuards(SupabaseGuard)
  @UseInterceptors(FileInterceptor("imageFile"))
  public async createCategory(
    @Body() billboardDTO: BillboardDTO,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 })],
        fileIsRequired: false,
      }),
    )
    imageFile: Express.Multer.File,
  ) {
    const result = await this.billboardService.createBillboard(billboardDTO, imageFile);

    return result;
  }

  @Patch("/:id")
  @UseGuards(SupabaseGuard)
  @UseInterceptors(FileInterceptor("imageFile"))
  public async editCategory(
    @Param("id") id: string,
    @Body() editBillboardDTO: EditBillboardDTO,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 })],
        fileIsRequired: false,
      }),
    )
    imageFile?: Express.Multer.File,
  ) {
    const result = await this.billboardService.editBillboard(id, editBillboardDTO, imageFile);

    return result;
  }

  @Delete("/:id")
  @UseGuards(SupabaseGuard)
  public async deleteBillboard(@Param("id") id: string) {
    return await this.billboardService.deleteBillboard(id);
  }
}
