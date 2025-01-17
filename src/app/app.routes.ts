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
import { GstInvoiceComponent } from './adminDashboard/gst-invoice/gst-invoice.component';
import { ProductListComponent } from './features/products/components/product-list/product-list.component';
import { ProductDetailComponent } from './features/products/components/product-detail/product-detail.component';
import { ProductMasterComponent } from './features/products/components/product-master/product-master.component';
import { ProductLayoutComponent } from './features/products/components/product-layout/product-layout.component';
// Route Guards
import { AuthGuard } from './core/guards/auth.guard';
import { CustomerlayoutComponent } from './features/Customer/customerlayout/customerlayout.component';
import { CustomerListComponent } from './features/Customer/customer-list/customer-list.component';
import { CustomerMasterComponent } from './features/Customer/customer-master/customer-master.component';

export const routes: Routes = [
  // Redirect root to login
  // { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Authentication Routes (Auth Layout)
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'signup', component: SignupComponent },
      { path: 'login', component: LoginComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: 'update-password', component: UpdatePasswordComponent },
    ],
  },
  
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: MainDashboardComponent,children: [
        { path: '', component: HomePageComponent },
      ] },
      { path: 'home', component: HomePageComponent },
      // Admin Dashboard Routes
      { path: 'admin/reports', component: AdminReportsComponent },
      { path: 'admin/stats', component: AdminStatsComponent },
      { path: 'admin/gst-invoice', component: GstInvoiceComponent },
       {
        path: 'products',
        component: ProductLayoutComponent,
        children: [
          { path: '', redirectTo: 'productMaster', pathMatch: 'full' },
          { path: 'list', component: ProductListComponent },
          { path: ':id', component: ProductDetailComponent },
          {path:'productMaster',component:ProductMasterComponent}
        ],
      },
      {
        path: 'customer',
        component: CustomerlayoutComponent,
        children: [
          { path: '', redirectTo: 'productMaster', pathMatch: 'full' },
          { path: 'list', component: CustomerListComponent },
          { path: 'master', component: CustomerMasterComponent },
          // {path:'productMaster',component:ProductMasterComponent}
        ],
      },
      // {path:'productMaster',component:ProductMasterComponent},
      // { path: 'products', component: ProductListComponent },
      // { path: 'products/:id', component: ProductDetailComponent },
      // {path:'productlayout',component:ProductLayoutComponent}
    ],
  },

  // Wildcard Route for 404
  // { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
