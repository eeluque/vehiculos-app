import { z } from "zod";

export const movementFormSchema = z.object({
  vehiculo_placa: z.string().min(1, "Seleccione un vehículo"),
  nombre_conductor: z.string().min(1, "El nombre del conductor es obligatorio"),
  fecha: z.string().min(1, "La fecha es obligatoria"),
  hora: z.string().min(1, "La hora es obligatoria"),
  kilometraje: z.number().min(0, "El kilometraje no puede ser negativo"),
  direccion: z.enum(["entrada", "salida"], {
    message: "Seleccione entrada o salida",
  }),
});

export type MovementFormValues = z.infer<typeof movementFormSchema>;
