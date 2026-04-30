import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Admin } from '../../services/admin';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryName: string | null;
  categoryId: number | null;
  stockQuantity: number;
  lienImage: string;
}

@Component({
  selector: 'app-admin-products',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-products.html',
  styleUrl: './admin-products.css',
})
export class AdminProducts implements OnInit {
  products: Product[] = [];
  loading = true;
  error = '';

  showModal = false;
  editMode = false;
  currentProduct: Partial<Product> = {};
  saving = false;

  constructor(private admin: Admin) {}

  async ngOnInit() {
    await this.loadProducts();
  }

  async loadProducts() {
    try {
      this.loading = true;
      const res = await this.admin.getProducts(0, 1000);
      this.products = res.content ?? [];
    } catch (err: any) {
      this.error = err.message || 'Erreur lors du chargement des produits';
    } finally {
      this.loading = false;
    }
  }

  openCreateModal() {
    this.editMode = false;
    this.currentProduct = { name: '', description: '', price: 0, stockQuantity: 0, lienImage: '' };
    this.showModal = true;
  }

  openEditModal(product: Product) {
    this.editMode = true;
    this.currentProduct = { ...product };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.currentProduct = {};
  }

  async saveProduct() {
    if (!this.currentProduct.name || !this.currentProduct.price) return;

    try {
      this.saving = true;
      const data = {
        name: this.currentProduct.name,
        description: this.currentProduct.description || '',
        price: this.currentProduct.price,
        stockQuantity: this.currentProduct.stockQuantity || 0,
        lienImage: this.currentProduct.lienImage || '',
      };

      if (this.editMode && this.currentProduct.id) {
        await this.admin.updateProduct(this.currentProduct.id, data);
      } else {
        await this.admin.createProduct(data);
      }

      this.closeModal();
      await this.loadProducts();
    } catch (err: any) {
      this.error = err.message || 'Erreur lors de la sauvegarde du produit';
    } finally {
      this.saving = false;
    }
  }

  async deleteProduct(id: number) {
    if (!confirm('Supprimer ce produit définitivement ?')) return;

    try {
      await this.admin.deleteProduct(id);
      await this.loadProducts();
    } catch (err: any) {
      this.error = err.message || 'Erreur lors de la suppression';
    }
  }
}
