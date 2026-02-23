import { Evento } from './evento';

export interface Factura {
  id: number;
  fecha: string;
  descripcion: string;
  total: number;
  eventoId: number;
  evento?: Evento;
}

export interface FacturaRequest {
  fecha: string;
  descripcion: string;
  total: number;
  eventoId: number;
}
