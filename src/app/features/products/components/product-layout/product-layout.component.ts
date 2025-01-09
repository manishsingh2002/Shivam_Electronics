import { Component } from '@angular/core';
import { ProductMasterComponent } from '../product-master/product-master.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-product-layout',
  standalone: true,
  imports: [CommonModule,RouterModule,SelectButtonModule,FormsModule],
  templateUrl: './product-layout.component.html',
  styleUrl: './product-layout.component.scss'
})

export class ProductLayoutComponent {
  navItems: any[] = [
    { label: 'Product Master', component: ProductMasterComponent },
    { label: 'Product List', component: ProductListComponent       },
    { label: 'Product detail', component: ProductDetailComponent }
  ];
  

    activeComponent: any = ProductMasterComponent; 

    componentNavItems: any[] = [
      { label: 'Product Master', component: ProductMasterComponent },
      { label: 'Product List', component: ProductListComponent       },
      { label: 'Product detail', component: ProductDetailComponent }
    ];

  navigateToComponent(component: any) {
    this.activeComponent = component;
  }
}