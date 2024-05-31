import { InventoryStatus } from "@shelby/db";
import * as z from "zod";

export const updateInventoryFormSchema = z.object({
  quantity: z.number(),
  status: z.nativeEnum(InventoryStatus),
});

export type UpdateInventoryFormSchema = z.infer<
  typeof updateInventoryFormSchema
>;
