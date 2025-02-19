import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import lodash from 'lodash';
import { SelectModule } from 'primeng/select';

interface InvoiceItem {
  product: string; // type: Schema.Types.ObjectId, ref: 'Product'
  quantity: number; // type: Number
  discount?: number; // type: Number
  rate: number; // type: Number, base rate (ex-GST)
  taxableValue: number; // type: Number
  gstRate: number; // type: Number, item-level GST rate
  gstAmount: number; // type: Number, item-level total GST amount
  amount: number; // type: Number, total amount (taxableValue + gstAmount)
}

interface Invoice {
  invoiceNumber: string; // type: String
  invoiceDate: Date; // type: Date
  dueDate?: Date; // type: Date
  seller: string; // type: Schema.Types.ObjectId, ref: 'Seller'
  buyer: string; // type: Schema.Types.ObjectId, ref: 'Customer'
  items: InvoiceItem[]; // [invoiceItemSchema]
  subTotal: number; // type: Number, Subtotal of taxable values
  totalDiscount?: number; // type: Number
  gst?: number; // type: Number, Invoice-level total GST
  cess?: number; // type: Number
  totalAmount: number; // type: Number, Total invoice amount
  paymentTerms?: string; // type: String
  notes?: string; // type: String
  placeOfSupply: string; // type: String
  status: 'paid' | 'unpaid' | 'partially paid' | 'cancelled'; // type: String, enum
  metadata?: Record<string, any>; // type: Map
}

@Component({
  selector: 'app-gst-invoice',
  standalone: true,
  imports: [InputTextModule, SelectModule, ButtonModule, CommonModule, FormsModule, InputNumberModule, CalendarModule, CheckboxModule],
  templateUrl: './gst-invoice.component.html',
  styleUrl: './gst-invoice.component.scss'
})
export class GstInvoiceComponent implements OnInit {

  gstData: Invoice = {
    invoiceNumber: '',
    invoiceDate: new Date(),
    dueDate: new Date(),
    seller: '',
    buyer: '',
    items: [
      {
        product: '',
        quantity: 1,
        discount: 0,
        rate: 0,
        taxableValue: 0,
        gstRate: 0,
        gstAmount: 0,
        amount: 0
      }
    ],
    subTotal: 0,
    totalDiscount: 0,
    gst: 0,
    cess: 0,
    totalAmount: 0,
    paymentTerms: '',
    notes: '',
    placeOfSupply: '',
    status: 'unpaid',
    metadata: {}
  };

