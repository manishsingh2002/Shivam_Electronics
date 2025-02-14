import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from '../../../core/services/api.service'; // Assuming ApiService path
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber'; // Import InputNumberModule
import { CalendarModule } from 'primeng/calendar'; // Import CalendarModule
import { CheckboxModule } from 'primeng/checkbox'; // Import CheckboxModule
import lodash from 'lodash'
import { SelectModule } from 'primeng/select';
interface InvoiceItem {
  product: string;
  gstRate: number;
  quantity: number;
  rate: number;
  taxableValue: number;
  cgstRate: number;
  sgstRate: number;
  cgstAmount: number;
  sgstAmount: number;
  amount: number;
}

interface BilledDetails {
  country: string;
  state: string;
  businessName: string;
  phone: string;
  email: string;
  gstin: string;
  address: string;
  city: string;
  postalCode: string;
  billState: any; // Or specify a type if you have a State interface
}

interface GSTData {
  invoiceNumber: string;
  invoiceDate: Date;
  dueDate: Date | null;
  seller: any; // ObjectId, define interface if needed
  buyer: any;   // ObjectId, define interface if needed
  items: InvoiceItem[];
  subTotal: number;
  totalDiscount: number;
  igst: number;
  cess: number;
  totalAmount: number;
  paymentTerms: string;
  notes: string;
  placeOfSupply: string;
  status: string;
  metadata: any; // Map<string, any> - or specify a type if needed
  billedBy: BilledDetails;
  billedTo: BilledDetails;
  roundUp: boolean;
  roundDown: boolean;
  currency: string;
}


@Component({
  selector: 'app-gst-invoice',
  standalone: true, // Mark as standalone component
  imports: [InputTextModule, SelectModule, ButtonModule, CommonModule, FormsModule, InputNumberModule, CalendarModule, CheckboxModule], // Use DropdownModule
  templateUrl: './gst-invoice.component.html',
  styleUrl: './gst-invoice.component.scss'
})

export class GstInvoiceComponent implements OnInit {

  gstData: GSTData = { // Use gstData for form binding
    invoiceNumber: 'A00001',
    invoiceDate: new Date(), // Initialize with current date
    dueDate: null,
    seller: {},
    buyer: {},
    items: [
      {
        product: 'Item Name 1',
        gstRate: 0,
        quantity: 1,
        rate: 1,
        taxableValue: 0,
        cgstRate: 0,
        sgstRate: 0,
        cgstAmount: 0,
        sgstAmount: 0,
        amount: 0
      }
    ],
    subTotal: 0, // Initialize subTotal to 0
    totalDiscount: 0,
    igst: 0,
    cess: 0,
    totalAmount: 0, // Initialize totalAmount to 0
    paymentTerms: '',
    notes: '',
    placeOfSupply: '',
    status: 'unpaid',
    metadata: {},
    billedBy: {
      country: 'India',
      state: '',
      businessName: '',
      phone: '',
      email: '',
      gstin: '',
      address: '',
      city: '',
      postalCode: '',
      billState: null
    },
    billedTo: {
      country: 'India',
      state: '',
      businessName: '',
      phone: '',
      email: '',
      gstin: '',
      address: '',
      city: '',
      postalCode: '',
      billState: null
    },
    roundUp: false,
    roundDown: false,
    currency: 'INR'
  };

  countries = [
    { label: 'India', value: 'India' },
    // Add more countries as needed
  ];

  states = [
    { label: 'Select State', value: null },
    { label: 'Maharashtra', value: 'Maharashtra' },
    // Add more states as needed
  ];

  currencies = [
    { label: 'Indian Rupee(INR, ₹)', value: 'INR' },
    // Add more currencies if needed
  ];
  selectedCountry = 'India';
  selectedState = 'Maharashtra';
  selectedBuyerCountry = 'India';
  selectedBuyerState = 'GUJARAT';
  selectedCurrency = 'INR';
  product: any = { // You can remove this as item structure is in gstData.items
    product: '',
    gstRate: 0,
    quantity: 1,
    rate: 0,
    taxableValue: 0,
    cgstRate: 0,
    sgstRate: 0,
    cgstAmount: 0,
    sgstAmount: 0,
    amount: 0
  };

