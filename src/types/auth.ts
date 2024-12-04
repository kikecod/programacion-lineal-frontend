export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {}

export interface User {
  id: number;
  email: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}