import { IsNumberString, IsString } from "class-validator";

export class AddProductVariantDTO {
  @IsNumberString()
  readonly price: number;

  @IsString()
  readonly imageUrl: string;

  @IsString()
  readonly sku: string;

  @IsString()
  readonly label: string;
}
