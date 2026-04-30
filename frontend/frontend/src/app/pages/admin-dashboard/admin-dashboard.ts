import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Admin } from '../../services/admin';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard implements OnInit {
  totalUsers = 0;
  totalProducts = 0;
  totalOrders = 0;
  loading = true;
  error = '';

  constructor(private admin: Admin) {}

  async ngOnInit() {
    try {
      const users = await this.admin.getUsers();
      this.totalUsers = users.length;

      const productsRes = await this.admin.getProducts(0, 1);
      this.totalProducts = productsRes.totalElements ?? 0;

      const orders = await this.admin.getOrders();
      this.totalOrders = orders.length;
    } catch (err: any) {
      this.error = err.message || 'Erreur lors du chargement des statistiques';
    } finally {
      this.loading = false;
    }
  }
}
