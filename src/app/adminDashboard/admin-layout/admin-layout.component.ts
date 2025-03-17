

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { AdminUserComponent } from './../../adminDashboard/admin-user/admin-user.component';
import { GstInvoiceComponent } from '../../features/Invoice/gst-invoice/gst-invoice.component';
import { PaymentComponent } from '../../features/Payment/payment/payment.component';
import { AdminReportsComponent } from '../admin-reports/admin-reports.component';

@Component({
  selector: 'app-admin-layout',
  imports: [CommonModule, RouterModule, SelectButtonModule, FormsModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {

  activeComponent: any = AdminUserComponent;

  componentNavItems: any[] = [
    { label: 'Users', component: AdminUserComponent },
    { label: 'Invoice', component: GstInvoiceComponent },
    { label: 'Payment', component: PaymentComponent },
    { label: 'Payment', component: AdminReportsComponent },

  ];

  navigateToComponent(component: any) {
    this.activeComponent = component;
  }
}

