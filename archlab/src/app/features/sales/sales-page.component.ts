import { Component, computed, inject } from '@angular/core';
import { CurrencyPipe, NgIf } from '@angular/common';
import { SalesStore } from './sales.store';
import { SalesListComponent } from './ui/sales-list.component';
import { ArchCardComponent } from '../../shared';

@Component({
  selector: 'arch-sales-page',
  standalone: true,
  imports: [NgIf, SalesListComponent, ArchCardComponent, CurrencyPipe],
  template: `
    <section>
      <header class="page-header">
        <h2>Sales</h2>
        <p>Ventas registradas (mock).</p>
      </header>

      <arch-card title="Resumen" subtitle="Metricas de ventas">
        <p>Total Items: {{ vm().totalItems }}</p>
        <p>Total Revenue: {{ vm().totalRevenue | currency }}</p>
      </arch-card>

      <p *ngIf="vm().loading">Cargando ventas...</p>
      <p *ngIf="vm().error" class="error">{{ vm().error }}</p>

      <arch-sales-list *ngIf="!vm().loading && !vm().error" [sales]="vm().sales"> </arch-sales-list>
    </section>
  `,
  styles: [
    `
      .page-header {
        margin-bottom: 1rem;
      }
      .error {
        color: #ff6b6b;
      }
    `,
  ],
})
export class SalesPageComponent {
  private readonly salesStore = inject(SalesStore);

  readonly vm = computed(() => ({
    sales: this.salesStore.sales(),
    loading: this.salesStore.loading(),
    error: this.salesStore.error(),
    totalItems: this.salesStore.totalItems(),
    totalRevenue: this.salesStore.totalRevenue(),
  }));
}
