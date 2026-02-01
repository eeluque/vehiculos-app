"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  vehicleFormSchema,
  type VehicleFormValues,
} from "@/lib/validations/vehicle";

interface VehicleFormProps {
  defaultValues?: Partial<VehicleFormValues>;
  onSubmit: (values: VehicleFormValues) => void;
  isSubmitting?: boolean;
  submitLabel?: string;
  title: string;
}

export function VehicleForm({
  defaultValues,
  onSubmit,
  isSubmitting = false,
  submitLabel = "Guardar",
  title,
}: VehicleFormProps) {
  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleFormSchema),
    defaultValues: defaultValues ?? {
      marca: "",
      modelo: "",
      placa: "",
    },
  });

  useEffect(() => {
    if (defaultValues && (defaultValues.marca ?? defaultValues.modelo ?? defaultValues.placa)) {
      form.reset(defaultValues);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues?.marca, defaultValues?.modelo, defaultValues?.placa]);

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="marca"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marca</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. Toyota" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="modelo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Modelo</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. Corolla" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="placa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Placa</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. ABC-123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2 pt-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Guardando…" : submitLabel}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/vehiculos">Cancelar</Link>
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
