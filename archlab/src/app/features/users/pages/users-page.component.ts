import { Component, computed, inject, signal } from '@angular/core';
import { UsersListComponent } from '../ui/users-list.component';
import { UserStore } from '../users.store';

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

      @if (vm().isLoading) {
      <p>Cargando Usuarios...</p>
      } @else if(vm().error) {
      <p class="error">{{ vm().error }}</p>
      }@else {
      <arch-users-list
        [users]="vm().users"
        [selectedUserId]="vm().selectedUserId"
        (selectUser)="onSelectUser($event)"
      ></arch-users-list>
      }
    </section>
  `,
  styles: [
    `
      .page-header {
        margin-bottom: 1rem;
      }
      .error {
        color: #ff6b6b;
        margin-bottom: 0.75rem;
      }
    `,
  ],
})
export class UsersPageComponent {
  private readonly usersStore = inject(UserStore);

  constructor() {
    this.usersStore.loadUsers();
  }

  readonly vm = computed(() => ({
    users: this.usersStore.users(),
    isLoading: this.usersStore.loading(),
    error: this.usersStore.error(),
    selectedUserId: this.usersStore.selectedUserId(),
  }));

  onSelectUser(id: number) {
    this.usersStore.selectUser(id);
  }
}
