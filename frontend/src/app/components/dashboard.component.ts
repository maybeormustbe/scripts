import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="container mt-4">
      <div class="row">
        <div class="col-12">
          <h2>Welcome to your Dashboard</h2>
          <p class="text-muted">You are successfully logged in!</p>
        </div>
      </div>

      <div class="row mt-4" *ngIf="currentUser">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h5 class="mb-0">Your Profile</h5>
            </div>
            <div class="card-body">
              <p><strong>Name:</strong> {{ currentUser.first_name }} {{ currentUser.last_name }}</p>
              <p><strong>Email:</strong> {{ currentUser.email }}</p>
              <p><strong>Member since:</strong> {{ formatDate(currentUser.created_at) }}</p>
              <p><strong>Status:</strong> 
                <span class="badge" [class]="currentUser.is_active ? 'bg-success' : 'bg-danger'">
                  {{ currentUser.is_active ? 'Active' : 'Inactive' }}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h5 class="mb-0">Quick Actions</h5>
            </div>
            <div class="card-body">
              <div class="d-grid gap-2">
                <button class="btn btn-outline-primary" routerLink="/users">
                  View All Users
                </button>
                <button class="btn btn-outline-secondary" routerLink="/profile">
                  Edit Profile
                </button>
                <button class="btn btn-outline-info" (click)="refreshProfile()">
                  <span *ngIf="loading" class="loading-spinner me-2"></span>
                  Refresh Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="alert alert-info mt-4">
        <h6>Application Features:</h6>
        <ul class="mb-0">
          <li>JWT-based authentication</li>
          <li>User registration and login</li>
          <li>Protected routes with authentication guards</li>
          <li>Flask backend with SQLite database</li>
          <li>Bootstrap responsive design</li>
        </ul>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;
  loading = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  refreshProfile(): void {
    this.loading = true;
    this.authService.getProfile().subscribe({
      next: (response) => {
        this.currentUser = response.user;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error refreshing profile:', error);
        this.loading = false;
      }
    });
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }
}
