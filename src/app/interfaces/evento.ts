export interface Evento {
  id: number;
  nombre: string;
  fecha: string;
  lugar: string;
  descripcion?: string;
  precio: number;
}

export interface EventoRequest {
  nombre: string;
  fecha: string;
  lugar: string;
  descripcion?: string;
  precio: number;
}
