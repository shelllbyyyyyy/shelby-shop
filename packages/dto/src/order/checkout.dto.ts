import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class CheckoutDTO {
  @IsArray()
  @IsString({ each: true })
  readonly items: string[];

  @IsOptional()
  @IsNumber()
  readonly qty?: number;
}
