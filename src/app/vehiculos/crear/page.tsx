"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createVehicle } from "@/services/vehicles";
import { VehicleForm } from "@/components/vehicles/VehicleForm";
import type { VehicleFormValues } from "@/lib/validations/vehicle";
import type { ApiError } from "@/services/api";

export default function CrearVehiculoPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: { placa: string; modelo: string; marca: string }) =>
      createVehicle(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      toast.success("Vehículo creado correctamente.");
      router.push("/vehiculos");
    },
    onError: (err: ApiError) => {
      toast.error(err.message || "Error al crear el vehículo.");
    },
  });

  const handleSubmit = (values: VehicleFormValues) => {
    mutation.mutate({
      marca: values.marca,
      modelo: values.modelo,
      placa: values.placa,
    });
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <VehicleForm
        title="Crear vehículo"
        submitLabel="Crear"
        onSubmit={handleSubmit}
        isSubmitting={mutation.isPending}
      />
    </div>
  );
}
