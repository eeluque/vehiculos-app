import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">
          Sistema de Entrada/Salida de Vehículos
        </h1>
        <p className="text-muted-foreground">
          Gestión de vehículos y movimientos de entrada y salida
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 max-w-2xl mx-auto">
        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader>
            <CardTitle>Vehículos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Consultar, crear, editar y eliminar vehículos registrados.
            </p>
            <Button asChild>
              <Link href="/vehiculos">Ir a Vehículos</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader>
            <CardTitle>Movimientos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Registrar entradas y salidas y ver el historial con filtros.
            </p>
            <Button asChild>
              <Link href="/movimientos">Ir a Movimientos</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
