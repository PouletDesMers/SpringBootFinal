import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface ProductResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryName: string | null;
  categoryId: number | null;
  stockQuantity: number;
  lienImage: string;
}

@Injectable({
  providedIn: 'root',
})
export class Product {
  private apiUrl = '/api/products';

  constructor(private http: HttpClient) {}

  async getAll(page = 0, size = 10, sortBy = 'id', sortDir = 'asc'): Promise<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('sortDir', sortDir);

    return firstValueFrom(this.http.get<any>(this.apiUrl, { params }));
  }

  async getById(id: number): Promise<ProductResponse> {
    return firstValueFrom(this.http.get<ProductResponse>(`${this.apiUrl}/${id}`));
  }

  async search(keyword: string, page = 0, size = 10): Promise<any> {
    const params = new HttpParams()
      .set('keyword', keyword)
      .set('page', page.toString())
      .set('size', size.toString());

    return firstValueFrom(this.http.get<any>(`${this.apiUrl}/search`, { params }));
  }
}
