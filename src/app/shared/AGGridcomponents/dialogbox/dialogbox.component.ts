
import { Component, ChangeDetectorRef, Input } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Dialog } from 'primeng/dialog';
import { ApiService } from '../../../core/services/api.service';

interface CustomCellRendererParams extends ICellRendererParams {
  id?: string;
  dynamicComponent?: any; // Add dynamicComponent to CustomCellRendererParams
}

@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.scss'],
  imports: [Dialog, CommonModule, FormsModule],
})
export class DialogboxComponent implements ICellRendererAngularComp {

  @Input() id!: string;
  @Input() dynamicComponent: any; // Input to receive the dynamic component
  value: any;
  display: boolean = false;
  invoiceDetailData: any;

  constructor(private cdr: ChangeDetectorRef, private apiService: ApiService) { }

  agInit(params: CustomCellRendererParams): void {
    this.value = params.value;
    this.id = params.id || '';
    this.dynamicComponent = params.dynamicComponent || null; // Assign dynamicComponent to the component
  }

  refresh(params: CustomCellRendererParams): boolean {
    return false;
  }

  openDialog(): void {
    this.display = true;
    // if (this.id) {
    //   this.apiService.getinvoiceDataWithId(this.id).subscribe((res: any) => {
    //     this.invoiceDetailData = res.data;
    //     this.cdr.detectChanges();
    //   });
    // }
    this.cdr.detectChanges();
  }
}