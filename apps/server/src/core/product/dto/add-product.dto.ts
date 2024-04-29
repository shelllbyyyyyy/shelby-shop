import { Transform } from "class-transformer";
import { IsNumber, IsNumberString, IsString } from "class-validator";

export class AddProductDTO {
  @IsString()
  readonly name: string;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  readonly price: number;

  @IsString()
  readonly imageUrl: string[];

  @IsString()
  readonly slug: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly sku: string;

  @IsString()
  readonly label: string;

  @IsString()
  readonly category: string;
}
