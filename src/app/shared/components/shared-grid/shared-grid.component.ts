// import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
// import { ColDef, GridApi } from 'ag-grid-community';
// import { AllCommunityModule, ModuleRegistry,themeAlpine,  themeBalham,  themeQuartz } from 'ag-grid-community';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';
// import { AgGridAngular } from 'ag-grid-angular';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { SelectModule } from 'primeng/select';

// ModuleRegistry.registerModules([AllCommunityModule]);
// @Component({
//   selector: 'app-custom-footer',
//   template: `
//     <div class="flex justify-center mb-4">
//       <p-select
//         [options]="themes"
//         [(ngModel)]="theme"
//         optionLabel="label"
//         optionValue="value"
//         placeholder="Select a theme"
//         class="w-full sm:w-56"
//       ></p-select>
//     </div>
//   `,
//   imports: [FormsModule,CommonModule,SelectModule],
// })
// export class CustomFooterComponent {
//   @Input() themes: any;
//   @Input() theme: any;
// }

// @Component({
//   selector: 'app-shared-grid',
//   imports: [AgGridAngular,FormsModule,CommonModule,SelectModule],
//   templateUrl: './shared-grid.component.html',
//   styleUrls: ['./shared-grid.component.scss']
// })
// export class SharedGridComponent implements OnInit, OnChanges {
//   @Input() usertheme:any
//   @Input() data: any;
//   @Input() column: any;

//   themes = [
//     { label: "themeQuartz", value: themeQuartz },
//     { label: "themeBalham", value: themeBalham },
//     { label: "themeAlpine", value: themeAlpine },
//   ];
//   private gridApi!: GridApi;
//   rowData: any;
//   columnDefs: ColDef[] = []; 
//   defaultColDef: ColDef = {
//     sortable: true,
//     filter: true,
//     resizable: true,
//     editable: true,
//   };
//   theme: any;
//   statusBar = {
//     statusPanels: [
//       {
//         statusPanel: 'agPaginationPanel',
//         align: 'left',
//       },
//       {
//         statusPanel: CustomFooterComponent,  // Use the CustomFooterComponent here
//         align: 'right',
//         params: {
//           themes: this.themes,  // Pass themes to the component
//           theme: this.theme,
//         },
//       },
//     ],
//   };
//   // statusBar = {
//   //   statusPanels: [
//   //     {
//   //       statusPanel: 'customFooter', // Specify your custom footer
//   //       align: 'center',
//   //       Component:` <div class="card flex justify-center mb-4">
//   //   <p-select 
//   //     [options]="themes" 
//   //     [(ngModel)]="theme" 
//   //     optionLabel="label" 
//   //     optionValue="value" 
//   //     placeholder="Select a theme" 
//   //     class="w-full sm:w-56" />
//   // </div>`
//   //     }
//   //   ]
//   // };
//   ngOnInit(): void {
//     this.theme = themeQuartz;
//     console.log(this.theme,"-------------------------------");
//     if (!this.column || this.column.length === 0) {
//       this.columnDefs = this.generateDefaultColumns(this.rowData);
//     }

//     this.theme=this.usertheme?this.usertheme:'Alpine' 
//   }
  
  
//   generateDefaultColumns(data: any[]): ColDef[] {
//     if (data.length > 0) {
//       return Object.keys(data[0]).map(key => ({
//         headerName: key.charAt(0).toUpperCase() + key.slice(1),
//         field: key
//       }));
//     }
//     return [];
//   }
  
//   // ngOnInit(): void {
//   //   // Ensure rowData is set after component initialization
//   //   this.rowData = this.data;
    
//   // }

//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['data'] && changes['data'].currentValue !== this.rowData) {
//       this.rowData = changes['data'].currentValue;
//     }
//     if (changes['column'] && changes['column'].currentValue !== this.columnDefs) {
//       this.columnDefs = changes['column'].currentValue;
//     }
//   }
  
