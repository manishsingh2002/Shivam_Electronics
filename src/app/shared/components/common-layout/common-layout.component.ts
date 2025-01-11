
// import { Component, Input, Output, EventEmitter } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';
// import { SelectButtonModule } from 'primeng/selectbutton';
// import { FormsModule } from '@angular/forms';

// @Component({
//     selector: 'app-common-layout',
//     imports: [CommonModule, RouterModule, SelectButtonModule, FormsModule],
//     templateUrl: './common-layout.component.html',
//     styleUrls: ['./common-layout.component.scss']
// })
// export class CommonLayoutComponent {
//   @Input() components: any;
//   @Output() componentSelected = new EventEmitter<any>();

//   componentNavItems: any[] = [];
//   activeComponent: any = '';

//   ngOnInit(): void {
//     this.componentNavItems = this.components;
//     this.activeComponent = this.componentNavItems[0];
//   }

//   navigateToComponent(component: any) {
//     this.activeComponent = component;
//     this.componentSelected.emit(component); // Emit the selected component
//   }
// }

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ScrollerModule } from 'primeng/scroller';

@Component({
    selector: 'app-common-layout',
    imports: [CommonModule,ScrollerModule, SelectButtonModule, FormsModule],
    templateUrl: './common-layout.component.html',
    styleUrls: ['./common-layout.component.scss']
})

export class AppNavigationComponent {
  @Input() navItems: any[] = [];
  @Input() activeItem: any;
  @Output() activeItemChange = new EventEmitter<any>();

  navigateToComponent(component: any) {
    this.activeItem = component;
    this.activeItemChange.emit(component);
  }
}