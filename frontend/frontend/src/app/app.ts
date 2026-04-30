import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from './services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  isLoggedIn = false;
  isAdmin = false;
  username = '';

  constructor(private auth: Auth, private router: Router) {}

  ngOnInit() {
    this.updateAuthState();
  }

  updateAuthState() {
    this.isLoggedIn = this.auth.isLoggedIn();
    this.isAdmin = this.auth.isAdmin();
    this.username = this.auth.getUsername() || '';
  }

  logout() {
    this.auth.logout();
    this.updateAuthState();
    this.router.navigate(['/']);
  }
}
