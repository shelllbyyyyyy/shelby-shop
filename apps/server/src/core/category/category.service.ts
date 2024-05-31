import { Injectable } from "@nestjs/common";
import { CategoryDTO, EditCategoryDTO } from "@shelby/dto";
import { Prisma } from "@shelby/db";

import { PrismaService } from "@/lib/prisma.service";

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getAllCategory() {
    return await this.prismaService.category.findMany({
      include: {
        categoriesOnProducts: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  public async getCategory(id: string) {
    return await this.prismaService.category.findUnique({ where: { id }, select: { categoriesOnProducts: { include: { product: true } } } });
  }

  public async createCategory(categoryDTO: CategoryDTO) {
    const body: Prisma.CategoryCreateInput = categoryDTO;

    return await this.prismaService.category.create({
      data: body,
    });
  }

  public async editCategory(id: string, editcategoryDTO: EditCategoryDTO) {
    const body: Prisma.CategoryUpdateInput = { ...editcategoryDTO };

    return await this.prismaService.category.update({
      where: { id },
      data: body,
    });
  }

  public async deleteCategory(id: string) {
    return await this.prismaService.category.delete({
      where: { id },
    });
  }
}
