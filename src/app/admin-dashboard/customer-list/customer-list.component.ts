import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white p-6 rounded-xl shadow-lg">
      <h3 class="text-xl font-bold mb-4">Customers</h3>
      <ul class="space-y-2">
        <li *ngFor="let customer of customers" class="hover:bg-gray-100 p-2 rounded">
          {{ customer.name }} - {{ customer.orders }} Orders
        </li>
      </ul>
    </div>
  `,
})
export class CustomerListComponent {
  @Input() customers: any[] = [];
}