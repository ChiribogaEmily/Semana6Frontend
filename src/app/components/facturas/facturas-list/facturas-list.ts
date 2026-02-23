import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { FacturasService } from '../../../services/facturas.service';
import { Factura } from '../../../interfaces/factura';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
@Component({
  selector: 'app-facturas-list',
  standalone: true,
  imports: [CommonModule, DatePipe, CurrencyPipe],
  templateUrl: './facturas-list.html',
})
export class FacturasList implements OnInit {
  facturas = signal<Factura[]>([]);
  modalVisible = signal(false);
  facturaAEliminar = signal<number | null>(null);

  constructor(
    private service: FacturasService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.cargarFacturas();
  }

  cargarFacturas() {
    this.service.obtenerTodos().subscribe((data) => this.facturas.set(data));
  }

  nueva() {
    this.router.navigate(['/facturas/nueva']);
  }

  editar(id: number) {
    this.router.navigate([`/facturas/editar/${id}`]);
  }

  confirmarEliminar(id: number) {
    this.facturaAEliminar.set(id);
    this.modalVisible.set(true);
  }

  eliminar() {
    const id = this.facturaAEliminar();
    if (id) {
      this.service.eliminar(id).subscribe(() => {
        this.modalVisible.set(false);
        this.facturaAEliminar.set(null);
        this.cargarFacturas();
      });
    }
  }

  cancelar() {
    this.modalVisible.set(false);
    this.facturaAEliminar.set(null);
  }

  generarPDF() {
    const doc = new jsPDF();
    const morado: [number, number, number] = [108, 43, 217];
    const moradoClaro: [number, number, number] = [237, 233, 254];
    const gris: [number, number, number] = [100, 100, 100];

    doc.setFillColor(...morado);
    doc.rect(0, 0, 220, 3, 'F');

    doc.setFontSize(20);
    doc.setTextColor(...morado);
    doc.text('Reporte de Facturas', 14, 20);

    doc.setFontSize(10);
    doc.setTextColor(...gris);
    doc.text('EventosApp', 14, 27);

    doc.setDrawColor(...morado);
    doc.setLineWidth(0.3);
    doc.line(14, 31, 196, 31);

    doc.setFontSize(9);
    doc.setTextColor(...gris);
    doc.text(`Generado el: ${new Date().toLocaleDateString('es-EC')}`, 14, 38);

    autoTable(doc, {
      startY: 44,
      head: [['#', 'Evento', 'Descripción', 'Fecha', 'Total']],
      body: this.facturas().map((f) => [
        f.id,
        f.evento?.nombre || '',
        f.descripcion,
        new Date(f.fecha).toLocaleDateString('es-EC'),
        `$${f.total.toFixed(2)}`,
      ]),
      headStyles: {
        fillColor: morado,
        textColor: 255,
        fontStyle: 'bold',
        fontSize: 9,
      },
      alternateRowStyles: {
        fillColor: moradoClaro,
      },
      styles: {
        fontSize: 9,
        cellPadding: 4,
      },
      columnStyles: {
        0: { cellWidth: 10 },
        4: { halign: 'right' },
      },
    });

    const total = this.facturas().reduce((acc, f) => acc + f.total, 0);
    const finalY = (doc as any).lastAutoTable.finalY + 10;

    doc.setDrawColor(...morado);
    doc.setLineWidth(0.3);
    doc.line(14, finalY - 4, 196, finalY - 4);

    doc.setFontSize(11);
    doc.setTextColor(...morado);
    doc.text(`Total general: $${total.toFixed(2)}`, 196, finalY + 2, { align: 'right' });

    doc.setFillColor(...morado);
    doc.rect(0, 290, 220, 3, 'F');

    doc.save('reporte-facturas-eventos.pdf');
  }
}
