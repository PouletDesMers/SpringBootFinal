import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-register',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  error = '';
  success = '';

  constructor(private auth: Auth, private router: Router) {}

  async onSubmit() {
    this.error = '';
    this.success = '';

    if (this.password !== this.confirmPassword) {
      this.error = 'Les mots de passe ne correspondent pas';
      return;
    }

    try {
      await this.auth.register(this.username, this.email, this.password);
      this.success = 'Inscription réussie ! Redirection...';
      setTimeout(() => this.router.navigate(['/']), 1500);
    } catch (e: any) {
      this.error = e.message;
    }
  }
}
