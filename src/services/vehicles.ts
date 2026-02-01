import { get, post, patch, del } from "./api";
import type { Vehicle, CreateVehiclePayload, UpdateVehiclePayload } from "@/types/vehicle";

export async function getVehicles(): Promise<Vehicle[]> {
  const data = await get<Vehicle[]>("/vehiculos");
  return Array.isArray(data) ? data : [];
}

export async function createVehicle(
  payload: CreateVehiclePayload
): Promise<{ mensaje?: string }> {
  const body = {
    ...payload,
    creado: payload.creado ?? new Date().toISOString(),
    actualizado: payload.actualizado ?? new Date().toISOString(),
  };
  return post<{ mensaje?: string }>("/vehiculos", body);
}

export async function updateVehicle(
  placa: string,
  payload: UpdateVehiclePayload
): Promise<{ mensaje?: string; data?: unknown }> {
  const body = {
    ...payload,
    actualizado: payload.actualizado ?? new Date().toISOString(),
  };
  return patch<{ mensaje?: string; data?: unknown }>(
    `/vehiculos/${encodeURIComponent(placa)}`,
    body
  );
}

export async function deleteVehicle(id: number): Promise<unknown> {
  return del(`/vehiculos/${id}`);
}
