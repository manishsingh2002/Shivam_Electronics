import { Component, OnInit, ViewChild, Inject, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { CardModule } from 'primeng/card';
import { SelectModule } from 'primeng/select';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { RadioButtonModule } from 'primeng/radiobutton';
import { KeyFilterModule } from 'primeng/keyfilter';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';
import { FocusTrapModule } from 'primeng/focustrap';
import { ConfirmationService, MessageService } from 'primeng/api';

import { ApiService } from '../../../core/services/api.service';
import lodash from 'lodash';
interface Seller {
  name: string;
  prifile: string;
  shopname: string;
  address: string;
  status: string,
  gstin: string;
  pan: string;
  contactNumber: string;
  salesHistory: any[];
}

interface Phone {
  number: string;
  type: string;
  primary: boolean;
}

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  type: string;
  isDefault: boolean;
}

interface DropdownOption {
  label: string;
  value: any;
}


@Component({
  selector: 'app-seller-master',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CardModule,
    SelectModule,
    FileUploadModule,
    ImageModule,
    InputTextModule,
    TableModule,
    RadioButtonModule,
    KeyFilterModule,
    DialogModule,
    ButtonModule,
    CheckboxModule,
    TooltipModule,
    FocusTrapModule,
  ],
  providers: [ApiService, ConfirmationService, MessageService],
  templateUrl: './sellers.component.html',
  styleUrl: './sellers.component.scss'
})
export class SellersComponent implements OnInit {
  selectedFile: File | null = null;
  imageUrl: string | null = null;
  bucketName = 'manish';
  phoneDialogVisible = false;
  addressDialogVisible = false;
  newPhoneNumber: Phone = { number: '', type: 'mobile', primary: false };
  newAddress: Address = { street: '', city: '', state: '', zipCode: '', country: '', type: 'home', isDefault: false };
  sellerId: string = '12345'; // You should dynamically get this from your application
  uploadStatus: string = ''; // For showing the status of the upload
  isDarkMode: boolean = false;

