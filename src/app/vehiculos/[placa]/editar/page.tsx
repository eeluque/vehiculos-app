"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { getVehicles, updateVehicle } from "@/services/vehicles";
import { VehicleForm } from "@/components/vehicles/VehicleForm";
import type { VehicleFormValues } from "@/lib/validations/vehicle";
import type { ApiError } from "@/services/api";

export default function EditarVehiculoPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const placa = decodeURIComponent((params.placa as string) ?? "");

  const { data: vehicles = [], isLoading, error } = useQuery({
    queryKey: ["vehicles"],
    queryFn: () => getVehicles(),
  });

  const vehicle = vehicles.find((v) => v.placa === placa);

  const mutation = useMutation({
    mutationFn: (payload: VehicleFormValues) =>
      updateVehicle(placa, {
        marca: payload.marca,
        modelo: payload.modelo,
        placa: payload.placa,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      toast.success("Vehículo actualizado correctamente.");
      router.push("/vehiculos");
    },
    onError: (err: ApiError) => {
      toast.error(err.message || "Error al actualizar el vehículo.");
    },
  });

  const handleSubmit = (values: VehicleFormValues) => {
    mutation.mutate(values);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-6 px-4">
        <p className="text-muted-foreground">Cargando…</p>
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="container mx-auto py-6 px-4">
        <p className="text-destructive">
          {(error as unknown as ApiError)?.message || "Vehículo no encontrado."}
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <VehicleForm
        title="Editar vehículo"
        submitLabel="Guardar"
        defaultValues={{
          marca: vehicle.marca,
          modelo: vehicle.modelo,
          placa: vehicle.placa,
        }}
        onSubmit={handleSubmit}
        isSubmitting={mutation.isPending}
      />
    </div>
  );
}
