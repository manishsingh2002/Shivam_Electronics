import { Routes } from '@angular/router';
import { CustomerlayoutComponent } from '../features/Customer/customerlayout/customerlayout.component';
import { CustomerListComponent } from '../features/Customer/customer-list/customer-list.component';
import { CustomerMasterComponent } from '../features/Customer/customer-master/customer-master.component';
import { CustomerdetailsComponent } from '../features/Customer/customerdetails/customerdetails.component';
import { AuthGuard } from '../core/guards/auth.guard';

export const customerRoutes: Routes = [
  {
    path: 'customer',
    component: CustomerlayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'master', pathMatch: 'full' },
      { path: 'list', component: CustomerListComponent },
      { path: 'master', component: CustomerMasterComponent },
      { path: 'details', component: CustomerdetailsComponent },
    ],
  },
];
