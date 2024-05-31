import { IsNumber, IsString } from "class-validator";

export class CapturDTO {
  @IsString()
  readonly transaction_id: string;

  @IsNumber()
  readonly gross_amount: number | undefined | null;
}
