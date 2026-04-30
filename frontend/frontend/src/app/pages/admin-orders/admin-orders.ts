import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Admin, OrderAdminResponse } from '../../services/admin';

@Component({
  selector: 'app-admin-orders',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-orders.html',
  styleUrl: './admin-orders.css',
})
export class AdminOrders implements OnInit {
  orders: OrderAdminResponse[] = [];
  loading = true;
  error = '';

  constructor(private admin: Admin) {}

  async ngOnInit() {
    try {
      this.loading = true;
      this.orders = await this.admin.getOrders();
    } catch (err: any) {
      this.error = err.message || 'Erreur lors du chargement des commandes';
    } finally {
      this.loading = false;
    }
  }
}
