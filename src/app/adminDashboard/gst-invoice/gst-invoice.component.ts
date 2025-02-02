import { Component } from '@angular/core';

export interface GSTPageData {
    invoiceNo: string;
    invoiceDate: Date | string; // Can be Date object or string
    dueDate: Date | string | null; // Nullable due date
    billedDate: Date | string | null;
    businessLogo: string; // URL or path to logo
    billedBy: BusinessDetails;
    billedTo: BusinessDetails;
    currency: string;
    items: GSTItem[];
    roundUp: boolean;
    roundDown: boolean;
    additionalCharges: AdditionalCharge[];
    subTotal: number;
    sgstTotal: number;
    cgstTotal: number;
    total: number;
    totalInWords: string; // Optional
    // ... any other fields specific to your GST page
  }
  
  export interface BusinessDetails {
    country: string;
    state: string;
    businessName: string;
    phone: string;
    email: string;
    gstin: string;
    address: string;
    city: string;
    postalCode: string;
    additionalEmails: string[];
    pan: string;
  }
  
  export interface GSTItem {
    item: string;
    gst: number;
    quantity: number;
    rate: number;
    amount: number;
    cgst: number;
    sgst: number;
    total: number;
    product?: any; // If you're using product references
  }
  
  export interface AdditionalCharge {
    description: string;
    amount: number;
  }
    
@Component({
    selector: 'app-gst-invoice',
    imports: [],
    templateUrl: './gst-invoice.component.html',
    styleUrl: './gst-invoice.component.scss'
})
export class GstInvoiceComponent {

    gstData: GSTPageData = { 
        invoiceNo: '',
        invoiceDate: new Date(),
        dueDate: null,
        billedDate: null,
        businessLogo: '',
        billedBy: {
          country: '',
          state: '',
          businessName: '',
          phone: '',
          email: '',
          gstin: '',
          address: '',
          city: '',
          postalCode: '',
          additionalEmails: [],
          pan: ''
        },
        billedTo: {
            country: '',
            state: '',
            businessName: '',
            phone: '',
            email: '',
            gstin: '',
            address: '',
            city: '',
            postalCode: '',
            additionalEmails: [],
            pan: ''
          },
        currency: 'INR',
        items: [],
        roundUp: false,
        roundDown: false,
        additionalCharges: [],
        subTotal: 0,
        sgstTotal: 0,
        cgstTotal: 0,
        total: 0,
        totalInWords: ''
      };


}
