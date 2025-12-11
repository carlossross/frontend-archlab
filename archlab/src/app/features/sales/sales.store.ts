import { Injectable, computed, signal } from '@angular/core';
import { SaleDto } from './sale.dto';
import { Sale } from './sale.model';
import { mapSalesDtoToSales } from './sale.mapper';

// Mock para el demo
const MOCK_SALES: SaleDto[] = [
  {
    id: 1,
    product_name: 'Laptop Pro 14',
    quantity: 2,
    price: 1300,
    created_at: '2024-05-01T10:00:00Z',
  },
  {
    id: 2,
    product_name: 'Mechanical Keyboard',
    quantity: 1,
    price: 150,
    created_at: '2024-06-10T15:30:00Z',
  },
  {
    id: 3,
    product_name: 'Office Chair',
    quantity: 1,
    price: 350,
    created_at: '2024-06-15T12:15:00Z',
  },
];

@Injectable({ providedIn: 'root' })
export class SalesStore {
  // 🔹 domain state
  private readonly _sales = signal<Sale[]>([]);
  readonly sales = this._sales.asReadonly();

  // 🔹 UI state
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  // 🔹 derived state
  readonly totalRevenue = computed(() => this._sales().reduce((acc, s) => acc + s.total, 0));

  readonly totalItems = computed(() => this._sales().reduce((acc, s) => acc + s.quantity, 0));

  constructor() {
    // se podría llamar desde el smart, pero aquí lo simulamos
    this.loadSales();
  }

  loadSales() {
    this._loading.set(true);
    this._error.set(null);

    setTimeout(() => {
      try {
        const mapped = mapSalesDtoToSales(MOCK_SALES);
        this._sales.set(mapped);
      } catch {
        this._error.set('Error loading sales');
      } finally {
        this._loading.set(false);
      }
    }, 400);
  }
}
