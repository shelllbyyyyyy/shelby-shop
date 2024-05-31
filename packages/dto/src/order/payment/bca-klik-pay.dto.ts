import { IsNumber, IsString } from "class-validator";

export class BCAKlikPayDTO {
  @IsString()
  readonly description: string;

  @IsNumber()
  readonly misc_fee: number | undefined | null;
}
