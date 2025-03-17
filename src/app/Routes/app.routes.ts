
// import { Routes } from '@angular/router';
// import { AdminLayoutComponent } from '../adminDashboard/admin-layout/admin-layout.component';
// import { AdminUserComponent } from '../adminDashboard/admin-user/admin-user.component';
// import { GstInvoiceComponent } from '../features/Invoice/gst-invoice/gst-invoice.component';
// import { PaymentComponent } from '../features/Payment/payment/payment.component';
// import { NotFoundComponent } from '../shared/components/notfound';
// import { AuthLayoutComponent } from '../features/auth/auth-layout.component';
// import { LoginComponent } from '../features/auth/components/login/login.component';
// import { SignupComponent } from '../features/auth/components/signup/signup.component';
// import { ResetPasswordComponent } from '../features/auth/components/reset-password/reset-password.component';
// import { UpdatePasswordComponent } from '../features/auth/components/update-password/update-password.component';
// import { CustomerlayoutComponent } from '../features/Customer/customerlayout/customerlayout.component';
// import { CustomerListComponent } from '../features/Customer/customer-list/customer-list.component';
// import { CustomerMasterComponent } from '../features/Customer/customer-master/customer-master.component';
// import { CustomerdetailsComponent } from '../features/Customer/customerdetails/customerdetails.component';
// import { AuthGuard } from '../core/guards/auth.guard';
// import { MainLayoutComponent } from '../layouts/mainlayout/main-layout.component';
// import { MainDashboardComponent } from '../layouts/main-dashboard/main-dashboard.component';
// import { HomePageComponent } from '../layouts/dashboard/home-page/home-page.component';
// import { ProductLayoutComponent } from '../features/products/components/product-layout/product-layout.component';
// import { ProductListComponent } from '../features/products/components/product-list/product-list.component';
// import { ProductDetailComponent } from '../features/products/components/product-detail/product-detail.component';
// import { ProductMasterComponent } from '../features/products/components/product-master/product-master.component';
// import { InvoiceLayoutComponent } from '../features/Invoice/invoice-layout/invoice-layout.component';
// import { InvoiceViewComponent } from '../features/Invoice/invoice-view/invoice-view.component';

// export const appRoutes: Routes = [
//   { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

//   // Authentication routes remain separate
//   {
//     path: 'auth',
//     children: [
//       { path: 'login', component: LoginComponent },
//       { path: 'signup', component: SignupComponent },
//       { path: 'reset-password', component: ResetPasswordComponent },
//       { path: 'update-password', component: UpdatePasswordComponent },
//       { path: '', redirectTo: 'login', pathMatch: 'full' },
//     ],
//   },

//   // Main layout handles everything else
//   {
//     path: '',
//     component: MainLayoutComponent,
//     canActivate: [AuthGuard],
//     children: [
//       { path: 'dashboard', component: MainDashboardComponent },
//       {
//         path: 'admin-layout',
//         component: AdminLayoutComponent,
//         children: [
//           { path: 'adminUser', component: AdminUserComponent },
//           { path: 'invoice', component: GstInvoiceComponent },
//           { path: 'payment', component: PaymentComponent },

//         ],
//       },

//       // Customer Routes inside Main Layout
//       {
//         path: 'customer',
//         component: CustomerlayoutComponent,
//         children: [
//           // { path: '', redirectTo: 'master', pathMatch: 'full' },
//           // { path: 'list', component: CustomerListComponent },
//           // { path: 'master', component: CustomerMasterComponent },
//           // { path: 'details', component: CustomerdetailsComponent },
//         ],
//       },
//       {
//         path: 'invoiceLayout',
//         component: InvoiceLayoutComponent,
//         children: [
//           { path: 'list', component: InvoiceViewComponent },
//           { path: 'createInv', component: GstInvoiceComponent },
//         ]
//       },
//       // Product Routes inside Main Layout
//       {
//         path: 'products',
//         component: ProductLayoutComponent,
//         children: [
//           { path: '', redirectTo: 'productMaster', pathMatch: 'full' },
//           { path: 'list', component: ProductListComponent },
//           { path: 'productMaster', component: ProductMasterComponent },
//           { path: ':id', component: ProductDetailComponent },
//         ],
//       },
//     ],
//   },
//   { path: '**', component: NotFoundComponent },
// ];

import { Routes } from '@angular/router';
import { AdminLayoutComponent } from '../adminDashboard/admin-layout/admin-layout.component';
import { AdminUserComponent } from '../adminDashboard/admin-user/admin-user.component';
import { GstInvoiceComponent } from '../features/Invoice/gst-invoice/gst-invoice.component';
import { PaymentComponent } from '../features/Payment/payment/payment.component';
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
    // component: AuthLayoutComponent, // You might want to adjust this if you don't have a separate auth layout
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
        path: 'admin', // Changed path to 'admin' for better grouping in the menu
        // component: AdminLayoutComponent,
        children: [
          { path: 'users', component: AdminUserComponent }, // Changed path to 'users'
          { path: 'invoice', component: GstInvoiceComponent },
          { path: 'payment', component: PaymentComponent },
        ],
      },

      // Customer Routes inside Main Layout
      {
        path: 'customers', // Changed path to 'customers' for better grouping
        // component: CustomerlayoutComponent,
        children: [
          { path: 'list', component: CustomerListComponent },
          { path: 'master', component: CustomerMasterComponent },
          { path: 'details', component: CustomerdetailsComponent },
        ],
      },
      {
        path: 'invoices', // Changed path to 'invoices' for better grouping
        // component: InvoiceLayoutComponent,
        children: [
          { path: 'view', component: InvoiceViewComponent }, // Changed path to 'view'
          { path: 'create', component: GstInvoiceComponent }, // Changed path to 'create'
        ]
      },
      // Product Routes inside Main Layout
      {
        path: 'products',
        // component: ProductLayoutComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' }, // Adjusted default route
          { path: 'list', component: ProductListComponent },
          { path: 'master', component: ProductMasterComponent },
          { path: 'detail/:id', component: ProductDetailComponent }, // Changed path to 'detail/:id'
        ],
      },
    ],
  },
  { path: '**', component: NotFoundComponent },
];