//   // ngOnChanges(changes: SimpleChanges): void {
//   //   // Handle any changes to @Input() values
//   //   if (changes['data'] && changes['data'].currentValue) {
//   //     this.rowData = changes['data'].currentValue;
//   //   }
//   //   if (changes['column'] && changes['column'].currentValue) {
//   //     this.columnDefs = changes['column'].currentValue; // Set columnDefs when column input changes
//   //   }
//   // }

//   onGridReady(params: any) {
//     this.gridApi = params.api;
//     console.log(params);
//   }

//   onCellValueChanged(event: any) {
//     const updatedRow = event.data;
    
//     // Handle the update, e.g., send it to an API or emit an event
//     console.log('Updated row:', updatedRow);
  
//     // Example: sending data to a service or making an API call
//     // this.yourService.updateData(updatedRow).subscribe(response => {
//     //   console.log('Data updated successfully', response);
//     // });
//   }

//   exportToCSV() {
//     if (this.gridApi) {
//       this.gridApi.exportDataAsCsv();
//     }
//   }
// }

import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ColDef, GridApi } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry, themeAlpine, themeBalham, themeQuartz } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridAngular } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-custom-footer',
  template: `
    <div class="flex justify-center mb-4">
      <p-select
        [options]="themes"
        [(ngModel)]="theme"
        optionLabel="label"
        optionValue="value"
        placeholder="Select a theme"
        class="w-full sm:w-56"
      ></p-select>
    </div>
  `,
  styleUrls: ['./custom-footer.component.scss'],
  imports: [FormsModule, CommonModule, SelectModule],
})
export class CustomFooterComponent {
  @Input() themes: any;
  @Input() theme: any;
}

@Component({
  selector: 'app-shared-grid',
  imports: [AgGridAngular, FormsModule, CommonModule, SelectModule],
  templateUrl: './shared-grid.component.html',
  styleUrls: ['./shared-grid.component.scss']
})
export class SharedGridComponent implements OnInit, OnChanges {
  @Input() usertheme: any;
  @Input() data: any;
  @Input() column: any;

  themes = [
    { label: "themeQuartz", value: themeQuartz },
    { label: "themeBalham", value: themeBalham },
    { label: "themeAlpine", value: themeAlpine },
  ];

  private gridApi!: GridApi;
  rowData: any;
  columnDefs: ColDef[] = [];
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    editable: true,
  };
  theme: any = themeQuartz;
  statusBar = {
    statusPanels: [
      {
        statusPanel: 'agPaginationPanel',
        align: 'left',
      },
      {
        component: CustomFooterComponent,  // Use the CustomFooterComponent here
        align: 'right',
        params: {
          themes: this.themes,  // Pass themes to the component
          theme: this.theme,
        },
      },
    ],
  };

  ngOnInit(): void {
    this.theme = themeQuartz;
    console.log(this.theme, "-------------------------------");
    if (!this.column || this.column.length === 0) {
      this.columnDefs = this.generateDefaultColumns(this.rowData);
    }

    this.theme = this.usertheme ? this.usertheme : 'Alpine';
  }

  generateDefaultColumns(data: any[]): ColDef[] {
    if (data.length > 0) {
      return Object.keys(data[0]).map(key => ({
        headerName: key.charAt(0).toUpperCase() + key.slice(1),
        field: key
      }));
    }
    return [];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue !== this.rowData) {
      this.rowData = changes['data'].currentValue;
    }
    if (changes['column'] && changes['column'].currentValue !== this.columnDefs) {
      this.columnDefs = changes['column'].currentValue;
    }
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    console.log(params);
  }

  onCellValueChanged(event: any) {
    const updatedRow = event.data;
    console.log('Updated row:', updatedRow);
  }

  exportToCSV() {
    if (this.gridApi) {
      this.gridApi.exportDataAsCsv();
    }
  }
}
