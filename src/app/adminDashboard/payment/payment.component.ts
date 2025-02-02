import { Component } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, ReactiveFormsModule, FormGroup } from '@angular/forms'; // Import FormGroup
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,HttpClientModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  paymentForm!: FormGroup; 

  currencies = ['USD', 'EUR', 'GBP', 'INR', 'JPY'];
  paymentMethods = [
    { value: 'credit_card', label: 'Credit Card' },
    { value: 'debit_card', label: 'Debit Card' },
    { value: 'paypal', label: 'PayPal' },
    { value: 'crypto', label: 'Crypto' },
    { value: 'bank_transfer', label: 'Bank Transfer' }
  ];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.paymentForm = this.fb.group({
      userCode: ['', [Validators.required]],
      amount: [0, [Validators.required, Validators.min(0)]],
      currency: ['USD', [Validators.required]],
      paymentMethod: ['credit_card', [Validators.required]],
      description: ['', [Validators.maxLength(200)]],
      metadata: ['{}', [this.jsonValidator]]
    });
  }

  jsonValidator(control: AbstractControl) {
    try {
      JSON.parse(control.value);
      return null;
    } catch (e) {
      return { invalidJson: true };
    }
  }

  onSubmit() {
    if (this.paymentForm.invalid) {
      this.paymentForm.markAllAsTouched();
      return;
    }

    const formData = {
      ...this.paymentForm.value,
      amount: parseFloat(this.paymentForm.value.amount),
      metadata: JSON.parse(this.paymentForm.value.metadata)
    };

    this.http.post('/api/payments', formData).subscribe({
      next: (response: any) => {
        alert(`Payment successful! Transaction ID: ${response.transactionId}`);
        this.paymentForm.reset({
          currency: 'USD',
          paymentMethod: 'credit_card',
          amount: 0,
          metadata: '{}'
        });
      },
      error: (err) => {
        alert(`Payment failed: ${err.error?.message || err.message}`);
      }
    });
  }

  get f() {
    return this.paymentForm.controls;
  }
}