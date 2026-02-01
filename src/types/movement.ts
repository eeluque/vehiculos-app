export interface Movement {
  id?: number;
  direccion: string;
  vehiculo_placa: string;
  nombre_conductor: string;
  creado: string;
  actualizado?: string;
  kilometraje?: number;
}

export interface CreateMovementPayload {
  direccion: string;
  vehiculo_placa: string;
  nombre_conductor: string;
  creado: string;
  kilometraje?: number;
}

export interface UpdateMovementPayload {
  direccion?: string;
  vehiculo_placa?: string;
  nombre_conductor?: string;
  actualizado?: string;
  kilometraje?: number;
}
