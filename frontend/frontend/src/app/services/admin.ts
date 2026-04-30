import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Auth } from './auth';

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  roles: string[];
  enabled: boolean;
  createdAt: string;
}

export interface OrderAdminResponse {
  id: number;
  username: string;
  orderDate: string;
  totalAmount: number;
  status: string;
  productName: string;
  productId: number;
  quantite: number;
  productPrice: number;
}

@Injectable({
  providedIn: 'root',
})
export class Admin {
  private apiUrl = '/api/admin';

  constructor(
    private http: HttpClient,
    private auth: Auth,
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.auth.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    });
  }

  // ===== PRODUITS =====
  async getProducts(page = 0, size = 10): Promise<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return firstValueFrom(
      this.http.get<any>(`${this.apiUrl}/products`, { headers: this.getHeaders(), params }),
    );
  }

  async createProduct(data: any): Promise<any> {
    return firstValueFrom(
      this.http.post<any>(`${this.apiUrl}/products`, data, { headers: this.getHeaders() }),
    );
  }

  async updateProduct(id: number, data: any): Promise<any> {
    return firstValueFrom(
      this.http.put<any>(`${this.apiUrl}/products/${id}`, data, { headers: this.getHeaders() }),
    );
  }

  async deleteProduct(id: number): Promise<void> {
    return firstValueFrom(
      this.http.delete<void>(`${this.apiUrl}/products/${id}`, { headers: this.getHeaders() }),
    );
  }

  // ===== UTILISATEURS =====
  async getUsers(): Promise<UserResponse[]> {
    return firstValueFrom(
      this.http.get<UserResponse[]>(`${this.apiUrl}/users`, { headers: this.getHeaders() }),
    );
  }

  async getUser(id: number): Promise<UserResponse> {
    return firstValueFrom(
      this.http.get<UserResponse>(`${this.apiUrl}/users/${id}`, { headers: this.getHeaders() }),
    );
  }

  async updateUser(id: number, data: any): Promise<UserResponse> {
    return firstValueFrom(
      this.http.put<UserResponse>(`${this.apiUrl}/users/${id}`, data, { headers: this.getHeaders() }),
    );
  }

  // ===== COMMANDES =====
  async getOrders(): Promise<OrderAdminResponse[]> {
    return firstValueFrom(
      this.http.get<OrderAdminResponse[]>(`${this.apiUrl}/orders`, { headers: this.getHeaders() }),
    );
  }
}
