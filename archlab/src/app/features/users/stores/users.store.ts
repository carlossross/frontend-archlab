import { computed, Injectable, signal } from '@angular/core';
import { mapUsersDtoToUsers, User, UserDto } from '../../../domain';

const MOCK_USERS_DTO: UserDto[] = [
  { id: 1, full_name: 'Ada Lovelace', email_address: 'ada@example.com' },
  { id: 2, full_name: 'Alan Turing', email_address: 'alan@example.com' },
  { id: 3, full_name: 'Grace Hopper', email_address: 'grace@example.com' },
];

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  // Domain state
  private readonly _users = signal<User[]>([]);
  private readonly _selectedUserId = signal<number | null>(null);

  // UI state
  private readonly _loding = signal(false);
  private readonly _error = signal<string | null>(null);

  // Exposición readonly (SSOT)
  readonly users = this._users.asReadonly();
  readonly selectedUserId = this._selectedUserId.asReadonly();
  readonly loading = this._loding.asReadonly();
  readonly error = this._error.asReadonly();

  // Derivado
  readonly selectedUser = computed(() => {
    const id = this._selectedUserId();
    return this._users().find((user) => user.id === id) ?? null;
  });

  loadUsers() {
    // HttpClient -> DTO[] -> mapper
    this._loding.set(true);
    this._error.set(null);

    try {
      const dtos = MOCK_USERS_DTO;
      const users = mapUsersDtoToUsers(dtos);
      this._users.set(users);
    } catch (e) {
      this._error.set('Error loading users');
    } finally {
      this._loding.set(false);
    }
  }

  selectUser(id: number | null) {
    this._selectedUserId.set(id);
  }
}
