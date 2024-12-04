import api from './api';
import { LoginData, RegisterData, AuthResponse, User } from '../types/auth';

export const login = async (data: LoginData) => {
  const formData = new FormData();
  formData.append('username', data.email);
  formData.append('password', data.password);
  
  const response = await api.post<AuthResponse>('/login', formData);
  return response.data;
};

export const register = async (data: RegisterData) => {
  const response = await api.post<User>('/register', data);
  return response.data;
};