  customerIDDropdown: any;
  buyerdetailsdropdown: any;
  productdrop: any;
  messageService: any;
  sellersDrop: any;
  sellersselec: any;
  buyerselect: any;
  selectedproduct: any;
  invoiceData: any;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.calculateInvoiceTotals();
    this.autopopulatedata();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.autopopulatedata();
  }

  autopopulatedata() {
    const autopopulate: any = JSON.parse(sessionStorage.getItem('autopopulate') || '{}');
    if (autopopulate && Array.isArray(autopopulate.customersdrop)) {
      this.customerIDDropdown = lodash.cloneDeep(autopopulate.customersdrop);
      this.buyerdetailsdropdown = lodash.cloneDeep(autopopulate.customersdrop);
      this.productdrop = lodash.cloneDeep(autopopulate.productsdrop);
      this.sellersDrop = lodash.cloneDeep(autopopulate.sellersdrop);
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
      console.log(res);
    });
  }

  getsellerData() {
    this.apiService.getSellerDataWithId(this.sellersselec).subscribe((res: any) => {
      console.log(res.data);
    });
  }

  createInvoice() {
    // Generate Invoice Number
    const customerId = this.gstData.buyer; // Assuming buyer is customer ID
    const now = new Date();
    const datePart = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
    const timePart = `${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
    this.gstData.invoiceNumber = `${customerId}-${datePart}-${timePart}`; // Format: CustomerID-YYYYMMDD-HHMMSS

    this.apiService.createNewinvoice(this.gstData).subscribe((res: any) => {
      console.log(res);
      if (res) {
        alert('Invoice created successfully!'); // Or use messageService for better UI feedback
        // Optionally reset the form or navigate to invoice list
      } else {
        alert('Failed to create invoice.');
      }
    });

    console.log('Invoice Data to Save:', this.gstData);
    // Remove or comment out the alert below as we are now showing alert based on API response
    // alert('Invoice data logged to console (Create Invoice action)');
  }
  
  // createInvoice() {
  //   this.apiService.createNewinvoice(this.gstData).subscribe((res: any) => {
  //     console.log(res);
  //   });

  //   console.log('Invoice Data to Save:', this.gstData);
  //   alert('Invoice data logged to console (Create Invoice action)');
  // }

  addItem(): void {
    this.gstData.items.push({
      product: '',
      quantity: 1,
      rate: 0,
      taxableValue: 0,
      gstRate: 0,
      gstAmount: 0,
      amount: 0
    });
    this.calculateInvoiceTotals();
  }

  removeItem(index: number): void {
    this.gstData.items.splice(index, 1);
    this.calculateInvoiceTotals();
  }

  // calculateItemAmount(item: InvoiceItem): number {
  //   let taxableValue = item.quantity * item.rate;
  //   item.taxableValue = taxableValue;
  //   item.gstAmount = (taxableValue * item.gstRate) / 100;
  //   item.amount = taxableValue + item.gstAmount;
  //   return item.amount;
  // }
  calculateItemAmount(item: InvoiceItem): number {
    // Calculate taxable value (considering discount if applicable)
    let taxableValue = item.quantity * item.rate;
    if (item.discount && item.discount > 0) {
      taxableValue -= (taxableValue * item.discount) / 100; // Assuming discount is percentage
    }
    item.taxableValue = taxableValue;

    // Calculate GST amount
    item.gstAmount = (taxableValue * item.gstRate) / 100;

    // Calculate total amount
    item.amount = taxableValue + item.gstAmount;
    return item.amount;
  }

  // calculateInvoiceTotals(): void {
  //   this.gstData.subTotal = 0;
  //   this.gstData.totalAmount = 0;
  //   this.gstData.gst = 0;

  //   for (const item of this.gstData.items) {
  //     this.calculateItemAmount(item);
  //     this.gstData.subTotal += item.taxableValue;
  //     this.gstData.gst += item.gstAmount;
  //     this.gstData.totalAmount += item.amount;
  //   }
  // }
  calculateInvoiceTotals(): void {
    this.gstData.subTotal = 0;
    this.gstData.totalAmount = 0;
    this.gstData.gst = 0; // Reset total GST
    this.gstData.totalDiscount = this.gstData.totalDiscount || 0; // Ensure totalDiscount is initialized

    for (const item of this.gstData.items) {
      this.calculateItemAmount(item);
      this.gstData.subTotal += item.taxableValue;
      this.gstData.gst += item.gstAmount; // Sum GST from each item
      this.gstData.totalAmount += item.amount;
    }

    // Apply invoice level discount if needed, after calculating subtotal and GST - verify your discount logic
    if (this.gstData.totalDiscount && this.gstData.totalDiscount > 0) {
      this.gstData.totalAmount -= this.gstData.totalDiscount; // Deduct total discount from total amount
    }
  }
  
  onItemValueChange(item: InvoiceItem) {
    this.calculateItemAmount(item);
    this.calculateInvoiceTotals();
  }
  onProductChange(event: any, index: number) {
    const productId = event.value; // Get product ID from event.value
    if (productId) {
      this.apiService.getProductDataWithId(productId).subscribe((res: any) => {
        if (res.data) {
          const product = res.data;
          this.gstData.items[index].product = productId; // Store product ID in items array
          this.gstData.items[index].rate = product.rate || 0;
          this.gstData.items[index].gstRate = product.gstRate || 0;
          this.onItemValueChange(this.gstData.items[index]);
        } else {
          console.error('Product data not found for ID:', productId);
        }
      });
    } else {
      this.gstData.items[index].product = ''; // Clear product ID if no product selected
      this.gstData.items[index].rate = 0;
      this.gstData.items[index].gstRate = 0;
      this.onItemValueChange(this.gstData.items[index]);
    }
  }
  // onProductChange(event: any, index: number) {
  //   const productId = event.value;
  //   if (productId) {
  //     this.apiService.getProductDataWithId(productId).subscribe((res: any) => {
  //       if (res.data) {
  //         const product = res.data;
  //         this.gstData.items[index].rate = product.rate || 0; // Set rate from product data
  //         this.gstData.items[index].gstRate = product.gstRate || 0; // Set gstRate from product data
  //         this.gstData.items[index].discount = this.gstData.items[index].discount || 0; // Keep existing discount or default to 0
  //         this.onItemValueChange(this.gstData.items[index]); // Recalculate item amounts and totals
  //       } else {
  //         console.error('Product data not found for ID:', productId);
  //       }
  //     });
  //   } else {
  //     // Handle case where no product is selected or product is unselected
  //     this.gstData.items[index].rate = 0;
  //     this.gstData.items[index].gstRate = 0;
  //     this.gstData.items[index].discount = 0;
  //     this.onItemValueChange(this.gstData.items[index]);
  //   }
  // }
  
  saveInvoice(): void {
    this.createInvoice();
  }
}


/**import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import lodash from 'lodash';
import { SelectModule } from 'primeng/select';

interface InvoiceItem {
  product: string;
  quantity: number;
  discount?: number;
  rate: number;
  taxableValue: number;
  gstRate: number;
  gstAmount: number;
  amount: number;
}

interface Invoice {
  invoiceNumber: string;
  invoiceDate: Date;
  dueDate?: Date;
  seller: string;
  buyer: string;
  items: InvoiceItem[];
  subTotal: number;
  totalDiscount?: number;
  gst?: number;
  cess?: number;
  totalAmount: number;
  paymentTerms?: string;
  notes?: string;
  placeOfSupply: string;
  status: 'paid' | 'unpaid' | 'partially paid' | 'cancelled';
  metadata?: Record<string, any>;
}

@Component({
  selector: 'app-gst-invoice',
  standalone: true,
  imports: [InputTextModule, SelectModule, ButtonModule, CommonModule, FormsModule, InputNumberModule, CalendarModule, CheckboxModule],
  templateUrl: './gst-invoice.component.html',
  styleUrl: './gst-invoice.component.scss'
})
export class GstInvoiceComponent implements OnInit {

  gstData: Invoice = {
    invoiceNumber: 'A00001',
    invoiceDate: new Date(),
    dueDate: new Date(),
    seller: '',
    buyer: '',
    items: [
      {
        product: '',
        quantity: 1,
        discount: 0,
        rate: 0,
        taxableValue: 0,
        gstRate: 0,
        gstAmount: 0,
        amount: 0
      }
    ],
    subTotal: 0,
    totalDiscount: 0,
    gst: 0,
    cess: 0,
    totalAmount: 0,
    paymentTerms: '',
    notes: '',
    placeOfSupply: '',
    status: 'unpaid',
    metadata: {}
  };

  customerIDDropdown: any;
  buyerdetailsdropdown: any;
  productdrop: any;
  messageService: any;
  sellersDrop: any;
  sellersselec: any;
  buyerselect: any;
  selectedproduct: any;
  invoiceData: any;
  buyerAddress: string = ''; // Property to hold buyer's address

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.calculateInvoiceTotals();
    this.autopopulatedata();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.autopopulatedata();
  }

  autopopulatedata() {
    const autopopulate: any = JSON.parse(sessionStorage.getItem('autopopulate') || '{}');
    if (autopopulate && Array.isArray(autopopulate.customersdrop)) {
      this.customerIDDropdown = lodash.cloneDeep(autopopulate.customersdrop);
      this.buyerdetailsdropdown = lodash.cloneDeep(autopopulate.customersdrop);
      this.productdrop = lodash.cloneDeep(autopopulate.productsdrop);
      this.sellersDrop = lodash.cloneDeep(autopopulate.sellersdrop);
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

  onBuyerSelect(event: any) { // Renamed from getCustomerData to onBuyerSelect and modified
    this.buyerselect = event.value; // Capture selected buyer's ID
    if (this.buyerselect) {
      this.apiService.getCustomerDataWithId(this.buyerselect).subscribe((res: any) => {
        if (res.data) {
          this.invoiceData = res.data;
          this.buyerAddress = this.invoiceData.address; // Assuming 'address' field contains the buyer's address
          this.gstData.placeOfSupply = this.buyerAddress; // Update placeOfSupply in gstData
        } else {
          console.error('Customer data not found for ID:', this.buyerselect);
          this.buyerAddress = ''; // Clear address if customer data not found
          this.gstData.placeOfSupply = '';
        }
      });
    } else {
      this.buyerAddress = ''; // Clear address if no buyer selected
      this.gstData.placeOfSupply = '';
    }
  }


  getproductdata(index: number) { // Accept index
    this.apiService.getProductDataWithId(this.selectedproduct).subscribe((res: any) => {
      if (res.data) {
        const product = res.data;
        this.gstData.items[index].rate = product.rate || 0;
        this.gstData.items[index].gstRate = product.gstRate || 0;
        this.onItemValueChange(this.gstData.items[index]);
      } else {
        console.error('Product data not found for ID:', this.selectedproduct);
      }
    });
  }

  getsellerData() {
    this.apiService.getSellerDataWithId(this.sellersselec).subscribe((res: any) => {
      console.log(res.data);
    });
  }

  createInvoice() {
    // Generate Invoice Number
    const customerId = this.gstData.buyer; // Assuming buyer is customer ID
    const now = new Date();
    const datePart = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
    const timePart = `${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
    this.gstData.invoiceNumber = `${customerId}-${datePart}-${timePart}`; // Format: CustomerID-YYYYMMDD-HHMMSS

    this.apiService.createNewinvoice(this.gstData).subscribe((res: any) => {
      console.log(res);
      if (res) {
        alert('Invoice created successfully!'); // Or use messageService for better UI feedback
        // Optionally reset the form or navigate to invoice list
      } else {
        alert('Failed to create invoice.');
      }
    });

    console.log('Invoice Data to Save:', this.gstData);
    // Remove or comment out the alert below as we are now showing alert based on API response
    // alert('Invoice data logged to console (Create Invoice action)');
  }

  addItem(): void {
    this.gstData.items.push({
      product: '',
      quantity: 1,
      discount: 0,
      rate: 0,
      taxableValue: 0,
      gstRate: 0,
      gstAmount: 0,
      amount: 0
    });
    this.calculateInvoiceTotals();
  }

  removeItem(index: number): void {
    this.gstData.items.splice(index, 1);
    this.calculateInvoiceTotals();
  }

  calculateItemAmount(item: InvoiceItem): number {
    // Calculate taxable value (considering discount if applicable)
    let taxableValue = item.quantity * item.rate;
    if (item.discount && item.discount > 0) {
      taxableValue -= (taxableValue * item.discount) / 100; // Assuming discount is percentage
    }
    item.taxableValue = taxableValue;

    // Calculate GST amount
    item.gstAmount = (taxableValue * item.gstRate) / 100;

    // Calculate total amount
    item.amount = taxableValue + item.gstAmount;
    return item.amount;
  }

  calculateInvoiceTotals(): void {
    this.gstData.subTotal = 0;
    this.gstData.totalAmount = 0;
    this.gstData.gst = 0; // Reset total GST
    this.gstData.totalDiscount = this.gstData.totalDiscount || 0; // Ensure totalDiscount is initialized

    for (const item of this.gstData.items) {
      this.calculateItemAmount(item);
      this.gstData.subTotal += item.taxableValue;
      this.gstData.gst += item.gstAmount; // Sum GST from each item
      this.gstData.totalAmount += item.amount;
    }

    // Apply invoice level discount if needed, after calculating subtotal and GST - verify your discount logic
    if (this.gstData.totalDiscount && this.gstData.totalDiscount > 0) {
      this.gstData.totalAmount -= this.gstData.totalDiscount; // Deduct total discount from total amount
    }
  }

  onItemValueChange(item: InvoiceItem) {
    this.calculateItemAmount(item);
    this.calculateInvoiceTotals();
  }

  saveInvoice(): void {
    this.createInvoice();
  }
} */
// import { Component, OnInit, SimpleChanges } from '@angular/core';
// import { ApiService } from '../../../core/services/api.service'; // Assuming ApiService path
// import { InputTextModule } from 'primeng/inputtext';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { ButtonModule } from 'primeng/button';
// import { InputNumberModule } from 'primeng/inputnumber'; // Import InputNumberModule
// import { CalendarModule } from 'primeng/calendar'; // Import CalendarModule
// import { CheckboxModule } from 'primeng/checkbox'; // Import CheckboxModule
// import lodash from 'lodash'
// import { SelectModule } from 'primeng/select';
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
//   buyer: any;   // ObjectId, define interface if needed
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
//   metadata: any;
//   billedBy: BilledDetails;
//   billedTo: BilledDetails;
//   roundUp: boolean;
//   roundDown: boolean;
//   currency: string;
// }


