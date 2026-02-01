import { z } from "zod";
import { isValidPlaca, placaErrorMsg } from "@/utils/validation";

export const vehicleFormSchema = z.object({
  marca: z.string().min(1, "La marca es obligatoria"),
  modelo: z.string().min(1, "El modelo es obligatorio"),
  placa: z
    .string()
    .min(1, "La placa es obligatoria")
    .refine(isValidPlaca, placaErrorMsg),
});

export type VehicleFormValues = z.infer<typeof vehicleFormSchema>;
