import { IsNumber, IsString } from "class-validator";

export class TransactionDetailsDTO {
  @IsString()
  readonly order_id: string;

  @IsNumber()
  readonly gross_amount: number;
}
