import { Injectable, signal } from '@angular/core';

@Injectable()
export class UsersFiltersStore {
  // 🔹 UI state local del componente
  private readonly _search = signal<string>('');

  readonly search = this._search.asReadonly();

  setSearch(value: string) {
    this._search.set(value);
  }

  clear() {
    this._search.set('');
  }
}
