"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { getVehicles, deleteVehicle } from "@/services/vehicles";
import type { Vehicle } from "@/types/vehicle";
import { Button } from "@/components/ui/button";
import { VehicleTable } from "@/components/vehicles/VehicleTable";
import { DeleteVehicleDialog } from "@/components/vehicles/DeleteVehicleDialog";
import type { ApiError } from "@/services/api";

export default function VehiculosPage() {
  const queryClient = useQueryClient();
  const [deleteTarget, setDeleteTarget] = useState<Vehicle | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: vehicles = [], isLoading, error } = useQuery({
    queryKey: ["vehicles"],
    queryFn: getVehicles,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteVehicle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      toast.success("Vehículo eliminado correctamente.");
      setDialogOpen(false);
      setDeleteTarget(null);
    },
    onError: (err: ApiError) => {
      toast.error(err.message || "Error al eliminar el vehículo.");
    },
  });

  const handleDeleteClick = (vehicle: Vehicle) => {
    setDeleteTarget(vehicle);
    setDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteTarget?.id != null) {
      deleteMutation.mutate(deleteTarget.id);
    }
  };

  return (
    <div className="container mx-auto py-6 px-4 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Vehículos</h1>
        <Button asChild>
          <Link href="/vehiculos/crear">Crear vehículo</Link>
        </Button>
      </div>

      {isLoading && (
        <p className="text-muted-foreground">Cargando vehículos…</p>
      )}
      {error && (
        <p className="text-destructive">
          {(error as unknown as ApiError)?.message || "Error al cargar los vehículos."}
        </p>
      )}
      {!isLoading && !error && (
        <VehicleTable
          vehicles={vehicles}
          onEdit={(placa) => {}}
          onDelete={handleDeleteClick}
        />
      )}

      <DeleteVehicleDialog
        vehicle={deleteTarget}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onConfirm={handleConfirmDelete}
        isDeleting={deleteMutation.isPending}
      />
    </div>
  );
}
