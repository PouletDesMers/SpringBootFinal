import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { ProductDetail } from './pages/product-detail/product-detail';
import { Profile } from './pages/profile/profile';
import { MyOrders } from './pages/my-orders/my-orders';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';
import { AdminProducts } from './pages/admin-products/admin-products';
import { AdminUsers } from './pages/admin-users/admin-users';
import { AdminOrders } from './pages/admin-orders/admin-orders';
import { AdminCategories } from './pages/admin-categories/admin-categories';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'products/:id', component: ProductDetail },
  { path: 'profile', component: Profile },
  { path: 'my-orders', component: MyOrders },
  { path: 'admin', component: AdminDashboard },
  { path: 'admin/products', component: AdminProducts },
  { path: 'admin/users', component: AdminUsers },
  { path: 'admin/orders', component: AdminOrders },
  { path: 'admin/categories', component: AdminCategories },
];
