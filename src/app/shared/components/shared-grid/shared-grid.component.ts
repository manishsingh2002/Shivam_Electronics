


import { Component, Input, OnInit, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { CellValueChangedEvent, ColDef, GridApi, GridReadyEvent, RowSelectedEvent, CellClickedEvent } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry, themeQuartz, colorSchemeDark } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';

ModuleRegistry.registerModules([AllCommunityModule]); // ✅ FIXED: Now passing an array

@Component({
  selector: 'app-shared-grid',
  imports: [AgGridAngular, FormsModule, CommonModule, SelectModule],
  templateUrl: './shared-grid.component.html',
  styleUrls: ['./shared-grid.component.scss'],
  standalone: true // Make it a standalone component for easier use
})
export class SharedGridComponent implements OnInit, OnChanges {

  @Input() usertheme: any;
  @Input() data: any;
  @Input() rowSelectionMode: any;
  @Input() column: any;
  @Output() dataChanged = new EventEmitter<any>();

  @Output() eventFromGrid = new EventEmitter<any>();
  // @Output() cellValueChanged = new EventEmitter<CellValueChangedEvent>();
  // @Output() rowSelected = new EventEmitter<RowSelectedEvent>();
  // @Output() cellClicked = new EventEmitter<CellClickedEvent>();
  @Output() gridReady = new EventEmitter<GridReadyEvent>();

  private gridApi!: GridApi;
  rowData: any[] = [];
  columnDefs: ColDef[] = [];
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    editable: true,
  };

  theme = themeQuartz.withPart(colorSchemeDark).withParams({
    fontFamily: 'Kanit',
    headerFontFamily: 'Kanit',
    cellFontFamily: 'monospace',
    wrapperBorder: false,
    headerRowBorder: false,
    columnBorder: { style: 'dashed', color: '#9696C8' },
  });

  rowSelection: any;

  ngOnInit(): void {
    if (!this.column || this.column.length === 0) {
      this.columnDefs = this.generateDefaultColumns(this.rowData);
    } else {
      this.columnDefs = this.column; // Use input columns directly
    }

    this.rowSelection = {
      mode: this.rowSelectionMode // Use the input row selection mode
    };
  }

  generateDefaultColumns(data: any[]): ColDef[] {
    if (data && data.length > 0) { // Check if data is valid and has length
      return Object.keys(data[0]).map(key => ({
        headerName: key.charAt(0).toUpperCase() + key.slice(1),
        field: key
      }));
    }
    return [];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      this.rowData = Array.isArray(changes['data'].currentValue)
        ? changes['data'].currentValue
        : [];
    }
    if (changes['column'] && changes['column'].currentValue) {
      this.columnDefs = changes['column'].currentValue;
    }
    if (changes['rowSelectionMode'] && changes['rowSelectionMode'].currentValue) {
      this.rowSelection = { mode: changes['rowSelectionMode'].currentValue };
    }
  }

  onCellValueChanged(event: CellValueChangedEvent) {
    // this.cellValueChanged.emit(event)
    this.eventFromGrid.emit({ "eventType": 'onCellValueCHanged', 'event': event });
  }

  onRowSelected(event: RowSelectedEvent) {
    this.eventFromGrid.emit({ "eventType": 'RowSelectedEvent', 'event': event });

    // this.rowSelected.emit(event); // Emit rowSelected event
  }

  onCellClicked(event: CellClickedEvent) {
    this.eventFromGrid.emit({ "eventType": 'CellClickedEvent', 'event': event });
    // this.cellClicked.emit(event);
  }

  onGridReady(event: GridReadyEvent) {
    this.eventFromGrid.emit({ "eventType": 'GridReadyEvent', 'event': event });

    // this.gridReady.emit(event); // Emit gridReady event
  }

  exportToCSV() {
    this.gridApi.exportDataAsCsv();
  }

  onGridApiReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridReady.emit(params); // Also emit gridReady when Grid API is ready
  }
}

// //////////////////////////////////////////////////

// import { Component, Input, OnInit, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
// import { CellValueChangedEvent, ColDef, GridApi } from 'ag-grid-community';
// import { AllCommunityModule, ModuleRegistry, themeQuartz, colorSchemeDark } from 'ag-grid-community';
// import { AgGridAngular } from 'ag-grid-angular';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { SelectModule } from 'primeng/select';

// ModuleRegistry.registerModules([AllCommunityModule]);

// @Component({
//   selector: 'app-shared-grid',
//   imports: [AgGridAngular, FormsModule, CommonModule, SelectModule],
//   templateUrl: './shared-grid.component.html',
//   styleUrls: ['./shared-grid.component.scss']
// })
// export class SharedGridComponent implements OnInit, OnChanges {
//   @Input() usertheme: any;
//   @Input() data: any;
//   @Input() column: any;
//   @Output() dataChanged = new EventEmitter<any>(); // Create an Output event

//   private gridApi!: GridApi;
//   rowData: any[] = [];
//   columnDefs: ColDef[] = [];
//   defaultColDef: ColDef = {
//     sortable: true,
//     filter: true,
//     resizable: true,
//     editable: true,
//   };

//   theme = themeQuartz.withPart(colorSchemeDark).withParams({
//     fontFamily: 'Kanit',
//     headerFontFamily: 'Kanit',
//     cellFontFamily: 'monospace',
//     wrapperBorder: false,
//     headerRowBorder: false,
//     // rowBorder: { style: 'dotted', width: 3, color: '#9696C8' },
//     columnBorder: { style: 'dashed', color: '#9696C8' },
//   })
//   rowSelection: any;



