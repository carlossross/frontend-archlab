import { Component, input } from '@angular/core';
import { NgForOf, DatePipe, CurrencyPipe } from '@angular/common';
import { Sale } from '../sale.model';

@Component({
  selector: 'arch-sales-list',
  standalone: true,
  imports: [NgForOf, DatePipe, CurrencyPipe],
  template: `
    <table class="sales-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Precio</th>
          <th>Total</th>
          <th>Fecha</th>
        </tr>
      </thead>

      <tbody>
        <tr *ngFor="let sale of sales()">
          <td>{{ sale.id }}</td>
          <td>{{ sale.product }}</td>
          <td>{{ sale.quantity }}</td>
          <td>{{ sale.price | currency }}</td>
          <td>{{ sale.total | currency }}</td>
          <td>{{ sale.date | date : 'mediumDate' }}</td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [
    `
      .sales-table {
        width: 100%;
        border-collapse: collapse;
      }

      th,
      td {
        padding: 0.5rem;
        border-bottom: 1px solid #333;
        text-align: left;
      }

      thead tr {
        background: rgba(255, 255, 255, 0.06);
      }
    `,
  ],
})
export class SalesListComponent {
  sales = input<Sale[]>([]);
}
