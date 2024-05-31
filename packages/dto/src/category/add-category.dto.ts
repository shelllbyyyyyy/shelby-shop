import { IsString } from "class-validator";

export class CategoryDTO {
  @IsString()
  readonly name: string;
}
