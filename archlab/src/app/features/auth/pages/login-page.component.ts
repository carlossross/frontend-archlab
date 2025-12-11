// src/app/features/auth/login-page.component.ts
import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ArchCardComponent } from '../../../shared';
import { AuthStore } from '../../../core';

@Component({
  selector: 'arch-login-page',
  standalone: true,
  imports: [ArchCardComponent],
  template: `
    <section class="login-page">
      <arch-card [title]="'Login demo'" [subtitle]="'AuthStore + guards con signals'">
        <p class="hint">
          Este login es solo de demo. Al autenticarte, podrás acceder a Dashboard, Users y Sales.
        </p>

        <button type="button" (click)="onLogin()" [disabled]="vm().loading">
          {{ vm().loading ? 'Ingresando...' : 'Login demo' }}
        </button>

        @if(vm().error){
        <p class="error">
          {{ vm().error }}
        </p>
        }

        <div card-footer>
          <small>Estado: {{ vm().isAuthenticated ? 'Autenticado' : 'No autenticado' }}</small>
        </div>
      </arch-card>
    </section>
  `,
  styles: [
    `
      .login-page {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding-top: 3rem;
      }
      .hint {
        margin-bottom: 1rem;
        font-size: 0.9rem;
        opacity: 0.85;
      }
      .error {
        margin-top: 0.5rem;
        color: #ff6b6b;
        font-size: 0.85rem;
      }
    `,
  ],
})
export class LoginPageComponent {
  private readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);

  readonly vm = computed(() => ({
    loading: this.authStore.loading(),
    error: this.authStore.error(),
    isAuthenticated: this.authStore.isAuthenticated(),
  }));

  async onLogin() {
    await this.authStore.loginDemo();
    if (this.authStore.isAuthenticated()) {
      this.router.navigateByUrl('/dashboard');
    }
  }
}
