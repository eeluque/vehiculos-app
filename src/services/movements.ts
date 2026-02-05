import { get, post, patch, del } from "./api";
import type {
  Movement,
  CreateMovementPayload,
  UpdateMovementPayload,
} from "@/types/movement";

export async function getMovements(): Promise<Movement[]> {
  const res = await get<{ mensaje?: string; data?: Movement[] }>("/movimientos");
  return Array.isArray(res?.data) ? res.data : [];
}

export async function createMovement(
  payload: CreateMovementPayload
): Promise<{ mensaje?: string }> {
  const body = {
    direccion: payload.direccion,
    vehiculo_placa: payload.vehiculo_placa,
    nombre_conductor: payload.nombre_conductor,
    creado: payload.creado,
    kilometraje: payload.kilometraje,
  };
  return post<{ mensaje?: string }>("/movimientos", body);
}

export async function updateMovement(
  id: number,
  payload: UpdateMovementPayload
): Promise<{ mensaje?: string; data?: unknown }> {
  const body = {
    ...payload,
    actualizado: payload.actualizado ?? new Date().toISOString(),
  };
  return patch<{ mensaje?: string; data?: unknown }>(
    `/movimientos/${id}`,
    body
  );
}

export async function deleteMovement(id: number): Promise<unknown> {
  return del(`/movimientos/${id}`);
}
