import { Transform } from "class-transformer";
import {
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
  @MinLength(3)
  @MaxLength(100)
  @IsOptional()
  name?: string;

  @IsNumber()
  @Min(3)
  @Max(100)
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  price?: number;

  @IsString()
  @MinLength(3)
  @MaxLength(100)
  @IsOptional()
  description?: string;

  @IsString()
  @MinLength(3)
  @MaxLength(100)
  @IsOptional()
  image?: string;
}
