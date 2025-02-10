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
    rowSelectionMode: any
    constructor(private cdr: ChangeDetectorRef, private apiService: ApiService) { }

    ngOnInit(): void {
        this.getColumn()
        this.getData()
        this.rowSelectionMode = 'singleRow'
    }

    // handleDataChange(event: any) {
    //     if (event.type === 'cellValueChanged') {
    //         const cellValueChangedEvent = event.event as CellValueChangedEvent; // Cast event for type safety
    //         const rowNode = cellValueChangedEvent.node;
    //         const dataItem = rowNode.data; // Get the data item of the edited row
    //         const field = cellValueChangedEvent.colDef.field;
    //         const newValue = cellValueChangedEvent.newValue;

    //         // **Update the data item DIRECTLY**
    //         dataItem[field] = newValue;

    //         // **Call API to update data on the server (keep this)**
    //         this.apiService.updateProduct(dataItem.id, dataItem).subscribe((res: any) => {
    //             // **No need to call getData() here anymore!**
    //             // The grid will update automatically because you modified dataItem directly.
    //             console.log('Product updated successfully on server:', res);
    //         });
    //     } else if (event.type === 'rowSelected') {
    //         const rowSelectedEvent = event.event;
    //         console.log('Selected Row Data:', rowSelectedEvent.node.data);
    //         // Handle row selection logic here if needed
    //     } else if (event.type === 'cellClicked') {
    //         const cellClickedEvent = event.event;
    //         console.log('Clicked Cell Data:', cellClickedEvent.node.data);
    //         // Handle cell click logic here if needed
    //     } else if (event.type === 'gridReady') {
    //         const gridReadyEvent = event.event;
    //         console.log('Grid is ready:', gridReadyEvent.api);
    //         // Handle grid ready logic if needed
    //     } else if (event.type === 'exportCSV') {
    //         console.log('Export CSV event received');
    //         // Handle CSV export logic if needed
    //     }
    // }

    eventFromGrid(event: any) {
        console.log(event);
        if (event.eventType === 'onCellValueCHanged') {
            const cellValueChangedEvent = event.event as CellValueChangedEvent;
            const rowNode = cellValueChangedEvent.node;
            const dataItem = rowNode.data;
            const field = cellValueChangedEvent.colDef.field;
            const newValue = cellValueChangedEvent.newValue;

            if (field) {
                dataItem[field] = newValue;

                console.log('Updating product:', dataItem); // ✅ Debug log

                // Call API to update product
                this.apiService.updateProduct(dataItem.id, dataItem).subscribe({
                    next: (res: any) => {
                        console.log('✅ Product updated successfully:', res);
                    },
                    error: (err: any) => {
                        console.error('❌ Error updating product:', err);
                    }
                });
            } else {
                console.error('❌ Error: Field is undefined in cellValueChangedEvent.colDef');
            }
        }

        // if (event.type === 'cellValueChanged') {
        //     const cellValueChangedEvent = event.event.event as CellValueChangedEvent;
        //     const rowNode = cellValueChangedEvent.node;
        //     const dataItem = rowNode.data;
        //     const field = cellValueChangedEvent.colDef.field;
        //     const newValue = cellValueChangedEvent.newValue;

        //     if (field) {
        //         dataItem[field] = newValue;
        //         this.apiService.updateProduct(dataItem.id, dataItem).subscribe({
        //             next: (res: any) => {
        //                 console.log('✅ Product updated successfully:', res);
        //                 rowNode.setData({ ...dataItem }); // ✅ Update row manually
        //             },
        //             error: (err: any) => {
        //                 console.error('❌ Error updating product:', err);
        //             }
        //         })
        //     } else {
        //         console.error('Error: Field is undefined in cellValueChangedEvent.colDef');
        //     }
        // }
    }


    getColumn() {
        this.column =
            [
                { field: 'title', sortable: true, filter: true, resizable: true, editable: true },
                { field: 'description', sortable: true, filter: true, resizable: true, editable: true },
                { field: 'rate', sortable: true, filter: true, resizable: true, editable: true },
                { field: 'price', sortable: true, filter: true, resizable: true, editable: true },
                { field: 'stock', sortable: true, filter: true, resizable: true, editable: true },
                { field: 'category', sortable: true, filter: true, resizable: true, editable: true },
                { field: 'brand', sortable: true, filter: true, resizable: true, editable: true },
                { field: 'sku', sortable: true, filter: true, resizable: true, editable: true },
                { field: 'weight', sortable: true, filter: true, resizable: true, editable: true },
                { field: 'warrantyInformation', sortable: true, filter: true, resizable: true, editable: true },
                { field: 'shippingInformation', sortable: true, filter: true, resizable: true, editable: true },
                { field: 'availabilityStatus', sortable: true, filter: true, resizable: true, editable: true },
                { field: 'returnPolicy', sortable: true, filter: true, resizable: true, editable: true },
                { field: 'minimumOrderQuantity', sortable: true, filter: true, resizable: true, editable: true },
                { field: 'finalPrice', sortable: true, filter: true, resizable: true, editable: true }

            ];
    }

    getData() {
        this.apiService.getAllProductData().subscribe((res: any) => {
            console.log(res.data);
            this.data = res.data;
            this.cdr.markForCheck()
        })
    }
}
// import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
// import { SharedGridComponent } from '../../../../shared/components/shared-grid/shared-grid.component';
// import { ApiService } from '../../../../core/services/api.service';
// import { CellValueChangedEvent } from 'ag-grid-community';
// @Component({
//     selector: 'app-product-detail',
//     imports: [SharedGridComponent],
//     templateUrl: './product-detail.component.html',
//     styleUrl: './product-detail.component.scss'
// })
// export class ProductDetailComponent {
//     data: any;
//     column: any
//     // @Output() dataChanged = new EventEmitter<any>(); // Create an Output event



