export interface Vehicle {
  id?: number;
  placa: string;
  modelo: string;
  marca: string;
  creado?: string;
  actualizado?: string;
}

export interface CreateVehiclePayload {
  placa: string;
  modelo: string;
  marca: string;
  creado?: string;
  actualizado?: string;
}

export interface UpdateVehiclePayload {
  placa?: string;
  modelo?: string;
  marca?: string;
  actualizado?: string;
}
