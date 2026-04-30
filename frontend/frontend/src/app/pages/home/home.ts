import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Product, ProductResponse } from '../../services/product';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  products: ProductResponse[] = [];
  keyword = '';
  currentPage = 0;
  pageSize = 8;
  totalPages = 0;
  totalElements = 0;
  loading = false;
  error = '';

  constructor(
    public productService: Product,
    public auth: Auth,
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  async loadProducts() {
    this.loading = true;
    this.error = '';
    try {
      let data: any;
      if (this.keyword.trim()) {
        data = await this.productService.search(this.keyword, this.currentPage, this.pageSize);
      } else {
        data = await this.productService.getAll(this.currentPage, this.pageSize, 'id', 'asc');
      }
      this.products = data.content || [];
      this.totalPages = data.totalPages || 0;
      this.totalElements = data.totalElements || 0;
    } catch (e: any) {
      this.error = e.message || 'Erreur lors du chargement des produits';
    } finally {
      this.loading = false;
    }
  }

  onSearch() {
    this.currentPage = 0;
    this.loadProducts();
  }

  goToPage(page: number) {
    if (page < 0 || page >= this.totalPages) return;
    this.currentPage = page;
    this.loadProducts();
  }

  get pages(): number[] {
    const pages: number[] = [];
    const start = Math.max(0, this.currentPage - 2);
    const end = Math.min(this.totalPages, this.currentPage + 3);
    for (let i = start; i < end; i++) {
      pages.push(i);
    }
    return pages;
  }
}