  customerIDDropdown: any;
  buyerdetailsdropdown: any
  productdrop: any
  messageService: any;
  sellersDrop: any
  sellersselec: any;
  buyerselect: any;
  selectedproduct: any;
  invoiceData: any;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.calculateInvoiceTotals();
    this.autopopulatedata()
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.autopopulatedata();
  }

  autopopulatedata() {
    const autopopulate: any = JSON.parse(sessionStorage.getItem('autopopulate') || '{}');
    if (autopopulate && Array.isArray(autopopulate.customersdrop)) {
      this.customerIDDropdown = lodash.cloneDeep(autopopulate.customersdrop)
      this.buyerdetailsdropdown = lodash.cloneDeep(autopopulate.customersdrop)
      this.productdrop = lodash.cloneDeep(autopopulate.productsdrop)
      this.sellersDrop = lodash.cloneDeep(autopopulate.sellersdrop)
      console.log(this.customerIDDropdown, this.buyerdetailsdropdown, this.productdrop, this.sellersDrop);
    } else {
      this.customerIDDropdown = [];
      this.messageService.add({
        severity: 'info',
        summary: 'Info',
        detail: 'No valid customer data found',
        life: 3000
      });
    }
  }


  getCustomerData() {
    this.apiService.getCustomerDataWithId(this.buyerselect).subscribe((res: any) => {
      this.invoiceData = res.data;
      console.log(res.data);
    })
  }
  getproductdata() {
    this.apiService.getProductDataWithId(this.selectedproduct).subscribe((res: any) => {
      console.log(res);
    })
  }
  getsellerData() {
    this.apiService.getSellerDataWithId(this.sellersselec).subscribe((res: any) => {
      console.log(res.data);
    })
  }



  createInvoice() {
    // Send gstData to create new invoice
    this.apiService.createNewinvoice(this.gstData).subscribe((res: any) => {
      console.log(res);
    })

    console.log('Invoice Data to Save:', this.gstData); // Log data to console for now
    alert('Invoice data logged to console (Create Invoice action)'); // Replace with actual save logic
  }

  addItem(): void {
    this.gstData.items.push({ // Push new empty item to gstData.items
      product: '',
      gstRate: 0,
      quantity: 1,
      rate: 0,
      taxableValue: 0,
      cgstRate: 0,
      sgstRate: 0,
      cgstAmount: 0,
      sgstAmount: 0,
      amount: 0
    });
    this.calculateInvoiceTotals(); // Recalculate totals after adding item
  }

  removeItem(index: number): void { // Correct parameter type to number
    this.gstData.items.splice(index, 1);
    this.calculateInvoiceTotals(); // Recalculate totals after removing item
  };

  calculateTotalSgst(): number {
    let totalSgst = 0;
    for (const item of this.gstData.items) {
      totalSgst += item.sgstAmount;
    }
    return totalSgst;
  };

  calculateTotalCgst(): number {
    let totalCgst = 0;
    for (const item of this.gstData.items) {
      totalCgst += item.cgstAmount;
    }
    return totalCgst;
  };

  calculateTaxableValue(item: InvoiceItem): number {
    return item.quantity * item.rate;
  }

  calculateItemAmount(item: InvoiceItem): number {
    let taxableValue = this.calculateTaxableValue(item);
    item.taxableValue = taxableValue;
    item.cgstAmount = (taxableValue * (item.gstRate / 2)) / 100; // Assuming CGST and SGST are half of GST Rate
    item.sgstAmount = (taxableValue * (item.gstRate / 2)) / 100;
    item.amount = taxableValue + item.cgstAmount + item.sgstAmount; // Calculate item total amount
    return item.amount; // Return item total amount
  }

  calculateInvoiceTotals(): void {
    this.gstData.subTotal = 0;
    this.gstData.totalAmount = 0;
    for (const item of this.gstData.items) {
      this.calculateItemAmount(item); // Update item amounts and tax amounts
      this.gstData.subTotal += item.taxableValue;
      this.gstData.totalAmount += item.amount;
    }
    if (this.gstData.roundUp) {
      this.gstData.totalAmount = Math.ceil(this.gstData.totalAmount);
    } else if (this.gstData.roundDown) {
      this.gstData.totalAmount = Math.floor(this.gstData.totalAmount);
    }
  }

  onItemValueChange(item: InvoiceItem) {
    this.calculateItemAmount(item);
    this.calculateInvoiceTotals();
  }


  saveInvoice(): void {
    this.createInvoice(); // For now call createInvoice which logs to console
  }
}


