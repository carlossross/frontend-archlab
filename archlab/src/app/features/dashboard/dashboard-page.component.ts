import { Component, computed, inject } from '@angular/core';
import { NgForOf, NgIf, NgClass } from '@angular/common';
import { DashboardStore } from './dashboard.store';
import { ArchCardComponent } from '../../shared';

@Component({
  selector: 'arch-dashboard-page',
  standalone: true,
  imports: [NgForOf, NgIf, NgClass, ArchCardComponent],
  template: `
    <section class="dashboard">
      <header class="page-header">
        <h2>Dashboard</h2>
        <p>Overview de estado global del sistema (demo).</p>

        <div class="actions">
          <button type="button" (click)="onRefresh()" [disabled]="vm().isLoading">
            {{ vm().isLoading ? 'Refreshing...' : 'Refresh' }}
          </button>
        </div>
      </header>

      <p *ngIf="vm().error" class="error">
        {{ vm().error }}
      </p>

      <section class="stats-grid" *ngIf="vm().stats.length > 0">
        <arch-card
          *ngFor="let stat of vm().stats"
          [title]="stat.label"
          [subtitle]="stat.description ?? ''"
        >
          <div class="stat-value">
            {{ stat.value }}
          </div>

          <div class="stat-trend" [ngClass]="trendClass(stat.trend)">
            <span *ngIf="stat.trend === 'up'">▲ Up</span>
            <span *ngIf="stat.trend === 'down'">▼ Down</span>
            <span *ngIf="stat.trend === 'stable'">■ Stable</span>
          </div>

          <div card-footer>
            <small>ID: {{ stat.id }}</small>
          </div>
        </arch-card>
      </section>

      <p *ngIf="!vm().isLoading && vm().stats.length === 0">No statistics available.</p>
    </section>
  `,
  styles: [
    `
      .dashboard {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
      }
      .page-header {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
      }
      .actions {
        margin-top: 0.5rem;
      }
      .error {
        color: #ff6b6b;
      }
      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 1rem;
      }
      .stat-value {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 0.25rem;
      }
      .stat-trend {
        font-size: 0.85rem;
        font-weight: 500;
      }
      .stat-trend--up {
        color: #4ade80;
      }
      .stat-trend--down {
        color: #f97373;
      }
      .stat-trend--stable {
        color: #e5e7eb;
      }
    `,
  ],
})
export class DashboardPageComponent {
  private readonly dashboardStore = inject(DashboardStore);

  // 🔥 ViewModel pattern aplicado al feature
  readonly vm = computed(() => ({
    stats: this.dashboardStore.stats(),
    isLoading: this.dashboardStore.loading(),
    error: this.dashboardStore.error(),
    total: this.dashboardStore.totalStats(),
  }));

  onRefresh() {
    this.dashboardStore.refresh();
  }

  trendClass(trend: 'up' | 'down' | 'stable'): string {
    switch (trend) {
      case 'up':
        return 'stat-trend stat-trend--up';
      case 'down':
        return 'stat-trend stat-trend--down';
      case 'stable':
        return 'stat-trend stat-trend--stable';
    }
  }
}
