export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  created_at: string;
  is_active: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface AuthResponse {
  message: string;
  access_token: string;
  user: User;
}

export interface ApiError {
  error: string;
}
