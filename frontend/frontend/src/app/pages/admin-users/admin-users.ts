import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Admin, UserResponse } from '../../services/admin';

@Component({
  selector: 'app-admin-users',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.css',
})
export class AdminUsers implements OnInit {
  users: UserResponse[] = [];
  loading = true;
  error = '';

  showModal = false;
  selectedUser: UserResponse | null = null;
  editableRoles = '';
  saving = false;

  constructor(private admin: Admin) {}

  async ngOnInit() {
    await this.loadUsers();
  }

  async loadUsers() {
    try {
      this.loading = true;
      this.users = await this.admin.getUsers();
    } catch (err: any) {
      this.error = err.message || 'Erreur lors du chargement des utilisateurs';
    } finally {
      this.loading = false;
    }
  }

  openEditRolesModal(user: UserResponse) {
    this.selectedUser = user;
    this.editableRoles = user.roles.join(', ');
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedUser = null;
    this.editableRoles = '';
  }

  async saveRoles() {
    if (!this.selectedUser) return;

    const rolesArray = this.editableRoles
      .split(',')
      .map((r) => r.trim().toUpperCase())
      .filter((r) => r.length > 0);

    try {
      this.saving = true;
      await this.admin.updateUser(this.selectedUser.id, { roles: rolesArray });
      this.closeModal();
      await this.loadUsers();
    } catch (err: any) {
      this.error = err.message || 'Erreur lors de la mise à jour des rôles';
    } finally {
      this.saving = false;
    }
  }
}