//   ngOnInit(): void {
//     if (!this.column || this.column.length === 0) {
//       this.columnDefs = this.generateDefaultColumns(this.rowData);
//     }

//     this.rowSelection = {
//       mode: 'singleRow'
//     };
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

//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['data'] && changes['data'].currentValue) {
//       this.rowData = Array.isArray(changes['data'].currentValue)
//         ? changes['data'].currentValue
//         : [];
//     }
//     if (changes['column'] && changes['column'].currentValue) {
//       this.columnDefs = changes['column'].currentValue;
//     }
//   }

//   onCellValueChanged(event: CellValueChangedEvent) {
//     this.dataChanged.emit({ type: 'cellValueChanged', event });
//   }

//   onRowSelected(event: any) {
//     this.dataChanged.emit({ type: 'rowSelected', event });
//   }
//   onCellClicked(event: any) {
//     this.dataChanged.emit({ type: 'cellClicked', event });

//   }

//   onGridReady(event: any) {
//     this.dataChanged.emit({ type: 'gridReady', event });
//   }

//   exportToCSV() {
//     // CSV export logic
//     this.dataChanged.emit({ type: 'exportCSV' });
//   }
// }

//   // ngOnChanges(changes: SimpleChanges): void {
//   //   if (changes['data'] && changes['data'].currentValue !== this.rowData) {
//   //     this.rowData = changes['data'].currentValue;
//   //   }
//   //   if (changes['column'] && changes['column'].currentValue !== this.columnDefs) {
//   //     this.columnDefs = changes['column'].currentValue;
//   //   }
//   // }


// // theme = themeQuartz.withPart(colorSchemeDark).withParams({
// //   fontFamily: 'serif',
// //   headerFontFamily: 'Brush Script MT',
// //   cellFontFamily: 'monospace',
// //   wrapperBorder: false,
// //   headerRowBorder: false,
// //   rowBorder: false, // Disable default row borders (we'll use custom CSS)
// //   columnBorder: { style: 'dashed', color: '#9696C8' },
// //   backgroundColor: '#1E1E2F',
// //   headerBackgroundColor: '#3E3E4F',
// //   rowHoverColor: '#4E4E5F',
// // });

// // --------------
// // import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
// // import { ColDef, GridApi } from 'ag-grid-community';
// // import { AllCommunityModule, ModuleRegistry, themeAlpine, themeBalham } from 'ag-grid-community';
// // import 'ag-grid-community/styles/ag-grid.css';
// // import 'ag-grid-community/styles/ag-theme-alpine.css';
// // import { AgGridAngular } from 'ag-grid-angular';
// // import { FormsModule } from '@angular/forms';
// // import { CommonModule } from '@angular/common';
// // import { SelectModule } from 'primeng/select';
// // import { themeQuartz, colorSchemeDark } from 'ag-grid-community';

// // ModuleRegistry.registerModules([AllCommunityModule]);

// // @Component({
// //   selector: 'app-shared-grid',
// //   imports: [AgGridAngular, FormsModule, CommonModule, SelectModule],
// //   templateUrl: './shared-grid.component.html',
// //   styleUrls: ['./shared-grid.component.scss']
// // })

// // export class SharedGridComponent implements OnInit, OnChanges {
// //   @Input() usertheme: any;
// //   @Input() data: any;
// //   @Input() column: any;

// //   themes = [
// //     { label: "themeQuartz", value: themeQuartz },
// //     { label: "themeBalham", value: themeBalham },
// //     { label: "themeAlpine", value: themeAlpine },
// //   ];

// //   private gridApi!: GridApi;
// //   rowData: any;
// //   columnDefs: ColDef[] = [];
// //   defaultColDef: ColDef = { sortable: true, filter: true, resizable: true, editable: true, };
// //   theme: any = themeQuartz.withPart(colorSchemeDark)
// //   // theme =themeQuartz
// //   // .withPart(colorSchemeDark)
// //   // .withParams({      backgroundColor: 'darkred',      accentColor: 'red',  });

// //   ngOnInit(): void {
// //     // this.theme = themeQuartz.withPart(colorSchemeDark);;
// //     console.log(this.theme, "-------------------------------");
// //     if (!this.column || this.column.length === 0) {
// //       this.columnDefs = this.generateDefaultColumns(this.rowData);
// //     }

// //     this.theme = this.usertheme ? this.usertheme : 'Alpine';
// //   }

// //   generateDefaultColumns(data: any[]): ColDef[] {
// //     if (data.length > 0) {
// //       return Object.keys(data[0]).map(key => ({
// //         headerName: key.charAt(0).toUpperCase() + key.slice(1),
// //         field: key
// //       }));
// //     }
// //     return [];
// //   }

// //   ngOnChanges(changes: SimpleChanges): void {
// //     if (changes['data'] && changes['data'].currentValue !== this.rowData) {
// //       this.rowData = changes['data'].currentValue;
// //     }
// //     if (changes['column'] && changes['column'].currentValue !== this.columnDefs) {
// //       this.columnDefs = changes['column'].currentValue;
// //     }
// //   }

// //   onGridReady(params: any) {
// //     this.gridApi = params.api;
// //     console.log(params);
// //   }

// //   onCellValueChanged(event: any) {
// //     const updatedRow = event.data;
// //     console.log('Updated row:', updatedRow);
// //   }

// //   exportToCSV() {
// //     if (this.gridApi) {
// //       this.gridApi.exportDataAsCsv();
// //     }
// //   }
// // }
