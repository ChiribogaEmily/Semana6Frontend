import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  contrasenia = '';
  error = '';

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  iniciarSesion() {
    this.auth.login(this.email, this.contrasenia).subscribe({
      next: (res) => {
        this.auth.guardarSesion(res.nombre);
        this.router.navigate(['/home']);
      },
      error: () => {
        this.error = 'Credenciales incorrectas';
      },
    });
  }
}
