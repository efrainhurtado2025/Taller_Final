// src/app/models/festivo.model.ts

export interface Festivo {
  festivo: string;
  fecha: string;
}

export interface VerificarFestivoResponse {
  esFestivo: boolean;
  mensaje?: string;
}

export interface ObtenerFestivosResponse {
  festivos: Festivo[];
}