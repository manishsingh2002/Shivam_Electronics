// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-sales-chart',
//   imports: [],
//   templateUrl: './sales-chart.component.html',
//   styleUrl: './sales-chart.component.scss'
// })
// export class SalesChartComponent {

// }

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sales-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
   
  `,
})
export class SalesChartComponent {
  @Input() sales: any[] = [];
}