// @Component({
//   selector: 'app-gst-invoice',
//   standalone: true, // Mark as standalone component
//   imports: [InputTextModule, SelectModule, ButtonModule, CommonModule, FormsModule, InputNumberModule, CalendarModule, CheckboxModule], // Use DropdownModule
//   templateUrl: './gst-invoice.component.html',
//   styleUrl: './gst-invoice.component.scss'
// })

// export class GstInvoiceComponent implements OnInit {

//   // gstData: GSTData = { // Use gstData for form binding
//   //   invoiceNumber: 'A00001',
//   //   invoiceDate: new Date(), // Initialize with current date
//   //   dueDate: null,
//   //   seller: {},
//   //   buyer: {},
//   //   items: [
//   //     {
//   //       product: 'Item Name 1',
//   //       gstRate: 0,
//   //       quantity: 1,
//   //       rate: 1,
//   //       taxableValue: 0,
//   //       cgstRate: 0,
//   //       sgstRate: 0,
//   //       cgstAmount: 0,
//   //       sgstAmount: 0,
//   //       amount: 0
//   //     }
//   //   ],
//   //   subTotal: 0, // Initialize subTotal to 0
//   //   totalDiscount: 0,
//   //   igst: 0,
//   //   cess: 0,
//   //   totalAmount: 0, // Initialize totalAmount to 0
//   //   paymentTerms: '',
//   //   notes: '',
//   //   placeOfSupply: '',
//   //   status: 'unpaid',
//   //   metadata: {},
//   //   billedBy: {
//   //     country: 'India',
//   //     state: '',
//   //     businessName: '',
//   //     phone: '',
//   //     email: '',
//   //     gstin: '',
//   //     address: '',
//   //     city: '',
//   //     postalCode: '',
//   //     billState: null
//   //   },
//   //   billedTo: {
//   //     country: 'India',
//   //     state: '',
//   //     businessName: '',
//   //     phone: '',
//   //     email: '',
//   //     gstin: '',
//   //     address: '',
//   //     city: '',
//   //     postalCode: '',
//   //     billState: null
//   //   },
//   //   roundUp: false,
//   //   roundDown: false,
//   //   currency: 'INR'
//   // };

  
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
//   selectedCountry = 'India';
//   selectedState = 'Maharashtra';
//   selectedBuyerCountry = 'India';
//   selectedBuyerState = 'GUJARAT';
//   selectedCurrency = 'INR';
//   product: any = { // You can remove this as item structure is in gstData.items
//     product: '',
//     gstRate: 0,
//     quantity: 1,
//     rate: 0,
//     taxableValue: 0,
//     cgstRate: 0,
//     sgstRate: 0,
//     cgstAmount: 0,
//     sgstAmount: 0,
//     amount: 0
//   };

