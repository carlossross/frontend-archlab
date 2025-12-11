import { Component, input } from '@angular/core';

@Component({
  selector: 'arch-card',
  imports: [],
  template: `
    <section class="arch-card">
      @if (title() || subtitle()) {

      <header class="arch-card__header">
        @if(title()){
        <h3 class="arch-card__title">
          {{ title() }}
        </h3>
        } @if(subtitle()){
        <p class="arch-card__subtitle">
          {{ subtitle() }}
        </p>
        }
      </header>
      }

      <div class="arch-card__body">
        <ng-content></ng-content>
      </div>

      @if(hasFooter()){
      <footer class="arch-card__footer">
        <ng-content select="[card-footer]"></ng-content>
      </footer>
      }
    </section>
  `,
  styles: [
    `
      .arch-card {
        border-radius: 0.75rem;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: radial-gradient(circle at top left, rgba(255, 255, 255, 0.06), transparent);
        padding: 1rem 1.25rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      }

      .arch-card__header {
        margin-bottom: 0.75rem;
      }

      .arch-card__title {
        font-size: 1.1rem;
        font-weight: 600;
        margin: 0;
      }

      .arch-card__subtitle {
        margin: 0.15rem 0 0;
        font-size: 0.9rem;
        opacity: 0.7;
      }

      .arch-card__body {
        font-size: 0.95rem;
      }

      .arch-card__footer {
        margin-top: 0.75rem;
        padding-top: 0.5rem;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        font-size: 0.85rem;
        opacity: 0.8;
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;
      }
    `,
  ],
})
export class ArchCardComponent {
  // UI-only, así que usamos input() normal
  title = input<string>('');
  subtitle = input<string>('');

  // truco simple: si hay contenido proyectado en [card-footer]
  hasFooter(): boolean {
    // Angular no da una forma simple sin ViewChild, pero para el demo
    // te dejo el hook para extenderlo después si quieres.
    return true;
  }
}
