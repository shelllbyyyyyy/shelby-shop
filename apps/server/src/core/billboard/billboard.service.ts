import { Injectable, NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import { BillboardDTO, EditBillboardDTO } from "@shelby/dto";
import { Billboard, Prisma } from "@shelby/db";

import { PrismaService } from "@/lib/prisma.service";
import { SupabaseBucket } from "@/types/supabase-bucket.enum";
import { SupabaseService } from "@/lib/supabase.service";
import { config } from "@/config";

@Injectable()
export class BillboardService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly supabaseService: SupabaseService,
  ) {}

  public async getAllBillboard() {
    return await this.prismaService.billboard.findMany({});
  }

  public async getBillboard(id: string) {
    return await this.prismaService.billboard.findUnique({ where: { id } });
  }

  public async createBillboard(billboardDTO: BillboardDTO, imageFile: Express.Multer.File): Promise<Billboard> {
    const body: Prisma.BillboardCreateInput = { ...billboardDTO };

    const fileUrl = await this.supabaseService.uploadToPublicStorage(SupabaseBucket.BILLBOARD_IMAGES, imageFile);
    body.imageUrl = fileUrl;

    return await this.prismaService.billboard.create({
      data: body,
    });
  }

  public async editBillboard(id: string, editBillboardDTO: EditBillboardDTO, imageFile?: Express.Multer.File): Promise<Billboard> {
    const body: Prisma.BillboardUpdateInput = { ...editBillboardDTO };

    if (imageFile) {
      const fileUrl = await this.supabaseService.uploadToPublicStorage(SupabaseBucket.BILLBOARD_IMAGES, imageFile);
      body.imageUrl = fileUrl;
    }

    return await this.prismaService.billboard.update({
      where: { id },
      data: body,
    });
  }

  public async deleteBillboard(id: string) {
    try {
      const { imageUrl } = await this.prismaService.billboard.findFirst({
        where: { id },
      });

      if (!imageUrl) {
        throw new NotFoundException("billboard not found");
      } else {
        const path = [imageUrl.replace(`${config.supabaseBucketUrl}${SupabaseBucket.BILLBOARD_IMAGES}/`, "")];

        await this.supabaseService.deleteFilesFromStorage(SupabaseBucket.BILLBOARD_IMAGES, path);
      }

      return await this.prismaService.billboard.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new UnprocessableEntityException("something went wrong !!!");
    }
  }
}
