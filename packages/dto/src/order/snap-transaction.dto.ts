import { IsArray, IsEnum, IsNumber, IsString } from "class-validator";

import { TransactionDetailsDTO } from "./transaction-detail.dto";
import { ItemDetailsDTO } from "../product";
import { GetAddressDTO } from "../profile";

export class SnapTransactionDTO {
  readonly transaction_details: TransactionDetailsDTO;

  @IsArray()
  readonly item_details: ItemDetailsDTO[];

  readonly customer_details: GetAddressDTO;
}
