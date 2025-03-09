
import { Routes } from '@angular/router';
import { AdminLayoutComponent } from '../adminDashboard/admin-layout/admin-layout.component';
import { AdminUserComponent } from '../adminDashboard/admin-user/admin-user.component';
import { GstInvoiceComponent } from '../features/Invoice/gst-invoice/gst-invoice.component';
import { PaymentComponent } from '../adminDashboard/payment/payment.component';
import { NotFoundComponent } from '../shared/components/notfound';
import { AuthLayoutComponent } from '../features/auth/auth-layout.component';
import { LoginComponent } from '../features/auth/components/login/login.component';
import { SignupComponent } from '../features/auth/components/signup/signup.component';
import { ResetPasswordComponent } from '../features/auth/components/reset-password/reset-password.component';
import { UpdatePasswordComponent } from '../features/auth/components/update-password/update-password.component';
import { CustomerlayoutComponent } from '../features/Customer/customerlayout/customerlayout.component';
import { CustomerListComponent } from '../features/Customer/customer-list/customer-list.component';
import { CustomerMasterComponent } from '../features/Customer/customer-master/customer-master.component';
import { CustomerdetailsComponent } from '../features/Customer/customerdetails/customerdetails.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { MainLayoutComponent } from '../layouts/mainlayout/main-layout.component';
import { MainDashboardComponent } from '../layouts/main-dashboard/main-dashboard.component';
import { HomePageComponent } from '../layouts/dashboard/home-page/home-page.component';
import { ProductLayoutComponent } from '../features/products/components/product-layout/product-layout.component';
import { ProductListComponent } from '../features/products/components/product-list/product-list.component';
import { ProductDetailComponent } from '../features/products/components/product-detail/product-detail.component';
import { ProductMasterComponent } from '../features/products/components/product-master/product-master.component';
import { InvoiceLayoutComponent } from '../features/Invoice/invoice-layout/invoice-layout.component';
import { InvoiceViewComponent } from '../features/Invoice/invoice-view/invoice-view.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

  // Authentication routes remain separate
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: 'update-password', component: UpdatePasswordComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },

  // Main layout handles everything else
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: MainDashboardComponent },
      {
        path: 'admin-layout',
        component: AdminLayoutComponent,
        children: [
          { path: 'adminUser', component: AdminUserComponent },
          { path: 'invoice', component: GstInvoiceComponent },
          { path: 'payment', component: PaymentComponent },

        ],
      },

      // Customer Routes inside Main Layout
      {
        path: 'customer',
        component: CustomerlayoutComponent,
        children: [
          // { path: '', redirectTo: 'master', pathMatch: 'full' },
          // { path: 'list', component: CustomerListComponent },
          // { path: 'master', component: CustomerMasterComponent },
          // { path: 'details', component: CustomerdetailsComponent },
        ],
      },
      {
        path: 'invoiceLayout',
        component: InvoiceLayoutComponent,
        children: [
          { path: 'list', component: InvoiceViewComponent },
          { path: 'createInv', component: GstInvoiceComponent },
        ]
      },
      // Product Routes inside Main Layout
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
    ],
  },
  { path: '**', component: NotFoundComponent },
];


/*{
  "name": "shivam-electronics",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start:dev": "cross-env PORT=4200 ng serve --configuration=development --port $PORT",
    "start:qa": "cross-env PORT=4300 ng serve --configuration=qa --port $PORT",
    "start:prod": "cross-env PORT=4400 ng serve --configuration=production --port $PORT",
    "build:dev": "ng build --configuration=development",
    "build:qa": "ng build --configuration=qa",
    "build:prod": "ng build --configuration=production",
    "watch": "ng build --watch --configuration development",
    "test": "ng test",
    "electron:dev": "ng build --configuration=development --base-href ./ && electron electron-main.js",
    "electron:qa": "ng build --configuration=qa --base-href ./ && electron electron-main.js",
    "electron:prod": "ng build --configuration=production --base-href ./ && electron electron-main.js",
    "dist": "electron-builder",
    "serve:ssr": "node dist/shivam-electronics/server/server.mjs"
  },
  "private": true,
  "dependencies": {
    "@angular/animations": "^19.0.6",
    "@angular/common": "^19.0.6",
    "@angular/compiler": "^19.0.6",
    "@angular/core": "^19.0.6",
    "@angular/forms": "^19.0.6",
    "@angular/platform-browser": "^19.0.6",
    "@angular/platform-browser-dynamic": "^19.0.6",
    "@angular/platform-server": "^19.0.6",
    "@angular/router": "^19.0.6",
    "@angular/ssr": "^19.0.7",
    "@primeng/themes": "^18.0.2",
    "@supabase/supabase-js": "^2.48.1",
    "ag-grid-angular": "^33.0.4",
    "ag-grid-community": "^33.0.4",
    "angular-draggable-droppable": "^8.0.0",
    "express": "^4.18.2",
    "flowbite": "^2.5.2",
    "keen-slider": "^6.8.6",
    "lodash": "^4.17.21",
    "ngx-drag-drop": "^19.0.0",
    "primeflex": "^4.0.0",
    "primeicons": "^7.0.0",
    "primeng": "^19.0.5",
    "rxjs": "~7.8.0",
    "supabase": "^2.9.6",
    "tailwindcss-primeui": "^0.4.0",
    "tslib": "^2.3.0",
    "zone.js": "~0.15.0"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^19.0.7",
    "@angular/cli": "^19.0.7",
    "@angular/compiler-cli": "^19.0.6",
    "@electron/remote": "^2.1.2",
    "@tailwindcss/postcss": "^4.0.6",
    "@types/express": "^4.17.17",
    "@types/jasmine": "~5.1.0",
    "@types/lodash": "^4.17.15",
    "@types/node": "^18.18.0",
    "cross-env": "^7.0.3",
    "electron": "^34.0.2",
    "electron-builder": "^25.1.8",
    "jasmine-core": "~5.2.0",
    "karma": "~6.4.0",
    "karma-chrome-launcher": "~3.2.0",
    "karma-coverage": "~2.2.0",
    "karma-jasmine": "~5.1.0",
    "karma-jasmine-html-reporter": "~2.1.0",
    "postcss": "^8.5.2",
    "tailwindcss": "^3.4.17",
    "typescript": "~5.5.2"
  },
  "build": {
    "appId": "com.shivam_electronics.app",
    "productName": "Shivam Electronics",
    "directories": {
      "output": "dist/electron"
    },
    "win": {
      "target": "nsis",
      "icon": "src/assets/icon.ico"
    },
    "files": [
      "dist/shivam-electronic
"electron-main.js"
    ]
  }
}
*/