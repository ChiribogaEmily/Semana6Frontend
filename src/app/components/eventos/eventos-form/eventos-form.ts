import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventosService } from '../../../services/eventos.service';
import { EventoRequest } from '../../../interfaces/evento';

@Component({
  selector: 'app-eventos-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './eventos-form.html',
})
export class EventosForm implements OnInit {
  id = signal<number | null>(null);
  error = signal('');

  form = signal<EventoRequest>({
    nombre: '',
    fecha: new Date().toISOString().split('T')[0],
    lugar: '',
    descripcion: '',
    precio: 0,
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: EventosService,
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id.set(+idParam);
      this.service.obtenerPorId(+idParam).subscribe((data) => {
        this.form.set({
          nombre: data.nombre,
          fecha: data.fecha.split('T')[0],
          lugar: data.lugar,
          descripcion: data.descripcion,
          precio: data.precio,
        });
      });
    }
  }

  updateField(field: keyof EventoRequest, value: any) {
    this.form.update((f) => ({ ...f, [field]: value }));
  }

  guardar() {
    this.error.set('');
    const data = this.form();

    if (!data.nombre || !data.lugar || !data.fecha || data.precio <= 0) {
      this.error.set('Por favor completa todos los campos');
      return;
    }

    if (this.id()) {
      this.service.actualizar(this.id()!, data).subscribe({
        next: () => this.router.navigate(['/eventos']),
        error: () => this.error.set('Error al actualizar el evento'),
      });
    } else {
      this.service.crear(data).subscribe({
        next: () => this.router.navigate(['/eventos']),
        error: () => this.error.set('Error al crear el evento'),
      });
    }
  }

  volver() {
    this.router.navigate(['/eventos']);
  }
}
