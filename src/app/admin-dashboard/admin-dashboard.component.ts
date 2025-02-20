// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { DragAndDropModule } from 'angular-draggable-droppable';
// import { animate, style, transition, trigger } from '@angular/animations';
// import { UserStatsComponent } from './user-stats/user-stats.component';
// import { CustomerListComponent } from './customer-list/customer-list.component';
// import { ProductOverviewComponent } from './product-overview/product-overview.component';
// import { SalesChartComponent } from './sales-chart/sales-chart.component';
// import { OrderStatsComponent } from './order-stats/order-stats.component';
// import { InventoryComponent } from './inventory/inventory.component';
// import { RevenueComponent } from './revenue/revenue.component';
// import { TasksComponent } from './tasks/tasks.component';
// import { AnalyticsComponent } from './analytics/analytics.component';
// import { NotificationsComponent } from './notifications/notifications.component';

// // Dummy Data Interfaces
// interface User { id: number; name: string; email: string; role: string; }
// interface Customer { id: number; name: string; email: string; orders: number; }
// interface Product { id: number; name: string; price: number; stock: number; }
// interface Sale { id: number; date: string; amount: number; status: string; }

// const dummyData = {
//   users: [
//     { id: 1, name: 'Admin X', email: 'admin@x.com', role: 'admin' },
//     { id: 2, name: 'Staff Y', email: 'staff@y.com', role: 'staff' },
//   ],
//   customers: [
//     { id: 1, name: 'John Doe', email: 'john@example.com', orders: 5 },
//     { id: 2, name: 'Jane Smith', email: 'jane@example.com', orders: 3 },
//   ],
//   products: [
//     { id: 1, name: 'Quantum Widget', price: 99.99, stock: 50 },
//     { id: 2, name: 'Gizmo Flux', price: 149.99, stock: 20 },
//   ],
//   sales: [
//     { id: 1, date: '2025-02-01', amount: 499.95, status: 'completed' },
//     { id: 2, date: '2025-02-02', amount: 299.97, status: 'pending' },
//   ],
// };

// @Component({
//   selector: 'app-admin-dashboard',
//   standalone: true,
//   imports: [
//     CommonModule,
//     DragAndDropModule,
//     UserStatsComponent,
//     CustomerListComponent,
//     ProductOverviewComponent,
//     SalesChartComponent,
//     OrderStatsComponent,
//     InventoryComponent,
//     RevenueComponent,
//     TasksComponent,
//     AnalyticsComponent,
//     NotificationsComponent,
//   ],
//   templateUrl: './admin-dashboard.component.html',
//   styleUrls: ['./admin-dashboard.component.css'],
//   animations: [
//     trigger('fadeIn', [
//       transition(':enter', [
//         style({ opacity: 0, transform: 'scale(0.9)' }),
//         animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
//       ]),
//     ]),
//     trigger('slideIn', [
//       transition(':enter', [
//         style({ opacity: 0, transform: 'translateY(20px)' }),
//         animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
//       ]),
//     ]),
//   ],
// })
// export class AdminDashboardComponent {
//   components = [
//     { id: 'user-stats', data: dummyData.users },
//     { id: 'customer-list', data: dummyData.customers },
//     { id: 'product-overview', data: dummyData.products },
//     { id: 'sales-chart', data: dummyData.sales },
//     { id: 'order-stats', data: [] },
//     { id: 'inventory', data: [] },
//     { id: 'revenue', data: [] },
//     { id: 'tasks', data: [] },
//     { id: 'analytics', data: [] },
//     { id: 'notifications', data: [] },
//   ];
// }
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DndModule, DndDropEvent } from 'ngx-drag-drop';
import { animate, style, transition, trigger } from '@angular/animations';
import { UserStatsComponent } from './user-stats/user-stats.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { ProductOverviewComponent } from './product-overview/product-overview.component';
import { SalesChartComponent } from './sales-chart/sales-chart.component';
import { OrderStatsComponent } from './order-stats/order-stats.component';
import { InventoryComponent } from './inventory/inventory.component';
import { RevenueComponent } from './revenue/revenue.component';
import { TasksComponent } from './tasks/tasks.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { NotificationsComponent } from './notifications/notifications.component';

// Dummy Data Interfaces
interface User { id: number; name: string; email: string; role: string; }
interface Customer { id: number; name: string; email: string; orders: number; }
interface Product { id: number; name: string; price: number; stock: number; }
interface Sale { id: number; date: string; amount: number; status: string; }

const dummyData = {
  users: [
    { id: 1, name: 'Admin X', email: 'admin@x.com', role: 'admin' },
    { id: 2, name: 'Staff Y', email: 'staff@y.com', role: 'staff' },
  ],
  customers: [
    { id: 1, name: 'John Doe', email: 'john@example.com', orders: 5 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', orders: 3 },
  ],
  products: [
    { id: 1, name: 'Quantum Widget', price: 99.99, stock: 50 },
    { id: 2, name: 'Gizmo Flux', price: 149.99, stock: 20 },
  ],
  sales: [
    { id: 1, date: '2025-02-01', amount: 499.95, status: 'completed' },
    { id: 2, date: '2025-02-02', amount: 299.97, status: 'pending' },
  ],
};

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    DndModule,
    UserStatsComponent,
    CustomerListComponent,
    ProductOverviewComponent,
    SalesChartComponent,
    OrderStatsComponent,
    InventoryComponent,
    RevenueComponent,
    TasksComponent,
    AnalyticsComponent,
    NotificationsComponent,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class AdminDashboardComponent {
  components = [
    { id: 'user-stats', data: dummyData.users, effectAllowed: 'move' as const },
    { id: 'customer-list', data: dummyData.customers, effectAllowed: 'move' as const },
    { id: 'product-overview', data: dummyData.products, effectAllowed: 'move' as const },
    { id: 'sales-chart', data: dummyData.sales, effectAllowed: 'move' as const },
    { id: 'order-stats', data: [], effectAllowed: 'move' as const },
    { id: 'inventory', data: [], effectAllowed: 'move' as const },
    { id: 'revenue', data: [], effectAllowed: 'move' as const },
    { id: 'tasks', data: [], effectAllowed: 'move' as const },
    { id: 'analytics', data: [], effectAllowed: 'move' as const },
    { id: 'notifications', data: [], effectAllowed: 'move' as const },
  ];

  onDrop(event: DndDropEvent, targetId: string) {
    console.log(`Dropped ${event.data.id} onto ${targetId}`);
    const draggedIndex = this.components.findIndex(c => c.id === event.data.id);
    const targetIndex = this.components.findIndex(c => c.id === targetId);
    if (draggedIndex !== -1 && targetIndex !== -1) {
      const [draggedItem] = this.components.splice(draggedIndex, 1);
      this.components.splice(targetIndex, 0, draggedItem);
    }
  }

  onDragStart(event: DragEvent, id: string) {
    console.log(`Drag started for ${id}`, event);
  }

  onDragEnd(event: DragEvent, id: string) {
    console.log(`Drag ended for ${id}`, event);
  }
}