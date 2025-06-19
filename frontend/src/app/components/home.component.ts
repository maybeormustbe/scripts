import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  template: `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-lg-8 text-center">
          <h1 class="display-4 mb-4">Welcome to Flask Angular App</h1>
          <p class="lead mb-4">
            A full-stack web application built with Flask backend, Angular frontend, 
            SQLite database, and JWT authentication.
          </p>

          <div class="row mt-5" *ngIf="!isAuthenticated">
            <div class="col-md-6 mb-3">
              <div class="card h-100">
                <div class="card-body text-center">
                  <h5 class="card-title">New User?</h5>
                  <p class="card-text">Create your account to get started with our application.</p>
                  <a routerLink="/register" class="btn btn-primary">Register Now</a>
                </div>
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <div class="card h-100">
                <div class="card-body text-center">
                  <h5 class="card-title">Existing User?</h5>
                  <p class="card-text">Sign in to access your dashboard and manage your account.</p>
                  <a routerLink="/login" class="btn btn-outline-primary">Login</a>
                </div>
              </div>
            </div>
          </div>

          <div class="alert alert-success mt-4" *ngIf="isAuthenticated">
            <h5>You're already logged in!</h5>
            <p class="mb-2">Welcome back! You can access your dashboard and explore the application features.</p>
            <a routerLink="/dashboard" class="btn btn-success">Go to Dashboard</a>
          </div>

          <div class="row mt-5">
            <div class="col-12">
              <h3>Features</h3>
              <div class="row mt-3">
                <div class="col-md-4 mb-3">
                  <div class="card">
                    <div class="card-body text-center">
                      <h6 class="card-title">🔐 Secure Authentication</h6>
                      <p class="card-text small">JWT-based authentication with secure password hashing</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 mb-3">
                  <div class="card">
                    <div class="card-body text-center">
                      <h6 class="card-title">📱 Responsive Design</h6>
                      <p class="card-text small">Bootstrap-powered responsive UI that works on all devices</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 mb-3">
                  <div class="card">
                    <div class="card-body text-center">
                      <h6 class="card-title">🐳 Docker Ready</h6>
                      <p class="card-text small">Containerized application ready for deployment</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HomeComponent {
  constructor(private authService: AuthService) {}

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated;
  }
}
