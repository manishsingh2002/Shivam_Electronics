import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-overview',
  standalone: true,
  imports: [CommonModule],
  template: `
 
  `,
})
export class ProductOverviewComponent {
  @Input() products: any[] = [];
}