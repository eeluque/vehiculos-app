"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getVehicles } from "@/services/vehicles";
import { createMovement } from "@/services/movements";
import { MovementForm } from "@/components/movements/MovementForm";
import type { MovementFormValues } from "@/lib/validations/movement";
import type { ApiError } from "@/services/api";

function toISOFromDateAndTime(fecha: string, hora: string): string {
  if (!fecha || !hora) return new Date().toISOString();
  return new Date(`${fecha}T${hora}`).toISOString();
}

export default function RegistrarMovimientoPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: vehicles = [], isLoading: loadingVehicles } = useQuery({
    queryKey: ["vehicles"],
    queryFn: getVehicles,
  });

  const mutation = useMutation({
    mutationFn: (payload: {
      direccion: string;
      vehiculo_placa: string;
      nombre_conductor: string;
      creado: string;
      kilometraje?: number;
    }) => createMovement(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movements"] });
      toast.success("Movimiento registrado correctamente.");
      router.push("/movimientos");
    },
    onError: (err: ApiError) => {
      toast.error(err.message || "Error al registrar el movimiento.");
    },
  });

  const handleSubmit = (values: MovementFormValues) => {
    const creado = toISOFromDateAndTime(values.fecha, values.hora);
    mutation.mutate({
      direccion: values.direccion,
      vehiculo_placa: values.vehiculo_placa,
      nombre_conductor: values.nombre_conductor,
      creado,
      kilometraje: values.kilometraje,
    });
  };

  if (loadingVehicles) {
    return (
      <div className="container mx-auto py-6 px-4">
        <p className="text-muted-foreground">Cargando vehículos…</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <MovementForm
        vehicles={vehicles}
        onSubmit={handleSubmit}
        isSubmitting={mutation.isPending}
      />
    </div>
  );
}
