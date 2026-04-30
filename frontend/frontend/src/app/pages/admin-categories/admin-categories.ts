import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Auth } from '../../services/auth';

export interface Categorie {
  id: number;
  name: string;
}

@Component({
  selector: 'app-admin-categories',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-categories.html',
  styleUrl: './admin-categories.css',
})
export class AdminCategories implements OnInit {
  categories: Categorie[] = [];
  newCategoryName = '';
  loading = true;
  error = '';

  constructor(private http: HttpClient, private auth: Auth) {}

  async ngOnInit() {
    await this.loadCategories();
  }

  async loadCategories() {
    this.loading = true;
    try {
      this.categories = await firstValueFrom(
        this.http.get<Categorie[]>('/api/admin/categories', this.getHeaders())
      );
    } catch (e: any) {
      this.error = 'Erreur chargement categories';
    } finally {
      this.loading = false;
    }
  }

  async addCategory() {
    const name = this.newCategoryName.trim();
    if (!name) return;
    try {
      await firstValueFrom(
        this.http.post('/api/admin/categories', { name }, this.getHeaders())
      );
      this.newCategoryName = '';
      this.loadCategories();
    } catch (e: any) {
      this.error = 'Erreur creation categorie';
    }
  }

  async deleteCategory(id: number) {
    if (!confirm('Supprimer cette categorie ?')) return;
    try {
      await firstValueFrom(
        this.http.delete(`/api/admin/categories/${id}`, this.getHeaders())
      );
      this.loadCategories();
    } catch (e: any) {
      this.error = 'Erreur suppression categorie';
    }
  }

  private getHeaders() {
    const token = this.auth.getToken();
    return {
      headers: { Authorization: `Bearer ${token}` }
    };
  }
}
