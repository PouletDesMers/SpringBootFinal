import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  username = '';
  email = '';
  roles: string[] = [];
  isLoggedIn = false;

  constructor(
    private auth: Auth,
    private router: Router,
  ) {}

  ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.username = this.auth.getUsername() || '';
    this.roles = this.auth.getRoles();
    this.isLoggedIn = true;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