// import { Component, OnInit } from '@angular/core';
// import { NgModule } from '@angular/core';
// import { InputTextModule } from 'primeng/inputtext';
// import { CalendarModule } from 'primeng/calendar';
// import { DropdownModule } from 'primeng/dropdown';
// import { InputNumberModule } from 'primeng/inputnumber';
// import { CheckboxModule } from 'primeng/checkbox';
// import { FormsModule } from '@angular/forms';
// import { ButtonModule } from 'primeng/button';
// import { RippleModule } from 'primeng/ripple';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Required for PrimeNG animations
// import { CommonModule } from '@angular/common';
// interface InvoiceItem {
//   product: string;
//   gstRate: number;
//   quantity: number;
//   rate: number;
//   taxableValue: number;
//   cgstRate: number;
//   sgstRate: number;
//   cgstAmount: number;
//   sgstAmount: number;
//   amount: number;
// }

// interface BilledDetails {
//   country: string;
//   state: string;
//   businessName: string;
//   phone: string;
//   email: string;
//   gstin: string;
//   address: string;
//   city: string;
//   postalCode: string;
//   billState: any; // Or specify a type if you have a State interface
// }

// interface GSTData {
//   invoiceNumber: string;
//   invoiceDate: Date;
//   dueDate: Date | null;
//   seller: any; // ObjectId, define interface if needed
//   buyer: any;  // ObjectId, define interface if needed
//   items: InvoiceItem[];
//   subTotal: number;
//   totalDiscount: number;
//   igst: number;
//   cess: number;
//   totalAmount: number;
//   paymentTerms: string;
//   notes: string;
//   placeOfSupply: string;
//   status: string;
//   metadata: any; // Map<string, any> - or specify a type if needed
//   billedBy: BilledDetails;
//   billedTo: BilledDetails;
//   roundUp: boolean;
//   roundDown: boolean;
//   currency: string;
// }

// @Component({
//   selector: 'app-gst-invoice',
//   templateUrl: './gst-invoice.component.html',
//   styleUrls: ['./gst-invoice.component.scss'],
//   imports: [
//     InputTextModule, FormsModule, CommonModule, CalendarModule, DropdownModule, InputNumberModule, CheckboxModule, ButtonModule, RippleModule, BrowserAnimationsModule // Make sure to include BrowserAnimationsModule here if needed for your app's module
//   ],
// })
// export class GstInvoiceComponent implements OnInit {
//   createInvoice() {
//     throw new Error('Method not implemented.');
//   }

