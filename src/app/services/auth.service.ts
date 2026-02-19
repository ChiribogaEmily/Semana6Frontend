import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private url = 'https://localhost:7219/api/Usuarios/iniciar-sesion';
  constructor(private http: HttpClient) {}

  login(email: string, contrasenia: string) {
    return this.http.post<any>(this.url, { email, contrasenia });
  }

  guardarSesion(nombre: string) {
    localStorage.setItem('nombreUsuario', nombre);
  }

  obtenerNombre() {
    return localStorage.getItem('nombreUsuario');
  }

  cerrarSesion() {
    localStorage.removeItem('nombreUsuario');
  }

  estaLogueado() {
    return !!localStorage.getItem('nombreUsuario');
  }
}