//   customerIDDropdown: any;
//   buyerdetailsdropdown: any
//   productdrop: any
//   messageService: any;
//   sellersDrop: any
//   sellersselec: any;
//   buyerselect: any;
//   selectedproduct: any;
//   invoiceData: any;
//   constructor(private apiService: ApiService) { }

//   ngOnInit(): void {
//     this.calculateInvoiceTotals();
//     this.autopopulatedata()
//   }


//   ngOnChanges(changes: SimpleChanges): void {
//     this.autopopulatedata();
//   }

//   autopopulatedata() {
//     const autopopulate: any = JSON.parse(sessionStorage.getItem('autopopulate') || '{}');
//     if (autopopulate && Array.isArray(autopopulate.customersdrop)) {
//       this.customerIDDropdown = lodash.cloneDeep(autopopulate.customersdrop)
//       this.buyerdetailsdropdown = lodash.cloneDeep(autopopulate.customersdrop)
//       this.productdrop = lodash.cloneDeep(autopopulate.productsdrop)
//       this.sellersDrop = lodash.cloneDeep(autopopulate.sellersdrop)
//       console.log(this.customerIDDropdown, this.buyerdetailsdropdown, this.productdrop, this.sellersDrop);
//     } else {
//       this.customerIDDropdown = [];
//       this.messageService.add({
//         severity: 'info',
//         summary: 'Info',
//         detail: 'No valid customer data found',
//         life: 3000
//       });
//     }
//   }


