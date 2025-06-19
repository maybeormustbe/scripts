import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-users',
  template: `
    <div class="container mt-4">
      <div class="row">
        <div class="col-12">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h2>All Users</h2>
            <button class="btn btn-primary" (click)="loadUsers()">
              <span *ngIf="loading" class="loading-spinner me-2"></span>
              Refresh
            </button>
          </div>

          <div class="alert alert-danger" *ngIf="error">
            {{ error }}
          </div>

          <div class="card" *ngIf="!loading && users.length > 0">
            <div class="card-header">
              <h5 class="mb-0">Registered Users ({{ totalUsers }})</h5>
            </div>
            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-striped mb-0">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let user of users">
                      <td>{{ user.id }}</td>
                      <td>{{ user.first_name }} {{ user.last_name }}</td>
                      <td>{{ user.email }}</td>
                      <td>
                        <span class="badge" [class]="user.is_active ? 'bg-success' : 'bg-danger'">
                          {{ user.is_active ? 'Active' : 'Inactive' }}
                        </span>
                      </td>
                      <td>{{ formatDate(user.created_at) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="text-center mt-4" *ngIf="loading">
            <div class="loading-spinner me-2"></div>
            Loading users...
          </div>

          <div class="alert alert-info" *ngIf="!loading && users.length === 0 && !error">
            No users found.
          </div>
        </div>
      </div>
    </div>
  `
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  totalUsers = 0;
  loading = false;
  error = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.error = '';

    this.authService.getUsers().subscribe({
      next: (response) => {
        this.users = response.users;
        this.totalUsers = response.total;
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
      }
    });
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }
}
