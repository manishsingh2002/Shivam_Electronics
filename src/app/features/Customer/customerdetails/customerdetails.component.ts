import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../core/services/api.service';
import lodash from 'lodash'
import { SelectModule } from 'primeng/select';
@Component({
  selector: 'app-customerdetails',
  imports: [CardModule, SelectModule, TableModule, CommonModule, FormsModule],
  templateUrl: './customerdetails.component.html',
  styleUrl: './customerdetails.component.scss'
})
export class CustomerdetailsComponent {
  customerId!: string;
  customerIDDropdown: any;
  messageService: any;
  selectedGuaranteer: any = ''
  constructor(private route: ActivatedRoute, private apiService: ApiService, private http: HttpClient) { }
  ngOnInit(): void {
    this.autopopulatedata()
  }

  public customer: any = {
    _id: "678cc6e2ac1c4d9126b458ef",
    status: "inactive",
    profileImg: "",
    email: "msms5476m@gmail.com",
    fullname: "Manish Singh",
    phoneNumbers: [
      { number: "7160966299", type: "home", primary: false }
    ],
    addresses: [
      { street: "69 balaji green city near noorie media", city: "surat", state: "GUJARAT", zipCode: "394327", country: "India", type: "home" }
    ],
    guaranteerId: "6787cc8facb090dbb35b773a",
    totalPurchasedAmount: 0,
    remainingAmount: 0,
    cart: { items: [] },
    paymentHistory: [],
    createdAt: "2025-01-19T09:33:22.830Z",
    updatedAt: "2025-02-06T17:24:24.643Z"
  };

  autopopulatedata() {
    const autopopulate: any = JSON.parse(sessionStorage.getItem('autopopulate') || '{}');
    console.log(autopopulate);

    if (autopopulate && Array.isArray(autopopulate.customersdrop)) {
      this.customerIDDropdown = lodash.cloneDeep(autopopulate.customersdrop)
      console.log(this.customerIDDropdown);
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
    this.apiService.getCustomerDataWithId(this.customerId).subscribe(
      (response) => {
        this.customer = response;
      },
      (error) => {
        console.error('Error fetching customer data:', error);
      }
    );
  }
}