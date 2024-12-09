import { importProvidersFrom } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Admin Dashboard Components
import { AdminReportsComponent } from './adminDashboard/admin-reports/admin-reports.component';
import { AdminStatsComponent } from './adminDashboard/admin-stats/admin-stats.component';
import { AdminUserListComponent } from './adminDashboard/admin-user-list/admin-user-list.component';
import { GstInvoiceComponent } from './adminDashboard/gst-invoice/gst-invoice.component';

// Authentication Components
import { LoginComponent } from './features/auth/components/login/login.component';
import { ResetPasswordComponent } from './features/auth/components/reset-password/reset-password.component';
import { SignupComponent } from './features/auth/components/signup/signup.component';
import { UpdatePasswordComponent } from './features/auth/components/update-password/update-password.component';

// Dashboard Layout Components
import { MainDashboardComponent } from './layouts/main-dashboard/main-dashboard.component';
import { HomePageComponent } from './layouts/dashboard/home-page/home-page.component';
import { HomePage1Component } from './layouts/dashboard/home-page1/home-page1.component';

// Cart Components
import { CartViewComponent } from './features/cart/components/cart-view/cart-view.component';

// Checkout Components
import { CheckoutPageComponent } from './features/checkout/components/checkout-page/checkout-page.component';

// Orders Components
import { OrderDetailComponent } from './features/orders/components/order-detail/order-detail.component';
import { OrderListComponent } from './features/orders/components/order-list/order-list.component';

// Products Components
import { ProductDetailComponent } from './features/products/components/product-detail/product-detail.component';
import { ProductListComponent } from './features/products/components/product-list/product-list.component';

// Layout Components
import { HeaderComponent } from './layouts/header/header.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { FooterComponent } from './layouts/footer/footer.component';

export const routes: Routes = [
  // Authentication Routes
  // { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },

  // { path: '', component: HeaderComponent },

  { path: 'signup', component: SignupComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'update-password', component: UpdatePasswordComponent },

  // Dashboard Routes
  { path: 'dashboard', component: MainDashboardComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'home-page1', component: HomePage1Component },

  // Admin Dashboard Routes
  { path: 'admin/reports', component: AdminReportsComponent },
  { path: 'admin/stats', component: AdminStatsComponent },
  { path: 'admin/users', component: AdminUserListComponent },
  { path: 'admin/gst-invoice', component: GstInvoiceComponent },

  // Cart Routes
  { path: 'cart', component: CartViewComponent },

  // Checkout Routes
  { path: 'checkout', component: CheckoutPageComponent },

  // Orders Routes
  { path: 'orders', component: OrderListComponent },
  { path: 'orders/:id', component: OrderDetailComponent },

  // Products Routes
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailComponent },

  // Layout Components
  { path: 'header', component: HeaderComponent },
  { path: 'sidebar', component: SidebarComponent },
  { path: 'footer', component: FooterComponent },

  // Wildcard Route for 404 Page
  { path: '**', redirectTo: '' },
];

export const routingProviders = [];

export const RoutingModule = importProvidersFrom(RouterModule.forRoot(routes));
