
import { Component } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { CustomerMasterComponent } from './customer-master.component';
interface PhoneNumber {
  number: string;
  type: 'home' | 'mobile' | 'work';
  primary: boolean;
}

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  type: 'billing' | 'shipping' | 'home' | 'work';
  isDefault: boolean;
}

interface Customer {
  customerId?: string;
  email: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: 'male' | 'female' | 'other' | 'prefer not to say';
  phoneNumbers: PhoneNumber[];
  addresses: Address[];
  preferences: {
    marketingEmails: boolean;
    communicationLanguage: string;
    currency: string;
    newsletterSubscription: boolean;
    productNotifications: boolean;
  };
  metadata?: any;
}


@Component({
  selector: 'app-customer-master',
  imports: [FormsModule,
    ReactiveFormsModule],
  templateUrl: './customer-master.component.html',
  styleUrl: './customer-master.component.scss'
})
export class CustomerMasterComponent {
 
  customer: Customer = {
    email: '',
    firstName: '',
    lastName: '',
    birthDate: new Date(),
    
    gender: 'prefer not to say',
    phoneNumbers: [{ number: '', type: 'home', primary: false }],
    addresses: [{ street: '', city: '', state: '', zipCode: '', country: '', type: 'billing', isDefault: false }],
    preferences: {
      marketingEmails: true,
      communicationLanguage: 'en',
      currency: 'USD',
      newsletterSubscription: false,
      productNotifications: true,
    },
    metadata: null,
  };
  genders = ['male', 'female', 'other', 'prefer not to say'];
  phoneTypes = ['home', 'mobile', 'work'];
  addressTypes = ['billing', 'shipping', 'home', 'work'];
  communicationLanguages = ['en', 'es', 'fr', 'de', 'zh'];
  currencies = ['USD', 'EUR', 'GBP', 'JPY'];

  addPhoneNumber() {
    this.customer.phoneNumbers.push({ number: '', type: 'home', primary: false });
  }

  removePhoneNumber(index: number) {
    this.customer.phoneNumbers.splice(index, 1);
  }

  addAddress() {
    this.customer.addresses.push({ street: '', city: '', state: '', zipCode: '', country: '', type: 'billing', isDefault: false });
  }

  removeAddress(index: number) {
    this.customer.addresses.splice(index, 1);
  }

  onSubmit() {
    console.log(this.customer);
    // Submit this.customer to your backend
  }
}