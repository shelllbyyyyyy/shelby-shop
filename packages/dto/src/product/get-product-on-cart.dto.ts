import { IsNumber, IsString } from "class-validator";

export class ItemDetailsDTO {
  @IsString()
  readonly id: string;

  @IsString()
  readonly name: string;

  @IsNumber()
  readonly price: number;

  @IsNumber()
  readonly quantity: number;

  @IsString()
  readonly variant: string;

  @IsString()
  readonly sku: string;

  @IsString()
  readonly category: string;
}
