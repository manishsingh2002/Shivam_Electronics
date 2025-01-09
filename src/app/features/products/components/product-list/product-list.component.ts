import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ApiService } from '../../../../core/services/api.service';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { DrawerModule } from 'primeng/drawer';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [TableModule,CommonModule,ButtonModule,TagModule,RatingModule,FormsModule,DrawerModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  visible: boolean = false;

public products: any[]=[];
    first = 0;
    rows = 10;

    constructor(private apiService: ApiService) {}

    ngOnInit() { this.getProductData()   }
  getProductData() {
   this.apiService.getAllProductData().subscribe((res:any)=>{
    this.products=res.data.doc;
   })
  }

    












    next() {this.first = this.first + this.rows;}
    prev() { this.first = this.first - this.rows;}
    reset() { this.first = 0;    }
    pageChange(event:any) { this.first = event.first; this.rows = event.rows;    }
    isLastPage(): boolean {return this.products ? this.first + this.rows >= this.products.length : true;    }
    isFirstPage(): boolean {return this.products ? this.first === 0 : true;    }

    getSeverity(status: string) {
      switch (status) {
          case 'INSTOCK':
              return 'success';
          case 'LOWSTOCK':
              return 'warn';
          case 'OUTOFSTOCK':
              return 'danger';
          default:
            return 'success';
      }
  }
}