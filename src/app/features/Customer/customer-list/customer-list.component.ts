
import { ApiService } from '../../../core/services/api.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { CommonModule } from '@angular/common';
import { FileUpload } from 'primeng/fileupload';
import { SelectModule } from 'primeng/select';
import { Tag } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Table } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppMessageService } from '../../../core/services/message.service';
import { error } from 'console';
export interface CartItem {
    customerId: string;
    invoiceIds: string[];
    _id?: string;
}

interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}

interface ExportColumn {
    title: string;
    dataKey: string;
}

export interface PhoneNumber {
    number: string;
    type: 'home' | 'mobile' | 'work';
    primary: boolean;
    _id?: string;
}

export interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    type: 'billing' | 'shipping' | 'home' | 'work';
    isDefault: boolean;
    _id?: string;
}

export interface Customer {
    _id: string;
    //   createdAt: Date;
    updatedAt: Date;
    status: 'active' | 'inactive' | 'pending' | 'suspended' | 'blocked';
    email: string;
    fullname: string;
    phoneNumbers: PhoneNumber[];
    addresses: Address[];
    cart: {
        items: CartItem[];
    };
    guarantorId?: string;
    totalPurchasedAmount: number;
    remainingAmount: number;
    paymentHistory: Payment[];
    metadata: Map<string, any>;
}

export interface Payment {
    _id: string;
    amount: number;
    currency: string;
    status: string;
    createdAt: Date;
}

export interface Invoice {
    _id: string;
    amount: number;
    createdAt: Date;
}
@Component({
    selector: 'app-customer-list',
    imports: [TableModule, Dialog, ButtonModule, SelectModule, ToastModule, ToolbarModule, ConfirmDialog, InputTextModule, TextareaModule, CommonModule, FileUpload, Tag, InputTextModule, FormsModule, IconFieldModule, InputIconModule],
    providers: [MessageService, ConfirmationService, ApiService],
    templateUrl: './customer-list.component.html',
    styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent {
    checkedCustomer(customer: any) {
    }
    loading: boolean = true;

    @ViewChild('dt') dt!: Table;
    customerDialog: boolean = false;
    customers: any[] = [];
    customer: any = [];
    selectedcustomers: any[] = [];
    submitted: boolean = false;
    statuses: any[] = [];
    cols: Column[] = [];
    exportColumns: ExportColumn[] = [];
    redirectedcustomer: any;
    customersdropdowndata: any[] = []
    constructor(
        private router: Router,
        private apiService: ApiService,
        private messageService: AppMessageService,
        private confirmationService: ConfirmationService,
        private cd: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.customerDropDownData()
        this.loadDemoData()
    }

    customerDropDownData() {
        this.apiService.getCustomerDropDown().subscribe((res: any) => {
            if (res.data) {
                this.customersdropdowndata = res.data
            }
        }, (error: any) => {
            console.error(error)
        })
    }

    vierCustomer(customerId: any) {
        this.router.navigate(['/customer', customerId._id]);
    }

    filterSearch(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.dt.filterGlobal(input.value, 'contains');
    }

    exportCSV() {
        this.dt.exportCSV();
    }


    loadDemoData() {
        this.apiService.getAllCustomerData().subscribe((res: any) => {
            this.customers = res.data;
            this.cd.markForCheck();
            this.loading = false
        })
        this.cols = [
            { field: 'code', header: 'Code', customExportHeader: 'customer Code' },
            { field: 'fullname', header: 'fullname' },
            { field: 'email', header: 'email' },
            { field: 'remainingAmount', header: 'remainingAmount' },
            { field: 'guaranteerId', header: 'guaranteerId' },
            { field: 'status', header: 'status' }
        ];
        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }

    openNew() {
        this.customer = {};
        this.submitted = false;
        this.customerDialog = true;
    }

    editcustomer(customer: any) {
        this.customer = { ...customer };
        this.redirectedcustomer = { ...customer };
        this.customerDialog = true;
    }



    hideDialog() {
        this.customerDialog = false;
        this.submitted = false;
    }

    getSeverity(status: string) {
        switch (status) {
            case 'active':
                return 'success';
            case 'inactive':
                return 'danger';
            case 'pending':
                return 'contrast';
            default:
                return 'success';
        }
    }
    deleteSelectedcustomers() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selectedcustomers?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                const ids = this.selectedcustomers ? this.selectedcustomers.map(customer => customer.id) : []; // Extract IDs
                this.apiService.deleteCustomers(ids).subscribe({
                    next: (res: any) => {
                        this.customers = this.customers.filter(customer => !ids.includes(customer.id));
                        this.loadDemoData();
                        this.messageService.handleResponse(res, 'Customers Deleted', 'Selected customers were successfully deleted.'); // Use handleResponse
                    },
                    error: (err) => {
                        console.error('Deletion Error:', err);
                        this.messageService.handleError(err, 'Deletion Failed'); // Use handleError for errors
                    }
                });
                this.selectedcustomers = [];
            }
        });
    }
    deletecustomer(customer: any) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + customer.fullname + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.apiService.deleteCustomerID(customer._id).subscribe({
                    next: (res: any) => {
                        this.loadDemoData();
                        this.messageService.handleResponse(res, 'Customer Deleted', `${customer.fullname} successfully deleted.`); // Use handleResponse
                    },
                    error: (err) => {
                        console.error('Deletion Error:', err);
                        this.messageService.handleError(err, 'Deletion Failed'); // Use handleError for errors
                    }
                });
            }
        });
    }


}