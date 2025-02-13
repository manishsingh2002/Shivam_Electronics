import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SplitterModule } from 'primeng/splitter';
import { SelectModule } from 'primeng/select';
import { ApiService } from '../../core/services/api.service';
import lodash from 'lodash';
@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [FormsModule, SelectModule, SplitterModule, CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  selectedOption: string = '';
  dropdownOptions = [
    { label: 'View Users', value: 'view_users' },
    { label: 'View Payments', value: 'view_payments' },
    { label: 'Settings', value: 'settings' }
  ];

  paymentData = {
    amount: 0,
    paymentMethod: 'credit_card',
    status: 'pending',
    transactionId: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    customerId: '',
    metadata: '{}',
    description: '',
    customerName: "",
    phoneNumbers: ''
  };
  paymentMethods = ['credit_card', 'debit_card', 'upi', 'crypto', 'bank_transfer'];
  statuses = ['pending', 'completed', 'failed', 'refunded'];
  customerIDDropdown: any;
  messageService: any;
  customer: any;
  customerId:any
  constructor(private http: HttpClient,private ApiService:ApiService) { }
  // customer:any = {
  //   fullname: '',
  //   profileImg: '',
  //   email: '',
  //   status: '',
  //   phoneNumbers: [],
  //   addresses: [],
  //   cart: { items: [] },
  //   guaranteerId: this.selectedGuaranter._id,
  //   totalPurchasedAmount: 0,
  //   remainingAmount: 0,
  //   paymentHistory: [],
  //   metadata: {},
  // };

  ngOnInit(): void {
    this.autopopulatedata()
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
  }


  fetchCustomerData() {
    this.paymentData.customerId = this.customerId
    this.ApiService.getCustomerDataWithId(this.customerId).subscribe(
      (response) => {
        this.customer = response.data;
        console.log(this.customer)
      },
      (error) => {
        console.error('Error fetching customer data:', error);
      }
    );
  }

  isValidJson(input: string): boolean {
    try {
      JSON.parse(input);
      return true;
    } catch {
      return false;
    }
  }

  onSubmit() {
    if (!this.paymentData.customerId || this.paymentData.amount <= 0 || !this.isValidJson(this.paymentData.metadata)) {
      alert('Please fill all required fields correctly.');
      return;
    }

    const formData = {
      ...this.paymentData,
      amount: parseFloat(String(this.paymentData.amount)),
      metadata: JSON.parse(this.paymentData.metadata),
      updatedAt: new Date().toISOString()
    };

    this.ApiService.createNewpayment(this.paymentData).subscribe((res)=>{
      console.log(res)
    })
  }
}

// import { Component } from '@angular/core';
// import { FormBuilder, Validators, AbstractControl, ReactiveFormsModule, FormGroup } from '@angular/forms'; // Import FormGroup
// import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// @Component({
//   selector: 'app-payment',
//   standalone: true,
//   imports: [ReactiveFormsModule, CommonModule,HttpClientModule],
//   templateUrl: './payment.component.html',
//   styleUrl: './payment.component.scss'
// })
// export class PaymentComponent {
//   paymentForm!: FormGroup;

//   currencies = ['USD', 'EUR', 'GBP', 'INR', 'JPY'];
//   paymentMethods = [
//     { value: 'credit_card', label: 'Credit Card' },
//     { value: 'debit_card', label: 'Debit Card' },
//     { value: 'paypal', label: 'PayPal' },
//     { value: 'crypto', label: 'Crypto' },
//     { value: 'bank_transfer', label: 'Bank Transfer' }
//   ];

//   constructor(private fb: FormBuilder, private http: HttpClient) {
//     this.paymentForm = this.fb.group({
//       userCode: ['', [Validators.required]],
//       amount: [0, [Validators.required, Validators.min(0)]],
//       currency: ['USD', [Validators.required]],
//       paymentMethod: ['credit_card', [Validators.required]],
//       description: ['', [Validators.maxLength(200)]],
//       metadata: ['{}', [this.jsonValidator]]
//     });
//   }

//   jsonValidator(control: AbstractControl) {
//     try {
//       JSON.parse(control.value);
//       return null;
//     } catch (e) {
//       return { invalidJson: true };
//     }
//   }

//   onSubmit() {
//     if (this.paymentForm.invalid) {
//       this.paymentForm.markAllAsTouched();
//       return;
//     }

//     const formData = {
//       ...this.paymentForm.value,
//       amount: parseFloat(this.paymentForm.value.amount),
//       metadata: JSON.parse(this.paymentForm.value.metadata)
//     };

//     this.http.post('/api/payments', formData).subscribe({
//       next: (response: any) => {
//         alert(`Payment successful! Transaction ID: ${response.transactionId}`);
//         this.paymentForm.reset({
//           currency: 'USD',
//           paymentMethod: 'credit_card',
//           amount: 0,
//           metadata: '{}'
//         });
//       },
//       error: (err) => {
//         alert(`Payment failed: ${err.error?.message || err.message}`);
//       }
//     });
//   }

//   get f() {
//     return this.paymentForm.controls;
//   }
// }