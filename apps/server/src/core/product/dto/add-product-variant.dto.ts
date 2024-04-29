import { Transform } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class AddProductVariantDTO {
  @IsString()
  readonly name: string;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  readonly price: number;

  @IsString()
  readonly imageUrl: string;

  @IsString()
  readonly sku: string;

  @IsString()
  readonly label: string;
}
