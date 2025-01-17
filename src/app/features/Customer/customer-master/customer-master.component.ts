import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { ApiService } from '../../../core/services/api.service';
import { IftaLabelModule } from 'primeng/iftalabel';
import { SelectModule } from 'primeng/select';
@Component({
  selector: 'app-customer',
  templateUrl: './customer-master.component.html',
  styleUrls: ['./customer-master.component.scss'],
  imports:[FloatLabelModule,SelectModule,IftaLabelModule,TextareaModule,ButtonModule,InputTextModule,CommonModule,FormsModule,RouterModule]
})
export class CustomerMasterComponent {
  public customer = {
    fullname: '',
    email: '',
    status: 'pending',
    phoneNumbers: [{ number: '', type: 'mobile', primary: false }],
    addresses: [
      {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        type: 'home',
        isDefault: false,
      },
    ],
    cart: { items: [] },
    guaranteerId: '',
    totalPurchasedAmount: 0,
    remainingAmount: 0,
    paymentHistory: [],
    metadata: {},
  };

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
    { label: 'Work', value: 'work' },
  ];

  productdropdwn: any;

  constructor(
    private apiService: ApiService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const storedData = localStorage.getItem('autopopulate');
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          this.productdropdwn = parsedData.products || [];
        } catch (error) {
          console.error('Error parsing JSON from localStorage:', error);
          this.productdropdwn = [];
        }
      } else {
        console.log('No data found in localStorage for key "autopopulate"');
      }
    }
  }

  addPhoneNumber() {
    this.customer.phoneNumbers.push({
      number: '',
      type: 'mobile',
      primary: false,
    });
  }

  addAddress() {
    this.customer.addresses.push({
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      type: 'home',
      isDefault: false,
    });
  }

  saveCustomer() {
    console.log('Customer data:', this.customer);
    alert('Customer data saved successfully!');
  }
}

// import { Component, Inject, Input, PLATFORM_ID, SimpleChanges } from '@angular/core';
// import { FloatLabelModule } from 'primeng/floatlabel';
// import {  FormsModule,  ReactiveFormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { InputTextModule } from 'primeng/inputtext';
// import { ButtonModule } from 'primeng/button';
// import { TextareaModule } from 'primeng/textarea';
// import { ApiService } from '../../../core/services/api.service';
// import { Select } from 'primeng/select';
// import { isPlatformBrowser } from '@angular/common';
// import { IftaLabelModule } from 'primeng/iftalabel';

// interface PhoneNumber {
//   number: string;
//   type: 'home' | 'mobile' | 'work';
//   primary: boolean;
// }

// interface Address {
//   street: string;
//   city: string;
//   state: string;
//   zipCode: string;
//   country: string;
//   type: 'billing' | 'shipping' | 'home' | 'work';
//   isDefault: boolean;
// }

// interface Customer {
//   customerId?: string;
//   email: string;
//   firstName: string;
//   lastName: string;
//   birthDate: Date;
//   phoneNumbers: PhoneNumber[];
//   addresses: Address[];
//   preferences: {
//     marketingEmails: boolean;
//     communicationLanguage: string;
//     currency: string;
//     newsletterSubscription: boolean;
//     productNotifications: boolean;
//   };
//   metadata?: any;
// }


// @Component({
//   selector: 'app-customer-master',
//   imports: [FloatLabelModule,IftaLabelModule, Select, FormsModule, CommonModule, ReactiveFormsModule, RouterModule, InputTextModule, TextareaModule, ButtonModule],
//   templateUrl: './customer-master.component.html',
//   styleUrl: './customer-master.component.scss'
// })
// export class CustomerMasterComponent {
//   productdropdwn: any;
// constructor(private apiService: ApiService, @Inject(PLATFORM_ID) private platformId: Object) { }
// customer = {
//   fullname: '',
//   email: '',
//   status: 'pending',
//   phoneNumbers: [{ number: '', type: 'mobile', primary: false }],
//   addresses: [{
//     street: '',
//     city: '',
//     state: '',
//     zipCode: '',
//     country: '',
//     type: 'home',
//     isDefault: false,
//   }],
//   cart: { items: [] },
//   guaranteerId: '',
//   totalPurchasedAmount: 0,
//   remainingAmount: 0,
//   paymentHistory: [],
//   metadata: {},
// };

// statuses = [
//   { label: 'Active', value: 'active' },
//   { label: 'Inactive', value: 'inactive' },
//   { label: 'Pending', value: 'pending' },
//   { label: 'Suspended', value: 'suspended' },
//   { label: 'Blocked', value: 'blocked' },
// ];

// phoneTypes = [
//   { label: 'Home', value: 'home' },
//   { label: 'Mobile', value: 'mobile' },
//   { label: 'Work', value: 'work' },
// ];

// addressTypes = [
//   { label: 'Billing', value: 'billing' },
//   { label: 'Shipping', value: 'shipping' },
//   { label: 'Home', value: 'home' },
//   { label: 'Work', value: 'work' },
// ];



// ngOnInit() {
//   if (isPlatformBrowser(this.platformId)) {
//     const storedData = localStorage.getItem('autopopulate');
//     if (storedData) {
//       try {
//         const parsedData = JSON.parse(storedData); // Parse the JSON string
//         this.productdropdwn = parsedData.products || []; // Access the products array (or empty array if not present)
//         console.log(this.productdropdwn);
//       } catch (error) {
//         console.error('Error parsing JSON from localStorage:', error);
//         this.productdropdwn = [];
//       }
//     } else {
//       console.log('No data found in localStorage for key "autopopulate"');
//     }
//   }
// } 

// // Add a new phone number field
// addPhoneNumber() {
//   this.customer.phoneNumbers.push({
//     number: '',
//     type: 'mobile',
//     primary: false,
//   });
// }

// // Add a new address field
// addAddress() {
//   this.customer.addresses.push({
//     street: '',
//     city: '',
//     state: '',
//     zipCode: '',
//     country: '',
//     type: 'home',
//     isDefault: false,
//   });
// }

// // Save customer data (mock function)
// saveCustomer() {
//   console.log('Customer data:', this.customer);
//   alert('Customer data saved successfully!');
// }
// }