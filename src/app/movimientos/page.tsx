"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getMovements } from "@/services/movements";
import { getVehicles } from "@/services/vehicles";
import { MovementTable } from "@/components/movements/MovementTable";
import { MovementFilters } from "@/components/movements/MovementFilters";
import { Button } from "@/components/ui/button";
import type { ApiError } from "@/services/api";
import type { Movement } from "@/types/movement";

function filterByDate(movements: Movement[], date: string): Movement[] {
  if (!date) return movements;
  return movements.filter((m) => {
    try {
      const d = new Date(m.creado).toISOString().slice(0, 10);
      return d === date;
    } catch {
      return false;
    }
  });
}

function filterByVehicle(movements: Movement[], placa: string): Movement[] {
  if (!placa || placa === "__all__") return movements;
  return movements.filter((m) => m.vehiculo_placa === placa);
}

function filterByDriver(movements: Movement[], driver: string): Movement[] {
  if (!driver.trim()) return movements;
  const q = driver.trim().toLowerCase();
  return movements.filter((m) =>
    m.nombre_conductor.toLowerCase().includes(q)
  );
}

export default function MovimientosPage() {
  const [filterDate, setFilterDate] = useState("");
  const [filterVehicle, setFilterVehicle] = useState("__all__");
  const [filterDriver, setFilterDriver] = useState("");

  const { data: movements = [], isLoading, error } = useQuery({
    queryKey: ["movements"],
    queryFn: getMovements,
  });

  const { data: vehicles = [] } = useQuery({
    queryKey: ["vehicles"],
    queryFn: getVehicles,
  });

  const filteredMovements = useMemo(() => {
    let result = movements;
    result = filterByDate(result, filterDate);
    result = filterByVehicle(result, filterVehicle);
    result = filterByDriver(result, filterDriver);
    return result;
  }, [movements, filterDate, filterVehicle, filterDriver]);

  const handleClearFilters = () => {
    setFilterDate("");
    setFilterVehicle("__all__");
    setFilterDriver("");
  };

  return (
    <div className="container mx-auto py-6 px-4 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Movimientos</h1>
        <Button asChild>
          <Link href="/movimientos/registrar">Registrar movimiento</Link>
        </Button>
      </div>

      <MovementFilters
        vehicles={vehicles}
        filterDate={filterDate}
        filterVehicle={filterVehicle}
        filterDriver={filterDriver}
        onDateChange={setFilterDate}
        onVehicleChange={setFilterVehicle}
        onDriverChange={setFilterDriver}
        onClear={handleClearFilters}
      />

      {isLoading && (
        <p className="text-muted-foreground">Cargando movimientos…</p>
      )}
      {error && (
        <p className="text-destructive">
          {(error as unknown as ApiError)?.message || "Error al cargar los movimientos."}
        </p>
      )}
      {!isLoading && !error && (
        <MovementTable movements={filteredMovements} />
      )}
    </div>
  );
}
