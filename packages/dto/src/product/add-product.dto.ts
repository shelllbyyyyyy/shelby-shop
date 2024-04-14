import { Type } from "class-transformer";
import { IsNumber, IsNumberString, IsString } from "class-validator";

export class AddProductDTO {
  @IsString()
  readonly name: string;

  @IsNumber()
  @Type(() => Number)
  readonly price: number;

  @IsString()
  readonly imageUrl: string;

  @IsString()
  readonly slug: string;

  @IsString()
  readonly description: string;
}
