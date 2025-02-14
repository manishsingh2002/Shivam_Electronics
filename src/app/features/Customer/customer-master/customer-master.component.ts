
import { IftaLabelModule } from 'primeng/iftalabel';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ApiService } from '../../../core/services/api.service';
import { Component, Inject, OnInit, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { CardModule } from 'primeng/card';
import { SelectModule } from 'primeng/select';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { RadioButtonModule } from 'primeng/radiobutton';
import { KeyFilterModule } from 'primeng/keyfilter';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
// import { SupabaseService } from '../../../core/services/supabase.service';
import lodash from 'lodash'
@Component({
  selector: 'app-customer',
  templateUrl: './customer-master.component.html',
  styleUrls: ['./customer-master.component.scss'],
  imports: [CardModule, RouterModule, FormsModule, CommonModule, TagModule, DialogModule, KeyFilterModule, TableModule, RadioButtonModule, InputTextModule, ButtonModule, SelectModule, FileUploadModule, ImageModule,],
  providers: [ApiService, IftaLabelModule, ConfirmationService, MessageService],
})

export class CustomerMasterComponent implements OnInit {
  selectedFile: File | null = null;
  imageUrl: string | null = null;
  bucketName = 'manish';
  phoneDialogVisible = false;
  newPhoneNumber: any = {};
  customerId: string = '12345'; // You should dynamically get this from your application (e.g., logged-in user's customer ID)
  uploadStatus: string = ''; // For showing the status of the upload
  addressdialogvisible: boolean = false;
  customerIDDropdown: any[] = []
  selectedGuaranter: any = ''

  statuses = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
    { label: 'Pending', value: 'pending' },
    { label: 'Suspended', value: 'suspended' },
    { label: 'Blocked', value: 'blocked' },
  ];

  phoneTypes = [
    { label: 'Home', value: 'home' },
    { label: 'Mobile', value: 'mobile' },
    { label: 'Work', value: 'work' },
  ];

  addressTypes = [
    { label: 'Billing', value: 'billing' },
    { label: 'Shipping', value: 'shipping' },
    { label: 'Home', value: 'home' },
    { label: 'Work', value: 'work' }
  ];

  newAddress = {
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    type: 'home',
    isDefault: false
  };

  customer: any = {
    fullname: '',
    profileImg: '',
    email: '',
    status: '',
    phoneNumbers: [],
    addresses: [],
    cart: { items: [] },
    guaranteerId: this.selectedGuaranter._id,
    totalPurchasedAmount: 0,
    remainingAmount: 0,
    paymentHistory: [],
    metadata: {},
  };


  constructor(
    // private supabase: SupabaseService,
    private ApiService: ApiService,
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.autopopulatedata()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.autopopulatedata();
  }

  autopopulatedata() {
    const autopopulate: any = JSON.parse(sessionStorage.getItem('autopopulate') || '{}');

    if (autopopulate && Array.isArray(autopopulate.customersdrop)) {
      this.customerIDDropdown = lodash.cloneDeep(autopopulate.customersdrop)
    } else {
      this.customerIDDropdown = [];
      this.messageService.add({
        severity: 'info',
        summary: 'Info',
        detail: 'No valid customer data found',
        life: 3000
      });
    }

    // Ensure future updates also enforce an array
    setTimeout(() => {
      if (!Array.isArray(this.customerIDDropdown)) {
        console.error('Corrupted Dropdown Data. Resetting...');
        this.customerIDDropdown = [];
      }
    }, 500);

  }

  selectedGuaranterevent(event: any) {
  }

  // onFileSelected(event: any) {
  //   this.selectedFile = event.target.files[0] as File;
  // }

  getCustomerID() {
    const customerId = 'your-customer-id';
    this.ApiService.getCustomerDataWithId(customerId)
      .subscribe({
        next: (customer) => {
          this.customer = customer;
        },
        error: (err) => {
          console.error('Error fetching customer:', err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load customer data.' });
        }
      });
  }


  handleFileSelect(event?: any) {
    const file = event.files[0];
    if (file) {
      this.uploadStatus = 'Preparing to upload...';
      const formData = new FormData();
      formData.append('image', file); // Append the selected file to FormData
      // this.ApiService.uploadProfileImage(formData, this.customerId).subscribe(
      //   (response: any) => {
      //     this.uploadStatus = 'Image uploaded successfully!';
      //   },
      //   (error: any) => {
      //     this.uploadStatus = 'Error uploading image.';
      //     console.error('Upload Error:', error);
      //   }
      // );
    } else {
    }
  }

  handleFileUpload(event: any) {
  }



  saveCustomer() {
    if (this.validateCustomer()) {
      this.customer.guaranteerId = this.selectedGuaranter._id
      this.ApiService.createNewCustomer(this.customer).subscribe(
        (response: any) => {
          const customerId = response.data._id;
          this.customerId = customerId;
          // this.handleFileSelect();
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create customer.' });
        }
      );
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please correct the errors in the form.' });
    }
  }


  validateCustomer(): boolean {
    // Basic validation checks
    if (!this.customer.fullname) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Fullname is required.' });
      return false;
    }

    if (!this.customer.email || !this.customer.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please enter a valid email address.' });
      return false;
    }

    return true;
  }

  showPhoneDialog() {
    this.phoneDialogVisible = true;
  }
  showAddressdialog() {
    this.addressdialogvisible = true
  }

  addPhoneNumber() {
    if (this.newPhoneNumber.number && this.newPhoneNumber.type) {
      this.customer.phoneNumbers.push(this.newPhoneNumber);
      this.phoneDialogVisible = false;
      this.newPhoneNumber = {};
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please enter phone number and type.' });
    }
  }

  deletePhone(index: number) {
    this.customer.phoneNumbers.splice(index, 1);
  }

  addAddress() {
    this.addressdialogvisible = true
    if (this.newAddress.street && this.newAddress.city) {
      this.customer.addresses.push({ ...this.newAddress });
      this.newAddress = { street: '', city: '', state: '', zipCode: '', country: '', type: 'home', isDefault: false };
    }
  }

  setDefaultAddress(index: number) {
    this.customer.addresses.forEach((address: { isDefault: boolean; }, i: any) => address.isDefault = i === index);
  }

  removeAddress(index: number) {
    this.customer.addresses.splice(index, 1);
  }
}
