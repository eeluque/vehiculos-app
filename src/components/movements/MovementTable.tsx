"use client";

import type { Movement } from "@/types/movement";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function formatDateTime(iso?: string) {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    return d.toLocaleString("es", {
      dateStyle: "short",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

interface MovementTableProps {
  movements: Movement[];
}

export function MovementTable({ movements }: MovementTableProps) {
  if (movements.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground text-center">
            No hay movimientos registrados.
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
              <TableHead>Vehículo (placa)</TableHead>
              <TableHead>Conductor</TableHead>
              <TableHead>Dirección</TableHead>
              <TableHead>Fecha y hora</TableHead>
              <TableHead>Kilometraje</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {movements.map((m) => (
              <TableRow key={m.id ?? `${m.vehiculo_placa}-${m.creado}`}>
                <TableCell>{m.vehiculo_placa}</TableCell>
                <TableCell>{m.nombre_conductor}</TableCell>
                <TableCell className="capitalize">{m.direccion}</TableCell>
                <TableCell>{formatDateTime(m.creado)}</TableCell>
                <TableCell>{m.kilometraje}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="md:hidden space-y-4">
        {movements.map((m) => (
          <Card key={m.id ?? `${m.vehiculo_placa}-${m.creado}`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">
                {m.vehiculo_placa} · {m.direccion}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>
                <span className="text-muted-foreground">Conductor:</span>{" "}
                {m.nombre_conductor}
              </p>
              <p>
                <span className="text-muted-foreground">Fecha y hora:</span>{" "}
                {formatDateTime(m.creado)}
              </p>
              <p>
                <span className="text-muted-foreground">Kilometraje:</span>{" "}
                {m.kilometraje ?? "—"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
