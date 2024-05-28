import { IsArray, IsNumber, IsString } from "class-validator";

export class CheckoutDTO {
  @IsArray()
  @IsString({ each: true })
  readonly items: string[];
}