//   gstData: GSTData = {
//     invoiceNumber: 'A00001',
//     invoiceDate: new Date('2024-12-11'),
//     dueDate: null,
//     seller: {},
//     buyer: {},
//     items: [
//       {
//         product: 'Item Name 1',
//         gstRate: 0,
//         quantity: 1,
//         rate: 1,
//         taxableValue: 0,
//         cgstRate: 0,
//         sgstRate: 0,
//         cgstAmount: 0,
//         sgstAmount: 0,
//         amount: 0
//       }
//     ],
//     subTotal: 0,
//     totalDiscount: 0,
//     igst: 0,
//     cess: 0,
//     totalAmount: 0,
//     paymentTerms: '',
//     notes: '',
//     placeOfSupply: '',
//     status: 'unpaid',
//     metadata: {},
//     billedBy: {
//       country: 'India',
//       state: '',
//       businessName: '',
//       phone: '',
//       email: '',
//       gstin: '',
//       address: '',
//       city: '',
//       postalCode: '',
//       billState: null
//     },
//     billedTo: {
//       country: 'India',
//       state: '',
//       businessName: '',
//       phone: '',
//       email: '',
//       gstin: '',
//       address: '',
//       city: '',
//       postalCode: '',
//       billState: null
//     },
//     roundUp: false,
//     roundDown: false,
//     currency: 'INR'
//   };

//   countries = [
//     { label: 'India', value: 'India' },
//     // Add more countries as needed
//   ];

//   states = [
//     { label: 'Select State', value: null },
//     { label: 'Maharashtra', value: 'Maharashtra' },
//     // Add more states as needed
//   ];

//   currencies = [
//     { label: 'Indian Rupee(INR, ₹)', value: 'INR' },
//     // Add more currencies if needed
//   ];

//   ngOnInit(): void {
//     this.calculateInvoiceTotals(); // Calculate initial totals on component load
//   }

//   addItem(): void {
//     this.gstData.items.push({
//       product: '',
//       gstRate: 0,
//       quantity: 1,
//       rate: 0,
//       taxableValue: 0,
//       cgstRate: 0,
//       sgstRate: 0,
//       cgstAmount: 0,
//       sgstAmount: 0,
//       amount: 0
//     });
//     this.calculateInvoiceTotals(); // Recalculate totals after adding an item
//   }

//   removeItem(index: number): void {
//     this.gstData.items.splice(index, 1);
//     this.calculateInvoiceTotals(); // Recalculate totals after removing an item
//   }

//   calculateTotalSgst(): number {
//     let totalSgst = 0;
//     for (const item of this.gstData.items) {
//       totalSgst += item.sgstAmount;
//     }
//     return totalSgst;
//   }

//   calculateTotalCgst(): number {
//     let totalCgst = 0;
//     for (const item of this.gstData.items) {
//       totalCgst += item.cgstAmount;
//     }
//     return totalCgst;
//   }

//   calculateTaxableValue(item: InvoiceItem): number {
//     return item.quantity * item.rate;
//   }

//   calculateItemAmount(item: InvoiceItem): number {
//     let taxableValue = this.calculateTaxableValue(item);
//     item.taxableValue = taxableValue;
//     item.cgstAmount = (taxableValue * (item.gstRate / 2)) / 100; // Assuming CGST and SGST are half of GST Rate
//     item.sgstAmount = (taxableValue * (item.gstRate / 2)) / 100;
//     return taxableValue + item.cgstAmount + item.sgstAmount;
//   }

//   calculateInvoiceTotals(): void {
//     this.gstData.subTotal = 0;
//     this.gstData.totalAmount = 0;
//     for (const item of this.gstData.items) {
//       item.amount = this.calculateItemAmount(item); // Update item amount and tax amounts
//       this.gstData.subTotal += item.taxableValue;
//       this.gstData.totalAmount += item.amount;
//     }
//     if (this.gstData.roundUp) {
//       this.gstData.totalAmount = Math.ceil(this.gstData.totalAmount);
//     } else if (this.gstData.roundDown) {
//       this.gstData.totalAmount = Math.floor(this.gstData.totalAmount);
//     }
//   }

//   onItemValueChange(item: InvoiceItem) {
//     this.calculateItemAmount(item); // Recalculate item specific amounts
//     this.calculateInvoiceTotals();   // Recalculate invoice totals
//   }

//   saveInvoice(): void {
//     // Implement your save invoice logic here, e.g., send data to backend API
//     console.log('Invoice Data to Save:', this.gstData);
//     alert('Invoice data logged to console (Save & Continue action)'); // Replace with actual save logic
//   }
// }