import { Routes } from '@angular/router';
import { ProductLayoutComponent } from '../features/products/components/product-layout/product-layout.component';
import { ProductListComponent } from '../features/products/components/product-list/product-list.component';
import { ProductDetailComponent } from '../features/products/components/product-detail/product-detail.component';
import { ProductMasterComponent } from '../features/products/components/product-master/product-master.component';

export const productRoutes: Routes = [
  {
    path: 'products',
    component: ProductLayoutComponent,
    children: [
      { path: '', redirectTo: 'productMaster', pathMatch: 'full' },
      { path: 'list', component: ProductListComponent },
      { path: 'productMaster', component: ProductMasterComponent },
      { path: ':id', component: ProductDetailComponent },
    ],
  },
];
