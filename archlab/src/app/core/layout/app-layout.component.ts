import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'arch-app-layout',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <div class="app-shell">
      <aside class="sidebar">
        <h1 class="logo">ArchLab</h1>
        <nav class="nav">
          <a routerLink="/dashboard" routerLinkActive="active"></a>
          <a routerLink="/users" routerLinkActive="active"></a>
          <a routerLink="/sales" routerLinkActive="active"></a>
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
        grid-template-columns: 240px 1fr;
      }
      .sidebar {
        padding: 1rem;
        border-right: 1px solid #333;
      }
      .logo {
        font-size: 1.4rem;
        margin-bottom: 1rem;
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
export class AppLayoutComponent {}
