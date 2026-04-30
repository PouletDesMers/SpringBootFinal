import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Auth } from './auth';

export interface OrderResponse {
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
export class Order {
  private apiUrl = '/api/orders';

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

  async create(productId: number, quantite: number): Promise<OrderResponse> {
    return firstValueFrom(
      this.http.post<OrderResponse>(
        this.apiUrl,
        { productId, quantite },
        { headers: this.getHeaders() },
      ),
    );
  }

  async getMyOrders(): Promise<OrderResponse[]> {
    return firstValueFrom(
      this.http.get<OrderResponse[]>(`${this.apiUrl}/my-orders`, {
        headers: this.getHeaders(),
      }),
    );
  }
}
