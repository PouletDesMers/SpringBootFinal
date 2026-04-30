import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product, ProductResponse } from '../../services/product';
import { Order } from '../../services/order';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit {
  product: ProductResponse | null = null;
  quantite = 1;
  loading = true;
  error = '';
  orderSuccess = '';
  orderError = '';
  ordering = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: Product,
    private orderService: Order,
    public auth: Auth,
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.error = 'Produit non trouve';
      this.loading = false;
      return;
    }
    this.loadProduct(id);
  }

  async loadProduct(id: number) {
    try {
      this.product = await this.productService.getById(id);
    } catch (e: any) {
      this.error = e.message || 'Erreur lors du chargement du produit';
    } finally {
      this.loading = false;
    }
  }

  async placeOrder() {
    if (!this.product || this.quantite < 1) return;
    this.orderError = '';
    this.orderSuccess = '';
    this.ordering = true;
    try {
      await this.orderService.create(this.product.id, this.quantite);
      this.orderSuccess = 'Commande passee avec succes !';
      this.quantite = 1;
    } catch (e: any) {
      this.orderError = e.message || 'Erreur lors de la commande';
    } finally {
      this.ordering = false;
    }
  }
}
