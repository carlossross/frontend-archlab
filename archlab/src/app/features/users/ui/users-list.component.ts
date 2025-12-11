import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';

interface UserVm {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'arch-users-list',
  imports: [NgClass],
  template: `
    <table class="users-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>

      <tbody>
        @for (user of users(); track user.id) {
        <tr
          [ngClass]="{ 'is-selected': user.id === selectedUserId() }"
          (click)="onRowClick(user.id)"
        >
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
        </tr>
        }
      </tbody>
    </table>
  `,
  styles: [
    `
      .users-table {
        width: 100%;
        border-collapse: collapse;
      }
      .users-table th,
      .users-table td {
        border-bottom: 1px solid #333;
        padding: 0.5rem;
        text-align: left;
      }
      .users-table thead tr {
        background: rgba(255, 255, 255, 0.04);
      }
      .users-table tr {
        cursor: pointer;
      }
      .users-table tr.is-selected {
        background: rgba(255, 255, 255, 0.06);
        font-weight: 600;
      }
    `,
  ],
})
export class UsersListComponent {
  users = input.required<UserVm[]>();
  selectedUserId = input<number | null>(null);

  selectUser = output<number>();

  onRowClick(id: number) {
    this.selectUser.emit(id);
  }
}
