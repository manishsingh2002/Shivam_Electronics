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
import { AppNavigationComponent } from "../../shared/components/common-layout/common-layout.component";
import { HomePage1Component } from '../dashboard/home-page1/home-page1.component';
@Component({
  selector: 'app-main-dashboard',
  imports: [CommonModule, SelectButtonModule, FormsModule, RouterModule, AppNavigationComponent],
  templateUrl: './main-dashboard.component.html',
  styleUrl: './main-dashboard.component.scss'
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
    { label: 'home1', component: HomePage1Component },


  ];
  navigateToComponent(component: any) {
    this.activeComponent = component;
  }
}
