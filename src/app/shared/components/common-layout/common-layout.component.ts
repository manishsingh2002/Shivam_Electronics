
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-common-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, SelectButtonModule, FormsModule],
  templateUrl: './common-layout.component.html',
  styleUrls: ['./common-layout.component.scss']
})
export class CommonLayoutComponent {
  @Input() components: any;
  @Output() componentSelected = new EventEmitter<any>();

  componentNavItems: any[] = [];
  activeComponent: any = '';

  ngOnInit(): void {
    this.componentNavItems = this.components;
    this.activeComponent = this.componentNavItems[0];
  }

  navigateToComponent(component: any) {
    this.activeComponent = component;
    this.componentSelected.emit(component); // Emit the selected component
  }
}


// import { Component, EventEmitter, Input, Output } from '@angular/core';

// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';
// import { Routes } from '@angular/router';
// import { SelectButtonModule } from 'primeng/selectbutton';
// import { FormsModule } from '@angular/forms';
// @Component({
//   selector: 'app-common-layout',
//   standalone: true,
//   imports: [CommonModule,RouterModule,SelectButtonModule,FormsModule],
//   templateUrl: './common-layout.component.html',
//   styleUrl: './common-layout.component.scss'
// })
// export class CommonLayoutComponent {
//   @Input() components:any
//   @Output() componentSelected = new EventEmitter<any>();

//   componentNavItems: any[]=[]
//   activeComponent: any='' 
//   ngOnInit(): void {
//     this.componentNavItems = this.components;
//     this.activeComponent = this.componentNavItems[0] 
//   }

//     navigateToComponent(component: any) {
//       this.activeComponent = component;
//     }
// }