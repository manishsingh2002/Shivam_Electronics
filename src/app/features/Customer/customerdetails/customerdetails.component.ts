import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-customerdetails',
  imports: [CardModule, TableModule, CommonModule, FormsModule],
  templateUrl: './customerdetails.component.html',
  styleUrl: './customerdetails.component.scss'
})
export class CustomerdetailsComponent {
  customerId!: string;
  customer: any;
  constructor(private route: ActivatedRoute, private apiService: ApiService, private http: HttpClient) { }
  ngOnInit(): void {
    this.customerId = this.route.snapshot.paramMap.get('id') || '';
    this.fetchCustomerData();
  }
  // vierCustomer(customerId: any) {
  //   this.router.navigate(['/customer/' + customerId]);
  // }

  fetchCustomerData(): void {
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