//   getCustomerData() {
//     this.apiService.getCustomerDataWithId(this.buyerselect).subscribe((res: any) => {
//       this.invoiceData = res.data;
//       console.log(res.data);
//     })
//   }
//   getproductdata() {
//     this.apiService.getProductDataWithId(this.selectedproduct).subscribe((res: any) => {
//       console.log(res);
//     })
//   }
//   getsellerData() {
//     this.apiService.getSellerDataWithId(this.sellersselec).subscribe((res: any) => {
//       console.log(res.data);
//     })
//   }



//   createInvoice() {
//     // Send gstData to create new invoice
//     this.apiService.createNewinvoice(this.gstData).subscribe((res: any) => {
//       console.log(res);
//     })

//     console.log('Invoice Data to Save:', this.gstData); // Log data to console for now
//     alert('Invoice data logged to console (Create Invoice action)'); // Replace with actual save logic
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
//     this.calculateInvoiceTotals(); // Recalculate totals after adding item
//   }

//   removeItem(index: number): void { // Correct parameter type to number
//     this.gstData.items.splice(index, 1);
//     this.calculateInvoiceTotals(); // Recalculate totals after removing item
//   };

//   calculateTotalSgst(): number {
//     let totalSgst = 0;
//     for (const item of this.gstData.items) {
//       totalSgst += item.sgstAmount;
//     }
//     return totalSgst;
//   };

