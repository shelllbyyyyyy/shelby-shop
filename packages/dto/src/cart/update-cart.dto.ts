import { IsNumber, IsString } from "class-validator";

export class UpdateCartDTO {
  @IsString()
  readonly productVariantId: string;

  @IsNumber()
  readonly quantity: number;

  @IsString()
  readonly cartId: string;
}
