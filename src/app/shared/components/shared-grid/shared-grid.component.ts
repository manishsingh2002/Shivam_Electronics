
import { Component, Input, OnInit, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { CellValueChangedEvent, ColDef, GridApi } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry, themeQuartz, colorSchemeDark } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';

ModuleRegistry.registerModules([AllCommunityModule]);

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
  @Output() dataChanged = new EventEmitter<any>(); // Create an Output event

  private gridApi!: GridApi;
  rowData: any;
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
    // rowBorder: { style: 'dotted', width: 3, color: '#9696C8' },
    columnBorder: { style: 'dashed', color: '#9696C8' },
  })


  CustomHeaderComponent = (params: any) => {
    return (
      `<div style="display: flex; align-items: center; gap: 8px;">
          <span>${params.displayName}</span>
          <i class="fas fa-user" style="color: #9696C8;"></i> <!-- Font Awesome icon -->
      </div>`
    );
  };

  gridOptions = {
    columnDefs: this.columnDefs,
    components: {
      customHeaderComponent: this.CustomHeaderComponent,
    },
  };

  ngOnInit(): void {
    if (!this.column || this.column.length === 0) {
      this.columnDefs = this.generateDefaultColumns(this.rowData);
    }
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

  onCellValueChanged(event: CellValueChangedEvent) {
    this.dataChanged.emit({ type: 'cellValueChanged', event });
  }

  onRowSelected(event: any) {
    this.dataChanged.emit({ type: 'rowSelected', event });
  }
  onCellClicked(event: any) {
    this.dataChanged.emit({ type: 'cellClicked', event });

  }

  onGridReady(event: any) {
    this.dataChanged.emit({ type: 'gridReady', event });
  }

  exportToCSV() {
    // CSV export logic
    this.dataChanged.emit({ type: 'exportCSV' });
  }
}


// theme = themeQuartz.withPart(colorSchemeDark).withParams({
//   fontFamily: 'serif',
//   headerFontFamily: 'Brush Script MT',
//   cellFontFamily: 'monospace',
//   wrapperBorder: false,
//   headerRowBorder: false,
//   rowBorder: false, // Disable default row borders (we'll use custom CSS)
//   columnBorder: { style: 'dashed', color: '#9696C8' },
//   backgroundColor: '#1E1E2F',
//   headerBackgroundColor: '#3E3E4F',
//   rowHoverColor: '#4E4E5F',
// });

// --------------
// import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
// import { ColDef, GridApi } from 'ag-grid-community';
// import { AllCommunityModule, ModuleRegistry, themeAlpine, themeBalham } from 'ag-grid-community';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';
// import { AgGridAngular } from 'ag-grid-angular';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { SelectModule } from 'primeng/select';
// import { themeQuartz, colorSchemeDark } from 'ag-grid-community';

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

//   themes = [
//     { label: "themeQuartz", value: themeQuartz },
//     { label: "themeBalham", value: themeBalham },
//     { label: "themeAlpine", value: themeAlpine },
//   ];

//   private gridApi!: GridApi;
//   rowData: any;
//   columnDefs: ColDef[] = [];
//   defaultColDef: ColDef = { sortable: true, filter: true, resizable: true, editable: true, };
//   theme: any = themeQuartz.withPart(colorSchemeDark)
//   // theme =themeQuartz
//   // .withPart(colorSchemeDark)
//   // .withParams({      backgroundColor: 'darkred',      accentColor: 'red',  });

//   ngOnInit(): void {
//     // this.theme = themeQuartz.withPart(colorSchemeDark);;
//     console.log(this.theme, "-------------------------------");
//     if (!this.column || this.column.length === 0) {
//       this.columnDefs = this.generateDefaultColumns(this.rowData);
//     }

//     this.theme = this.usertheme ? this.usertheme : 'Alpine';
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
//     if (changes['data'] && changes['data'].currentValue !== this.rowData) {
//       this.rowData = changes['data'].currentValue;
//     }
//     if (changes['column'] && changes['column'].currentValue !== this.columnDefs) {
//       this.columnDefs = changes['column'].currentValue;
//     }
//   }

//   onGridReady(params: any) {
//     this.gridApi = params.api;
//     console.log(params);
//   }

//   onCellValueChanged(event: any) {
//     const updatedRow = event.data;
//     console.log('Updated row:', updatedRow);
//   }

//   exportToCSV() {
//     if (this.gridApi) {
//       this.gridApi.exportDataAsCsv();
//     }
//   }
// }