//   calculateTotalCgst(): number {
//     let totalCgst = 0;
//     for (const item of this.gstData.items) {
//       totalCgst += item.cgstAmount;
//     }
//     return totalCgst;
//   };

//   calculateTaxableValue(item: InvoiceItem): number {
//     return item.quantity * item.rate;
//   }

//   calculateItemAmount(item: InvoiceItem): number {
//     let taxableValue = this.calculateTaxableValue(item);
//     item.taxableValue = taxableValue;
//     item.cgstAmount = (taxableValue * (item.gstRate / 2)) / 100; // Assuming CGST and SGST are half of GST Rate
//     item.sgstAmount = (taxableValue * (item.gstRate / 2)) / 100;
//     item.amount = taxableValue + item.cgstAmount + item.sgstAmount; // Calculate item total amount
//     return item.amount; // Return item total amount
//   }

//   calculateInvoiceTotals(): void {
//     this.gstData.subTotal = 0;
//     this.gstData.totalAmount = 0;
//     for (const item of this.gstData.items) {
//       this.calculateItemAmount(item); // Update item amounts and tax amounts
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
//     this.calculateItemAmount(item);
//     this.calculateInvoiceTotals();
//   }


//   saveInvoice(): void {
//     this.createInvoice(); // For now call createInvoice which logs to console
//   }
// }



