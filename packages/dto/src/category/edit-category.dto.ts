import { IsOptional, IsString } from "class-validator";

export class EditCategoryDTO {
  @IsString()
  @IsOptional()
  readonly name?: string;
}
