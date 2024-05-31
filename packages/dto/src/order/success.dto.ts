import { IsOptional, IsString } from "class-validator";

export class SuccessDTO {
  @IsOptional()
  @IsString()
  readonly id?: string;
}
