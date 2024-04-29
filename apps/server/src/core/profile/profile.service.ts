import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { EditProfileDTO } from "./dto";

import { PrismaService } from "@/lib/prisma.service";
import { SupabaseService } from "@/lib/supabase.service";
import { SupabaseBucket } from "@/types/supabase-bucket.enum";

@Injectable()
export class ProfileService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly supabaseService: SupabaseService,
  ) {}

  public async getProfile(id: string) {
    const profile = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    return profile;
  }

  public async editProfile(id: string, editProfileDTO: EditProfileDTO, profilePictureFile?: Express.Multer.File) {
    const editProfilePayload: Prisma.UserUpdateInput = {
      ...editProfileDTO,
    };

    if (profilePictureFile) {
      const fileUrl = await this.supabaseService.uploadToPublicStorage(SupabaseBucket.PROFILE_PICTURES, profilePictureFile, id);

      editProfilePayload.profilePictureUrl = fileUrl;
    }

    const updatedProfile = await this.prismaService.user.update({
      where: {
        id,
      },
      data: editProfilePayload,
    });

    return updatedProfile;
  }
}