//     constructor(private cdr: ChangeDetectorRef, private apiService: ApiService) { }

//     ngOnInit(): void {
//         this.getColumn()
//         this.getData()
//     }

//     handleDataChange(event: any) {
//         this.data = event;
//         this.apiService.updateProduct(event.event.data.id, event.data).subscribe((res: any) => {
//             this.getData()
//         })
//     }


//     getColumn() {
//         this.column =
//             [
//                 { field: 'title', sortable: true, filter: true, resizable: true, editable: true },
//                 { field: 'description', sortable: true, filter: true, resizable: true, editable: true },
//                 { field: 'rate', sortable: true, filter: true, resizable: true, editable: true },
//                 { field: 'price', sortable: true, filter: true, resizable: true, editable: true },
//                 { field: 'stock', sortable: true, filter: true, resizable: true, editable: true },
//                 { field: 'category', sortable: true, filter: true, resizable: true, editable: true },
//                 { field: 'brand', sortable: true, filter: true, resizable: true, editable: true },
//                 { field: 'sku', sortable: true, filter: true, resizable: true, editable: true },
//                 { field: 'weight', sortable: true, filter: true, resizable: true, editable: true },
//                 { field: 'warrantyInformation', sortable: true, filter: true, resizable: true, editable: true },
//                 { field: 'shippingInformation', sortable: true, filter: true, resizable: true, editable: true },
//                 { field: 'availabilityStatus', sortable: true, filter: true, resizable: true, editable: true },
//                 { field: 'returnPolicy', sortable: true, filter: true, resizable: true, editable: true },
//                 { field: 'minimumOrderQuantity', sortable: true, filter: true, resizable: true, editable: true },
//                 { field: 'finalPrice', sortable: true, filter: true, resizable: true, editable: true }

//             ];
//     }

//     getData() {
//         this.apiService.getAllProductData().subscribe((res: any) => {
//             console.log(res.data);
//             this.data = res.data;
//             this.cdr.markForCheck()
//         })
//     }
// }
