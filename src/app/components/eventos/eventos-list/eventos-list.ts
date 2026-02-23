import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { EventosService } from '../../../services/eventos.service';
import { Evento } from '../../../interfaces/evento';

@Component({
  selector: 'app-eventos-list',
  standalone: true,
  imports: [CommonModule, DatePipe, CurrencyPipe],
  templateUrl: './eventos-list.html',
})
export class EventosList implements OnInit {
  eventos = signal<Evento[]>([]);
  modalVisible = signal(false);
  eventoAEliminar = signal<number | null>(null);

  constructor(
    private service: EventosService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.cargarEventos();
  }

  cargarEventos() {
    this.service.obtenerTodos().subscribe((data) => this.eventos.set(data));
  }

  nuevo() {
    this.router.navigate(['/eventos/nuevo']);
  }

  editar(id: number) {
    this.router.navigate([`/eventos/editar/${id}`]);
  }

  confirmarEliminar(id: number) {
    this.eventoAEliminar.set(id);
    this.modalVisible.set(true);
  }

  eliminar() {
    const id = this.eventoAEliminar();
    if (id) {
      this.service.eliminar(id).subscribe(() => {
        this.modalVisible.set(false);
        this.eventoAEliminar.set(null);
        this.cargarEventos();
      });
    }
  }

  cancelar() {
    this.modalVisible.set(false);
    this.eventoAEliminar.set(null);
  }
}
