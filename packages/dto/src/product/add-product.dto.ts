import { IsArray, IsNumberString, IsString } from "class-validator";

export class AddProductDTO {
  @IsString()
  readonly name: string;

  @IsNumberString()
  readonly price: number;

  @IsArray()
  @IsString({ each: true })
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
