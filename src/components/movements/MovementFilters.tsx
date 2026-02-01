"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Vehicle } from "@/types/vehicle";

interface MovementFiltersProps {
  vehicles: Vehicle[];
  filterDate: string;
  filterVehicle: string;
  filterDriver: string;
  onDateChange: (value: string) => void;
  onVehicleChange: (value: string) => void;
  onDriverChange: (value: string) => void;
  onClear: () => void;
}

export function MovementFilters({
  vehicles,
  filterDate,
  filterVehicle,
  filterDriver,
  onDateChange,
  onVehicleChange,
  onDriverChange,
  onClear,
}: MovementFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-end">
      <div className="space-y-2">
        <Label htmlFor="filter-date">Fecha</Label>
        <Input
          id="filter-date"
          type="date"
          value={filterDate}
          onChange={(e) => onDateChange(e.target.value)}
          className="w-full sm:w-auto"
        />
      </div>
      <div className="space-y-2">
        <Label>Vehículo</Label>
        <Select value={filterVehicle || "__all__"} onValueChange={onVehicleChange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__all__">Todos</SelectItem>
            {vehicles.map((v) => (
              <SelectItem key={v.id ?? v.placa} value={v.placa}>
                {v.placa} - {v.marca} {v.modelo}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="filter-driver">Conductor</Label>
        <Input
          id="filter-driver"
          type="text"
          placeholder="Nombre del conductor"
          value={filterDriver}
          onChange={(e) => onDriverChange(e.target.value)}
          className="w-full sm:w-[200px]"
        />
      </div>
      <Button variant="outline" onClick={onClear}>
        Limpiar filtros
      </Button>
    </div>
  );
}
