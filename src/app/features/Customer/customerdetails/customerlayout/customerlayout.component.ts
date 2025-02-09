
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customerlayout',
  imports: [CommonModule, RouterModule, SelectButtonModule, FormsModule],
  templateUrl: './customerlayout.component.html',
  styleUrl: './customerlayout.component.scss'
})
export class CustomerlayoutComponent {
  activeRoute: string = 'master'; // Default route

  componentNavItems = [
    { label: 'Customer Master', route: 'master' },
    { label: 'Customer List', route: 'list' },
    { label: 'Customer Details', route: 'details' }
  ];

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    // Set activeRoute based on the current URL
    this.route.firstChild?.url.subscribe((segments: any) => {
      if (segments.length > 0) {
        this.activeRoute = segments[0].path;
      }
    });
  }

  navigateToComponent(route: string) {
    this.activeRoute = route;
    this.router.navigate(['/customer', route]);
  }
}


// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';
// import { Routes } from '@angular/router';
// import { SelectButtonModule } from 'primeng/selectbutton';
// import { FormsModule } from '@angular/forms';
// import { CustomerMasterComponent } from '../customer-master/customer-master.component';
// import { CustomerListComponent } from '../customer-list/customer-list.component';
// import { CustomerdetailsComponent } from '../customerdetails/customerdetails.component';
// @Component({
//   selector: 'app-customerlayout',
//   imports: [CommonModule, RouterModule, SelectButtonModule, FormsModule],
//   templateUrl: './customerlayout.component.html',
//   styleUrl: './customerlayout.component.scss'
// })
// export class CustomerlayoutComponent {
//   activeComponent: any = CustomerMasterComponent;
//   componentNavItems: any[] = [
//     { label: 'Customer Master', component: CustomerMasterComponent },
//     { label: 'Customer List', component: CustomerListComponent },
//     { label: 'customerDetails', component: CustomerdetailsComponent },

//   ];

//   navigateToComponent(component: any) {
//     this.activeComponent = component;
//   }
// }
