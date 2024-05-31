import { IsOptional, IsString } from "class-validator";

export class EditBillboardDTO {
  @IsString()
  @IsOptional()
  readonly tittle?: string;

  @IsString()
  @IsOptional()
  readonly label?: string;

  @IsString()
  @IsOptional()
  readonly section?: string;

  @IsString()
  @IsOptional()
  readonly imageUrl?: string;
}
