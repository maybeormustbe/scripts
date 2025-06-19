import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  template: `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h4 class="mb-0">Register</h4>
            </div>
            <div class="card-body">
              <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="firstName" class="form-label">First Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="firstName"
                      formControlName="first_name"
                      [class.is-invalid]="registerForm.get('first_name')?.invalid && registerForm.get('first_name')?.touched"
                    >
                    <div class="invalid-feedback" *ngIf="registerForm.get('first_name')?.invalid && registerForm.get('first_name')?.touched">
                      First name is required
                    </div>
                  </div>

                  <div class="col-md-6 mb-3">
                    <label for="lastName" class="form-label">Last Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="lastName"
                      formControlName="last_name"
                      [class.is-invalid]="registerForm.get('last_name')?.invalid && registerForm.get('last_name')?.touched"
                    >
                    <div class="invalid-feedback" *ngIf="registerForm.get('last_name')?.invalid && registerForm.get('last_name')?.touched">
                      Last name is required
                    </div>
                  </div>
                </div>

                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    formControlName="email"
                    [class.is-invalid]="registerForm.get('email')?.invalid && registerForm.get('email')?.touched"
                  >
                  <div class="invalid-feedback" *ngIf="registerForm.get('email')?.invalid && registerForm.get('email')?.touched">
                    <div *ngIf="registerForm.get('email')?.errors?.['required']">Email is required</div>
                    <div *ngIf="registerForm.get('email')?.errors?.['email']">Please enter a valid email</div>
                  </div>
                </div>

                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    formControlName="password"
                    [class.is-invalid]="registerForm.get('password')?.invalid && registerForm.get('password')?.touched"
                  >
                  <div class="invalid-feedback" *ngIf="registerForm.get('password')?.invalid && registerForm.get('password')?.touched">
                    <div *ngIf="registerForm.get('password')?.errors?.['required']">Password is required</div>
                    <div *ngIf="registerForm.get('password')?.errors?.['minlength']">Password must be at least 6 characters</div>
                  </div>
                </div>

                <div class="alert alert-danger" *ngIf="error">
                  {{ error }}
                </div>

                <button
                  type="submit"
                  class="btn btn-primary w-100"
                  [disabled]="registerForm.invalid || loading"
                >
                  <span *ngIf="loading" class="loading-spinner me-2"></span>
                  {{ loading ? 'Creating Account...' : 'Register' }}
                </button>
              </form>

              <div class="text-center mt-3">
                <p>Already have an account? <a routerLink="/login">Login here</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.registerForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
      }
    });
  }
}
