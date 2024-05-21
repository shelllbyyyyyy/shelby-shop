import { Transform } from "class-transformer";
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";

export class UpdateProductDTO {
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  readonly price?: number;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  readonly imageUrl?: string[];

  @IsString()
  @IsOptional()
  readonly slug?: string;
}