/*
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import lodash from 'lodash'
import { SelectModule } from 'primeng/select';
import { MessageService } from 'primeng/api'; // Import MessageService

interface InvoiceItem {
  product: any;
  quantity: number;
  discount: number;
  rate: number;
}

interface GSTData {
  invoiceNumber: string;
  invoiceDate: Date;
  dueDate: Date | null;
  seller: any;
  buyer: any;
  items: InvoiceItem[];
  subTotal: number;
  totalAmount: number;
  paymentTerms: string;
  notes: string;
  placeOfSupply: string;
  status: string;
  metadata: any;
  currency: string;
}


@Component({
  selector: 'app-gst-invoice',
  standalone: true,
  imports: [InputTextModule, SelectModule, ButtonModule, CommonModule, FormsModule, InputNumberModule, CalendarModule, CheckboxModule],
  templateUrl: './gst-invoice.component.html',
  styleUrls: ['./gst-invoice.component.scss'],
  providers: [MessageService] // Add MessageService to providers
})

export class GstInvoiceComponent implements OnInit {

  gstData: GSTData = {
    invoiceNumber: 'A00001',
    invoiceDate: new Date(),
    dueDate: null,
    seller: {
      businessName: '',
      phone: '',
      email: '',
      gstin: '',
      address: '',
      city: '',
      postalCode: ''
    },
    buyer: {
      businessName: '',
      phone: '',
      email: '',
      gstin: '',
      address: '',
      city: '',
      postalCode: ''
    },
    items: [
      {
        product: null,
        quantity: 1,
        discount: 0,
        rate: 0,
      }
    ],
    subTotal: 0,
    totalAmount: 0,
    paymentTerms: '',
    notes: '',
    placeOfSupply: '',
    status: 'unpaid',
    metadata: {},
    currency: 'INR'
  };


  currencies = [
    { label: 'Indian Rupee(INR, ₹)', value: 'INR' },
    // Add more currencies if needed
  ];
  selectedCurrency = 'INR';


  customerIDDropdown: any;
  buyerdetailsdropdown: any
  productdrop: any
  sellersDrop: any
  sellersselec: any;
  buyerselect: any;
  selectedproduct: any;
  invoiceData: any;
  constructor(private apiService: ApiService, private messageService: MessageService) { } // Inject MessageService

  ngOnInit(): void {
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
      if (res.data) {
        this.gstData.buyer = {
          businessName: res.data.fullname || '', // Use fullname if businessName is not available
          phone: res.data.phone || '',
          email: res.data.email || '',
          gstin: res.data.gstin || '',
          address: res.data.address || '',
          city: res.data.city || '',
          postalCode: res.data.postalCode || ''
        };
      }
    })
  }
  getproductdata(index: number) { // Pass index to identify the item
    this.apiService.getProductDataWithId(this.gstData.items[index].product).subscribe((res: any) => { // Use product ID from the selected item
      console.log(res);
      if (res.data) {
        this.gstData.items[index].rate = res.data.rate; // Update rate of the selected item
      }
    })
  }
  getsellerData() {
    this.apiService.getSellerDataWithId(this.sellersselec).subscribe((res: any) => {
      console.log(res.data);
      if (res.data) {
        this.gstData.seller = {
          businessName: res.data.businessName || '',
          phone: res.data.phone || '',
          email: res.data.email || '',
          gstin: res.data.gstin || '',
          address: res.data.address || '',
          city: res.data.city || '',
          postalCode: res.data.postalCode || ''
        };
      }
    })
  }



  createInvoice() {
    // Send gstData to create new invoice
    this.apiService.createNewinvoice(this.gstData).subscribe((res: any) => {
      console.log(res);
      // Handle success response, maybe show a success message and reset the form?
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Invoice created successfully' });
    })

    console.log('Invoice Data to Save:', this.gstData); // Log data to console for now
    // alert('Invoice data logged to console (Create Invoice action)'); // Removed alert, using message service instead
  }

  addItem(): void {
    this.gstData.items.push({
      product: null,
      quantity: 1,
      discount: 0,
      rate: 0,
    });
  }

  removeItem(index: number): void {
    this.gstData.items.splice(index, 1);
  };


  onItemValueChange(item: InvoiceItem) {
    // Keep this if you have any logic on item value change, otherwise can be removed for now
  }


  saveInvoice(): void {
    this.createInvoice();
  }
} */


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