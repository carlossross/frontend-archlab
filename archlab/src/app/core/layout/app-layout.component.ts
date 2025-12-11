import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthStore } from '../auth/auth.store';

@Component({
  selector: 'arch-app-layout',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <div class="app-shell">
      <aside class="sidebar">
        <h1 class="logo">ArchLab</h1>

        <div class="auth-box">
          @if ( authVm().isAuthenticated ) {

          <p class="auth-user">
            {{ authVm().userName }}
          </p>
          <button type="button" (click)="onLogout()">Logout</button>

          } @else{
          <p class="auth-user auth-user--anon">Not logged in</p>
          <button type="button" (click)="onLoginDemo()" [disabled]="authVm().loading">
            {{ authVm().loading ? 'Logging in...' : 'Login demo' }}
          </button>
          @if(authVm().error){
          <p class="auth-error">
            {{ authVm().error }}
          </p>
          } }
        </div>

        <nav class="nav">
          <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
          <a routerLink="/users" routerLinkActive="active">Users</a>
          <a routerLink="/sales" routerLinkActive="active">Sales</a>
        </nav>
      </aside>

      <main class="content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [
    `
      .app-shell {
        min-height: 100vh;
        display: grid;
        grid-template-columns: 260px 1fr;
      }
      .sidebar {
        padding: 1rem;
        border-right: 1px solid #333;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .logo {
        font-size: 1.4rem;
        margin-bottom: 0.5rem;
      }
      .auth-box {
        padding: 0.75rem;
        border-radius: 0.5rem;
        border: 1px solid rgba(255, 255, 255, 0.1);
        font-size: 0.85rem;
      }
      .auth-user {
        margin: 0 0 0.5rem;
        font-weight: 500;
      }
      .auth-user--anon {
        opacity: 0.8;
      }
      .auth-error {
        margin-top: 0.25rem;
        color: #ff6b6b;
      }
      .nav a {
        display: block;
        margin-bottom: 0.5rem;
        text-decoration: none;
      }
      .nav a.active {
        font-weight: 600;
        text-decoration: underline;
      }
      .content {
        padding: 1.5rem;
      }
    `,
  ],
})
export class AppLayoutComponent {
  private readonly authStore = inject(AuthStore);

  readonly authVm = computed(() => ({
    isAuthenticated: this.authStore.isAuthenticated(),
    userName: this.authStore.user()?.name ?? 'Anonymous',
    loading: this.authStore.loading(),
    error: this.authStore.error(),
  }));

  async onLoginDemo() {
    await this.authStore.loginDemo();
  }

  onLogout() {
    this.authStore.logout();
  }
}
