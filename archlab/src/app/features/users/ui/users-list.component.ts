import { Component, input } from '@angular/core';

interface UserVm {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'arch-users-list',
  imports: [],
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
        <tr>
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
    `,
  ],
})
export class UsersListComponent {
  users = input.required<UserVm[]>();
}
