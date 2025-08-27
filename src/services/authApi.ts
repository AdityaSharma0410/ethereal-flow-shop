import { api } from './api';
import type { User } from '@/types/product';

export interface LoginRequest { email: string; password: string; otp?: string }
export interface SignupRequest { name: string; email: string; password: string }
export interface LoginResponse { user: User; token: string; refreshToken?: string }
export interface RefreshResponse { token: string }

export const AuthAPI = {
  login: (req: LoginRequest) => api.post<LoginResponse>('/auth/login', req).then(r => r.data),
  signup: (req: SignupRequest) => api.post<LoginResponse>('/auth/signup', req).then(r => r.data),
  me: () => api.get<User>('/auth/me').then(r => r.data),
  refresh: (refreshToken: string) => api.post<RefreshResponse>('/auth/refresh', { refreshToken }).then(r => r.data),
  logout: () => api.post<void>('/auth/logout', {}).then(r => r.data),
  enable2FA: () => api.post<{ qrCodeUrl: string; secret: string }>('/auth/2fa/enable', {}).then(r => r.data),
  verify2FA: (otp: string) => api.post<void>('/auth/2fa/verify', { otp }).then(r => r.data),
  disable2FA: () => api.post<void>('/auth/2fa/disable', {}).then(r => r.data),
};

export default AuthAPI;


