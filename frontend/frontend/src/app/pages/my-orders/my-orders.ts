import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Order, OrderResponse } from '../../services/order';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-my-orders',
  imports: [CommonModule, RouterLink],
  templateUrl: './my-orders.html',
  styleUrl: './my-orders.css',
})
export class MyOrders implements OnInit {
  orders: OrderResponse[] = [];
  loading = true;
  error = '';

  constructor(
    private orderService: Order,
    private auth: Auth,
  ) {}

  ngOnInit() {
    this.loadOrders();
  }

  async loadOrders() {
    this.loading = true;
    this.error = '';
    try {
      this.orders = await this.orderService.getMyOrders();
    } catch (e: any) {
      this.error = e.message || 'Erreur lors du chargement des commandes';
    } finally {
      this.loading = false;
    }
  }

  getStatusClass(status: string): string {
    switch (status?.toUpperCase()) {
      case 'EN_ATTENTE': return 'status-pending';
      case 'CONFIRMEE': return 'status-confirmed';
      case 'EN_COURS': return 'status-processing';
      case 'EXPEDIEE': return 'status-shipped';
      case 'LIVREE': return 'status-delivered';
      case 'ANNULEE': return 'status-cancelled';
      default: return 'status-default';
    }
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return d.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
