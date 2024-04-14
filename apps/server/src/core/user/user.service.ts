import { PrismaService } from "@/lib/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getAllUser() {
    const getAllUser = await this.prismaService.profiles.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
        address: true,
      },
    });

    return getAllUser;
  }

  public async deleteUser(id: string) {
    return await this.prismaService.profiles.delete({
      where: { id },
    });
  }
}
