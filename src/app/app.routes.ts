// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import Components
import { AuthLayoutComponent } from './features/auth/auth-layout.component';
import { MainLayoutComponent } from './layouts/mainlayout/main-layout.component';
import { LoginComponent } from './features/auth/components/login/login.component';
import { SignupComponent } from './features/auth/components/signup/signup.component';
import { ResetPasswordComponent } from './features/auth/components/reset-password/reset-password.component';
import { UpdatePasswordComponent } from './features/auth/components/update-password/update-password.component';
import { MainDashboardComponent } from './layouts/main-dashboard/main-dashboard.component';
import { HomePageComponent } from './layouts/dashboard/home-page/home-page.component';
import { AdminReportsComponent } from './adminDashboard/admin-reports/admin-reports.component';
import { AdminStatsComponent } from './adminDashboard/admin-stats/admin-stats.component';
import { AdminUserListComponent } from './adminDashboard/admin-user-list/admin-user-list.component';
import { GstInvoiceComponent } from './adminDashboard/gst-invoice/gst-invoice.component';
import { CartViewComponent } from './features/cart/components/cart-view/cart-view.component';
import { CheckoutPageComponent } from './features/checkout/components/checkout-page/checkout-page.component';
import { OrderListComponent } from './features/orders/components/order-list/order-list.component';
import { OrderDetailComponent } from './features/orders/components/order-detail/order-detail.component';
import { ProductListComponent } from './features/products/components/product-list/product-list.component';
import { ProductDetailComponent } from './features/products/components/product-detail/product-detail.component';
// Route Guards
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // Redirect to login by default
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // Authentication Routes (No header/footer)
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: 'update-password', component: UpdatePasswordComponent },
    ],
  },

  // Main Layout Routes (Requires authentication)
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: MainDashboardComponent,
        // children: [
        //   { path: '', component: GstInvoiceComponent },
        //   // { path: '', component: HomePageComponent }, // Set HomePageComponent as the default for /dashboard
        // ],
      },
      { path: 'home', component: HomePageComponent },

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
      { path: 'gstCreate', component: GstInvoiceComponent },

      // Products Routes
      { path: 'products', component: ProductListComponent },
      { path: 'products/:id', component: ProductDetailComponent },
    ],
  },

  // Wildcard Route for 404 Page
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
