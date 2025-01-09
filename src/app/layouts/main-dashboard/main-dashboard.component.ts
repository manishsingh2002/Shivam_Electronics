import { Component } from '@angular/core';
import { HomePageComponent } from '../dashboard/home-page/home-page.component';
import { Router, NavigationEnd } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { GstInvoiceComponent } from '../../adminDashboard/gst-invoice/gst-invoice.component';
import { ProductListComponent } from '../../features/products/components/product-list/product-list.component';
import { ProductDetailComponent } from '../../features/products/components/product-detail/product-detail.component';
@Component({
  selector: 'app-main-dashboard',
  standalone: true,
  imports: [CommonModule, SelectButtonModule, FormsModule, RouterModule],
  templateUrl: './main-dashboard.component.html',
  styleUrl: './main-dashboard.component.scss',
})
export class MainDashboardComponent {
  showHeaderAndSidebar: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const noSidebarRoutes = ['/login'];
        this.showHeaderAndSidebar = !noSidebarRoutes.includes(this.router.url);
      }
    });
  }

   activeComponent: any = HomePageComponent; 
   componentNavItems: any[] = [
    { label: 'home', component: HomePageComponent },
    { label: 'invoice', component: GstInvoiceComponent }, // Corrected key
    { label: 'Product List', component: ProductListComponent },
    { label: 'Product detail', component: ProductDetailComponent }
  ];
  
  
      navigateToComponent(component: any) {
        this.activeComponent = component;
      }
}
