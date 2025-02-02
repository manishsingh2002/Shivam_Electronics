import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { SharedGridComponent } from '../../../../shared/components/shared-grid/shared-grid.component';
import { ApiService } from '../../../../core/services/api.service';
import { CellValueChangedEvent } from 'ag-grid-community';
@Component({
    selector: 'app-product-detail',
    imports: [SharedGridComponent],
    templateUrl: './product-detail.component.html',
    styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
    data: any;
    column: any
    // @Output() dataChanged = new EventEmitter<any>(); // Create an Output event


  
    constructor(private cdr: ChangeDetectorRef, private apiService: ApiService) { }

    ngOnInit(): void {
        this.getColumn()
        this.getData()
    }     
   
    handleDataChange(event: any) {
        this.data = event; // Update the data in the parent component
                this.apiService.updateProduct(event.data.id,event.data).subscribe((res: any) => {
                this.getData()
          } )

        // this.apiService.updateAllProductData(updatedData).subscribe({
        //     next: (res:any) => {
        //         console.log("updated all data", res)
        //     },
        //     error: (err:any) => {
        //         console.log("error in updating all data", err)
        //     }
        // })
      }


    getColumn() {
        this.column =
            [
                { field: 'title', sortable: true, filter: true, resizable: true,headerComponent: 'customHeaderComponent', editable: true},
                { field: 'description', sortable: true, filter: true, resizable: true, editable: true},
                { field: 'rate', sortable: true, filter: true, resizable: true, editable: true},
                { field: 'price', sortable: true, filter: true, resizable: true, editable: true},
                {field: 'stock', sortable: true, filter: true, resizable: true, editable: true},
                { field: 'category', sortable: true, filter: true, resizable: true, editable: true},
                { field: 'brand', sortable: true, filter: true, resizable: true, editable: true },
                { field: 'sku', sortable: true, filter: true, resizable: true, editable: true},
                { field: 'weight', sortable: true, filter: true, resizable: true, editable: true  },
                { field: 'warrantyInformation', sortable: true, filter: true, resizable: true, editable: true  },
                { field: 'shippingInformation', sortable: true, filter: true, resizable: true, editable: true    },
                { field: 'availabilityStatus', sortable: true, filter: true, resizable: true, editable: true  },
                { field: 'returnPolicy', sortable: true, filter: true, resizable: true, editable: true },
                { field: 'minimumOrderQuantity', sortable: true, filter: true, resizable: true, editable: true },
                { field: 'finalPrice', sortable: true, filter: true, resizable: true, editable: true   }

            ];
    }
 
    getData() {
        this.apiService.getAllProductData().subscribe((res: any) => {
            console.log(res.data);
            this.data = res.data;
            this.cdr.markForCheck()
        })
    }
 
// 



}
