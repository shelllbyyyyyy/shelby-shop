import { IsNumber, IsString, Length } from "class-validator";

export class EditProfileDTO {
  @IsString()
  @Length(4, 16)
  readonly name: string;

  @IsNumber()
  @Length(2, 9)
  readonly phone_number: number;

  @IsString()
  readonly address: string;
}
