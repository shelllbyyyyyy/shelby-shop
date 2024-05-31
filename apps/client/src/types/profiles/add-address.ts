import * as z from "zod";

export const addAddressFormSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  phone_number: z.string(),
  address: z.string(),
  postal_code: z.string(),
  city: z.string(),
  country_code: z.string(),
  googleMapsUrl: z.string(),
});

export type AddAddressFormSchema = z.infer<typeof addAddressFormSchema>;
