import { IsNumber, IsString } from "class-validator";

export class AddToCartDTO {
  @IsString()
  readonly id: string;

  @IsNumber()
  readonly quantity: number;
}
