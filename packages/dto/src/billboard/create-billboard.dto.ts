import { IsString } from "class-validator";

export class BillboardDTO {
  @IsString()
  readonly tittle: string;

  @IsString()
  readonly label: string;

  @IsString()
  readonly section: string;

  @IsString()
  readonly imageUrl: string;
}
