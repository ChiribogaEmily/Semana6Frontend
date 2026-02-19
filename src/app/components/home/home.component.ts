import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  nombre = '';

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    if (!this.auth.estaLogueado()) {
      this.router.navigate(['/login']);
    }
    this.nombre = this.auth.obtenerNombre() || '';
  }

  cerrarSesion() {
    this.auth.cerrarSesion();
    this.router.navigate(['/login']);
  }
}
