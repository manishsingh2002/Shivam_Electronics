import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { CustomerMasterComponent } from '../customer-master/customer-master.component';
import { CustomerListComponent } from '../customer-list/customer-list.component';
import { CustomerdetailsComponent } from '../customerdetails/customerdetails.component';
import { SellersComponent } from '../../Seller/sellers/sellers.component';
@Component({
  selector: 'app-customerlayout',
  imports: [CommonModule, RouterModule, SelectButtonModule, FormsModule],
  templateUrl: './customerlayout.component.html',
  styleUrl: './customerlayout.component.scss'
})
export class CustomerlayoutComponent {
  activeComponent: any = CustomerMasterComponent;
  componentNavItems: any[] = [
    { label: 'Customer Master', component: CustomerMasterComponent },
    { label: 'Customer List', component: CustomerListComponent },
    { label: 'customerDetails', component: CustomerdetailsComponent },
    { label: 'Seller Mater', component: SellersComponent },

  ];

  navigateToComponent(component: any) {
    this.activeComponent = component;
  }
}

