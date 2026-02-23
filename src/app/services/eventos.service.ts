import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento, EventoRequest } from '../interfaces/evento';

@Injectable({ providedIn: 'root' })
export class EventosService {
  private url = 'https://localhost:7219/api/Eventos';

  constructor(private http: HttpClient) {}

  obtenerTodos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.url);
  }

  obtenerPorId(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.url}/${id}`);
  }

  crear(evento: EventoRequest): Observable<Evento> {
    return this.http.post<Evento>(this.url, evento);
  }

  actualizar(id: number, evento: EventoRequest): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}`, { id, ...evento });
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
