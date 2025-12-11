import { Injectable, computed, signal } from '@angular/core';

export interface DashboardStat {
  id: string;
  label: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  description?: string;
}

@Injectable({ providedIn: 'root' })
export class DashboardStore {
  // 🔹 Domain state: métricas del dashboard
  private readonly _stats = signal<DashboardStat[]>([
    {
      id: 'users',
      label: 'Active users',
      value: 3,
      trend: 'up',
      description: 'Users currently loaded in the Users feature (mock).',
    },
    {
      id: 'projects',
      label: 'Projects',
      value: 7,
      trend: 'stable',
      description: 'Placeholder for future Projects feature.',
    },
    {
      id: 'tasks',
      label: 'Open tasks',
      value: 21,
      trend: 'down',
      description: 'Tasks pending in the system (mock).',
    },
  ]);

  // 🔹 UI state
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly stats = this._stats.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  readonly totalStats = computed(() => this._stats().length);

  // Podrías imaginar esto como un fetch real
  refresh() {
    this._loading.set(true);
    this._error.set(null);

    // Simulamos un refresh rápido
    setTimeout(() => {
      // Podrías actualizar valores aquí, por ahora sólo togglear trend
      const updated = this._stats().map(
        (s): DashboardStat => ({
          ...s,
          trend: s.trend === 'up' ? 'stable' : 'up',
        })
      );

      this._stats.set(updated);
      this._loading.set(false);
    }, 300);
  }
}
