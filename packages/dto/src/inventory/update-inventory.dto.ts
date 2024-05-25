import { InventoryStatus } from "@shelby/db";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateInventoryDTO {
  @IsNumber()
  @IsOptional()
  readonly quantity?: number;

  @IsEnum(InventoryStatus)
  @IsOptional()
  readonly status?: InventoryStatus;
}