  statuses: DropdownOption[] = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
    { label: 'Pending', value: 'pending' },
    { label: 'Suspended', value: 'suspended' },
    { label: 'Blocked', value: 'blocked' },
  ];

  // phoneTypes: DropdownOption[] = [
  //   { label: 'Home', value: 'home' },
  //   { label: 'Mobile', value: 'mobile' },
  //   { label: 'Work', value: 'work' },
  // ];

  // addressTypes: DropdownOption[] = [
  //   { label: 'Billing', value: 'billing' },
  //   { label: 'Shipping', value: 'shipping' },
  //   { label: 'Home', value: 'home' },
  //   { label: 'Work', value: 'work' }
  // ]

  phoneTypes: DropdownOption[] = [
    { label: 'Home', value: 'home' },
    { label: 'Mobile', value: 'mobile' },
    { label: 'Work', value: 'work' },
  ];

  addressTypes: DropdownOption[] = [
    { label: 'Billing', value: 'billing' },
    { label: 'Shipping', value: 'shipping' },
    { label: 'Home', value: 'home' },
    { label: 'Work', value: 'work' }
  ];


  seller: Seller = {
    name: '',
    prifile: '',
    shopname: '',
    address: '',
    gstin: '',
    status: '',
    pan: '',
    contactNumber: '',
    salesHistory: [],
  };

  @ViewChild('fileUploader') fileUploader!: FileUpload;


  constructor(
    // private supabase: SupabaseService,
    private ApiService: ApiService,
    private http: HttpClient,
    private messageService: MessageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isDarkMode = (isPlatformBrowser(this.platformId)) && localStorage.getItem('darkMode') === 'true';
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    }
  }

  ngOnInit() {
    // this.autopopulatedata() // if you have any autopopulate data for seller
  }

  ngOnChanges(changes: SimpleChanges): void {
    //this.autopopulatedata(); // if you have any autopopulate data for seller
  }

  // autopopulatedata() { // if you have any autopopulate data for seller
  // }


  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('darkMode', String(this.isDarkMode));
    }
  }


  getSellerID() {
    // const sellerId = 'your-seller-id'; // replace with actual seller ID retrieval logic
    // this.ApiService.getSellerDataWithId(sellerId) // Assuming you have this API service method
    //   .subscribe({
    //     next: (seller) => {
    //       this.seller = seller;
    //     },
    //     error: (err) => {
    //       console.error('Error fetching seller:', err);
    //       this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load seller data.' });
    //     }
    //   });
  }


  handleFileSelect(event?: any) {
    const file = event.files[0];
    if (file) {
      this.uploadStatus = 'Preparing to upload...';
      const formData = new FormData();
      formData.append('image', file); // Append the selected file to FormData
      // this.ApiService.uploadSellerProfileImage(formData, this.sellerId).subscribe( // Assuming you have this API service method
      //  (response: any) => {
      //    this.uploadStatus = 'Image uploaded successfully!';
      //  },
      //  (error: any) => {
      //    this.uploadStatus = 'Error uploading image.';
      //    console.error('Upload Error:', error);
      //  }
      // );
    } else {
    }
  }

  handleFileUpload(event: any) {
  }



  saveSeller() {
    // if (this.validateSeller()) {
    //   this.ApiService.createNewSeller(this.seller).subscribe( // Assuming you have this API service method
    //     (response: any) => {
    //       const sellerId = response.data._id;
    //       this.sellerId = sellerId;
    //       // this.handleFileSelect(); // if you want to upload profile image after save seller info
    //     },
    //     (error) => {
    //       this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create seller.' });
    //     }
    //   );
    // } else {
    //   this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please correct the errors in the form.' });
    // }
  }


  validateSeller(): boolean {
    // Basic validation checks
    if (!this.seller.name) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Seller Name is required.' });
      return false;
    }

    if (!this.seller.shopname) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Shop Name is required.' });
      return false;
    }
    if (!this.seller.address) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Address is required.' });
      return false;
    }
    if (!this.seller.gstin) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'GSTIN is required.' });
      return false;
    }
    if (!this.seller.pan) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'PAN is required.' });
      return false;
    }
    if (!this.seller.contactNumber) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Contact Number is required.' });
      return false;
    }
    // Add more validations as needed, for example, GSTIN and PAN format validations can be added here if not handled by backend

    return true;
  }

  showPhoneDialog() {
    this.phoneDialogVisible = true;
  }
  showAddressDialog() {
    this.addressDialogVisible = true
  }

  addPhoneNumber() {
    if (this.newPhoneNumber.number && this.newPhoneNumber.type) {
      // Seller doesn't have phone numbers in schema, decide if you want to add them and how to store/use them
      this.phoneDialogVisible = false;
      this.newPhoneNumber = { number: '', type: 'mobile', primary: false };
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please enter phone number and type.' });
    }
  }

  deletePhone(index: number) {
    // Seller doesn't have phone numbers in schema, decide if you want to implement phone number management
  }

  addAddress() {
    this.addressDialogVisible = true
    if (this.newAddress.street && this.newAddress.city) {
      // Seller has address as a single string in schema, decide how to handle structured addresses
      this.seller.address = `${this.newAddress.street}, ${this.newAddress.city}, ${this.newAddress.state} ${this.newAddress.zipCode}, ${this.newAddress.country}`; // Example of combining address fields into single string
      this.addressDialogVisible = false;
      this.newAddress = { street: '', city: '', state: '', zipCode: '', country: '', type: 'home', isDefault: false };
    }
  }

  setDefaultAddress(index: number) {
    // Seller has single address field, default address concept might not be directly applicable
  }

  removeAddress(index: number) {
    // Seller has single address field, address removal might not be directly applicable in the same way as customer addresses
  }
}