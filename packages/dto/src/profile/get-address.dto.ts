import { IsEmail, IsString } from "class-validator";

export class GetAddressDTO {
  @IsString()
  readonly id: string;

  @IsString()
  readonly first_name: string;

  @IsString()
  readonly last_name: string;

  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly phone_number: string;

  @IsString()
  readonly address: string;

  @IsString()
  readonly city: string;

  @IsString()
  readonly postal_code: string;

  @IsString()
  readonly country_code: string;

  @IsString()
  readonly googleMapsUrl?: string;
}
