import { IsEmail, IsString } from "class-validator";

export class BillingAddressDTO {
  @IsString()
  readonly first_name: string;

  @IsString()
  readonly last_name: string;

  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly phone: string;

  @IsString()
  readonly address: string;

  @IsString()
  readonly city: string;

  @IsString()
  readonly postal_code: string;

  @IsString()
  readonly country_code: string;
}

export class ShippingAddressDTO {
  @IsString()
  readonly first_name: string;

  @IsString()
  readonly last_name: string;

  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly phone: string;

  @IsString()
  readonly address: string;

  @IsString()
  readonly city: string;

  @IsString()
  readonly postal_code: string;

  @IsString()
  readonly country_code: string;
}
