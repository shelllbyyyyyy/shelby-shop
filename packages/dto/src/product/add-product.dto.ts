import { IsNumberString, IsString } from "class-validator";

export class AddProductDTO {
  @IsString()
  name: string;

  @IsNumberString()
  price: number;

  @IsString()
  image?: string;

  @IsString()
  slug: string;

  @IsString()
  description: string;
}
