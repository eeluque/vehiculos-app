"use client";

import Link from "next/link";
import type { Vehicle } from "@/types/vehicle";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface VehicleTableProps {
  vehicles: Vehicle[];
  onEdit: (placa: string) => void;
  onDelete: (vehicle: Vehicle) => void;
}

export function VehicleTable({ vehicles, onEdit, onDelete }: VehicleTableProps) {
  if (vehicles.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground text-center">
            No hay vehículos registrados.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="hidden md:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Marca</TableHead>
              <TableHead>Modelo</TableHead>
              <TableHead>Placa</TableHead>
              <TableHead>ID</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicles.map((v) => (
              <TableRow key={v.id ?? v.placa}>
                <TableCell>{v.marca}</TableCell>
                <TableCell>{v.modelo}</TableCell>
                <TableCell>{v.placa}</TableCell>
                <TableCell>{v.id ?? "—"}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/vehiculos/${encodeURIComponent(v.placa)}/editar`}>
                      Editar
                    </Link>
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(v)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="md:hidden space-y-4">
        {vehicles.map((v) => (
          <Card key={v.id ?? v.placa}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{v.placa}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>
                <span className="text-muted-foreground">Marca:</span> {v.marca}
              </p>
              <p>
                <span className="text-muted-foreground">Modelo:</span> {v.modelo}
              </p>
              <p>
                <span className="text-muted-foreground">ID:</span> {v.id ?? "—"}
              </p>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/vehiculos/${encodeURIComponent(v.placa)}/editar`}>
                    Editar
                  </Link>
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(v)}
                >
                  Eliminar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
