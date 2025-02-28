import { Component } from '@angular/core';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-analytics',
  imports: [],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent {

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

  }


  getProductSales() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    let payload = {
      "startDate": "2025-01-01",
      "endDate": "2026-03-31"
    }
    this.apiService.getProductSales(payload).subscribe((res: any) => {
      console.log(res);
    })
  }
}
