import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import Components
import { MainLayoutComponent } from '../layouts/mainlayout/main-layout.component';
import { MainDashboardComponent } from '../layouts/main-dashboard/main-dashboard.component';
import { HomePageComponent } from '../layouts/dashboard/home-page/home-page.component';
import { AdminLayoutComponent } from '../adminDashboard/admin-layout/admin-layout.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { ProductLayoutComponent } from '../features/products/components/product-layout/product-layout.component';
import { CustomerlayoutComponent } from '../features/Customer/customerlayout/customerlayout.component';


export const mainlayoutRoutes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard], // Protect Main Layout
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: MainDashboardComponent,
        children: [{ path: '', component: HomePageComponent }],
      },
      { path: 'admin-layout', component: AdminLayoutComponent },
      { path: 'products', component: ProductLayoutComponent },
      { path: 'customer', component: CustomerlayoutComponent },
    ],
  }
];

