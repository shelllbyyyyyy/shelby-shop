import { IsString, Length } from "class-validator";

export class EditProfileDTO {
  @IsString()
  @Length(4, 16)
  readonly name?: string;

  @IsString()
  @Length(12)
  readonly phoneNumber?: string;
}
