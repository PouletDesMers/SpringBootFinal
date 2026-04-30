import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { firstValueFrom } from 'rxjs';

export interface AuthResponse {
  token: string;
  username: string;
  email: string;
  roles: string[];
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl = '/api/auth';
  private tokenKey = 'auth_token';
  private usernameKey = 'auth_username';
  private rolesKey = 'auth_roles';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  async register(username: string, email: string, password: string): Promise<AuthResponse> {
    const data: AuthResponse = await firstValueFrom(
      this.http.post<AuthResponse>(`${this.apiUrl}/register`, { username, email, password }),
    );
    this.saveSession(data);
    return data;
  }

  async login(username: string, password: string): Promise<AuthResponse> {
    const data: AuthResponse = await firstValueFrom(
      this.http.post<AuthResponse>(`${this.apiUrl}/login`, { username, password }),
    );
    this.saveSession(data);
    return data;
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.usernameKey);
      localStorage.removeItem(this.rolesKey);
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  getUsername(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.usernameKey);
    }
    return null;
  }

  getRoles(): string[] {
    if (isPlatformBrowser(this.platformId)) {
      const roles = localStorage.getItem(this.rolesKey);
      return roles ? JSON.parse(roles) : [];
    }
    return [];
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    return this.getRoles().includes('ADMIN');
  }

  private saveSession(data: AuthResponse): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.tokenKey, data.token);
      localStorage.setItem(this.usernameKey, data.username);
      localStorage.setItem(this.rolesKey, JSON.stringify(data.roles));
    }
  }
}
