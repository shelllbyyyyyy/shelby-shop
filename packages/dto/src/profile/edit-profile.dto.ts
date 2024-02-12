import { IsString, Length } from "class-validator";

export class EditProfileDTO {
  @IsString()
  @Length(4, 16)
  readonly name?: string;

  @IsString()
  @Length(2, 9)
  readonly phone_number?: string;

  @IsString()
  readonly address?: string;
}
