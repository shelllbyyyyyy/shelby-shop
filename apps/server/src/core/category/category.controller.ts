import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";

import { CategoryDTO, EditCategoryDTO } from "@shelby/dto";

import { CategoryService } from "./category.service";
import { SupabaseGuard } from "@/core/auth/supabase/supabase.guard";

@Controller("categories")
export class CategoryContoller {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @UseGuards(SupabaseGuard)
  public async getAllCategory() {
    return await this.categoryService.getAllCategory();
  }

  @Get("/:id")
  @UseGuards(SupabaseGuard)
  public async getCategory(@Param("id") id: string) {
    const getCategory = await this.categoryService.getCategory(id);

    return getCategory;
  }

  @Post()
  @UseGuards(SupabaseGuard)
  public async createCategory(@Body() categoryDTO: CategoryDTO) {
    const result = await this.categoryService.createCategory(categoryDTO);

    return result;
  }

  @Patch("/:id")
  @UseGuards(SupabaseGuard)
  public async editCategory(@Param("id") id: string, @Body() editCategoryDTO: EditCategoryDTO) {
    const result = await this.categoryService.editCategory(id, editCategoryDTO);

    return result;
  }

  @Delete("/:id")
  @UseGuards(SupabaseGuard)
  public async deleteCategory(@Param("id") id: string) {
    return await this.categoryService.deleteCategory(id);
  }
}
