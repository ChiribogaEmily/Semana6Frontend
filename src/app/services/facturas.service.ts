import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Factura, FacturaRequest } from '../interfaces/factura';

@Injectable({ providedIn: 'root' })
export class FacturasService {
  private url = 'https://localhost:7219/api/Facturas';

  constructor(private http: HttpClient) {}

  obtenerTodos(): Observable<Factura[]> {
    return this.http.get<Factura[]>(this.url);
  }

  obtenerPorId(id: number): Observable<Factura> {
    return this.http.get<Factura>(`${this.url}/${id}`);
  }

  crear(factura: FacturaRequest): Observable<Factura> {
    return this.http.post<Factura>(this.url, factura);
  }

  actualizar(id: number, factura: FacturaRequest): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}`, { id, ...factura });
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
