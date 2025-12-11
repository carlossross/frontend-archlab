import { Component, computed, inject, signal } from '@angular/core';
import { UsersListComponent } from '../ui/users-list.component';
import { UserStore } from '../stores/users.store';
import { UsersFiltersStore } from '../stores/users-filters.store';
import { ArchCardComponent } from '../../../shared';

@Component({
  selector: 'arch-users-page',
  imports: [UsersListComponent, ArchCardComponent],
  providers: [UsersFiltersStore],
  template: `
    <section>
      <header class="page-header">
        <h2>Users</h2>
        <p>Feature-based + ViewModel pattern + component store demo</p>
      </header>
      <arch-card [title]="'Users list'" [subtitle]="'Feature store + component store + smart/dumb'">
        <div class="toolbar">
          <label>
            Search:
            <input
              type="text"
              [value]="vm().search"
              (input)="onSearchChange($any($event.target).value)"
              placeholder="Filter by name or email"
            />
          </label>

          <button type="button" (click)="onClearSearch()">Clear</button>
        </div>

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
        <div card-footer>
          <span>Total: {{ vm().users.length }} users</span>
        </div>
      </arch-card>
    </section>
  `,
  styles: [
    `
      .page-header {
        margin-bottom: 1rem;
      }
      .toolbar {
        display: flex;
        gap: 0.75rem;
        align-items: center;
        margin-bottom: 1rem;
      }
      .toolbar input {
        padding: 0.25rem 0.5rem;
        min-width: 220px;
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
  private readonly filtersStore = inject(UsersFiltersStore);

  constructor() {
    this.usersStore.loadUsers();
  }

  readonly vm = computed(() => {
    const users = this.usersStore.users();
    const search = this.filtersStore.search().toLowerCase().trim();

    const filteredUsers = !search
      ? users
      : users.filter(
          (user) =>
            user.name.toLowerCase().includes(search) || user.email.toLowerCase().includes(search)
        );

    return {
      users: filteredUsers,
      selectedUserId: this.usersStore.selectedUserId(),
      search,
      isLoading: this.usersStore.loading(),
      error: this.usersStore.error(),
    };
  });

  onSelectUser(id: number) {
    this.usersStore.selectUser(id);
  }

  onSearchChange(value: string) {
    this.filtersStore.setSearch(value);
  }

  onClearSearch() {
    this.filtersStore.clear();
  }
}
