import { Component, computed, signal } from '@angular/core';
import { UsersListComponent } from '../ui/users-list.component';

interface UserVm {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'arch-users-page',
  imports: [UsersListComponent],
  template: `
    <section>
      <header class="page-header">
        <h2>Users</h2>
        <p>Feature-based + ViewModel pattern demo</p>
      </header>

      <arch-users-list [users]="vm().users"></arch-users-list>
    </section>
  `,
  styles: [
    `
      .page-header {
        margin-bottom: 1rem;
      }
    `,
  ],
})
export class UsersPageComponent {
  private readonly users = signal<UserVm[]>([
    { id: 1, name: 'Ada Lovelace', email: 'ada@example.com' },
    { id: 2, name: 'Alan Turing', email: 'alan@example.com' },
    { id: 3, name: 'Grace Hopper', email: 'grace@example.com' },
  ]);

  readonly vm = computed(() => ({
    users: this.users(),
  }));
}
