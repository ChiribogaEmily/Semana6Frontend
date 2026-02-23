import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FacturasService } from '../../../services/facturas.service';
import { EventosService } from '../../../services/eventos.service';
import { FacturaRequest } from '../../../interfaces/factura';
import { Evento } from '../../../interfaces/evento';

@Component({
  selector: 'app-facturas-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './facturas-form.html',
})
export class FacturasForm implements OnInit {
  id = signal<number | null>(null);
  eventos = signal<Evento[]>([]);
  error = signal('');

  form = signal<FacturaRequest>({
    fecha: new Date().toISOString().split('T')[0],
    descripcion: '',
    total: 0,
    eventoId: 0,
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private facturasService: FacturasService,
    private eventosService: EventosService,
  ) {}

  ngOnInit() {
    this.eventosService.obtenerTodos().subscribe((data) => this.eventos.set(data));

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id.set(+idParam);
      this.facturasService.obtenerPorId(+idParam).subscribe((data) => {
        this.form.set({
          fecha: data.fecha.split('T')[0],
          descripcion: data.descripcion,
          total: data.total,
          eventoId: data.eventoId,
        });
      });
    }
  }

  updateField(field: keyof FacturaRequest, value: any) {
    this.form.update((f) => ({ ...f, [field]: value }));
  }

  guardar() {
    this.error.set('');
    const data = this.form();

    if (!data.descripcion || !data.eventoId || data.total <= 0) {
      this.error.set('Por favor completa todos los campos');
      return;
    }

    if (this.id()) {
      this.facturasService.actualizar(this.id()!, data).subscribe({
        next: () => this.router.navigate(['/facturas']),
        error: () => this.error.set('Error al actualizar la factura'),
      });
    } else {
      this.facturasService.crear(data).subscribe({
        next: () => this.router.navigate(['/facturas']),
        error: () => this.error.set('Error al crear la factura'),
      });
    }
  }

  volver() {
    this.router.navigate(['/facturas']);
  }
}
