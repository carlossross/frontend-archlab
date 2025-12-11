// src/app/core/auth/auth.store.ts
import { Injectable, computed, signal } from '@angular/core';

export interface AuthUser {
  id: number;
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthStore {
  // 🔹 Domain-ish state (auth)
  private readonly _user = signal<AuthUser | null>(null);
  private readonly _token = signal<string | null>(null);

  // 🔹 UI-ish state
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  // readonly exposiciones
  readonly user = this._user.asReadonly();
  readonly token = this._token.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  // derivado: ¿hay sesión?
  readonly isAuthenticated = computed(() => !!this._token());

  // En un mundo real esto llamaría a HttpClient
  async loginDemo(): Promise<void> {
    this._loading.set(true);
    this._error.set(null);

    try {
      // Simulación de login asíncrono
      await new Promise((resolve) => setTimeout(resolve, 400));

      this._user.set({
        id: 1,
        name: 'Demo User',
        email: 'demo@example.com',
      });
      this._token.set('demo-token-123'); // aquí vendría el token del backend
    } catch (e) {
      this._error.set('Error al iniciar sesión');
    } finally {
      this._loading.set(false);
    }
  }

  logout() {
    this._user.set(null);
    this._token.set(null);
  }
}
