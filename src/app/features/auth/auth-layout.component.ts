import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { LoginComponent } from './components/login/login.component';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="bg-gray-100 min-h-screen">
      <header class="bg-white rounded-b-2xl shadow-md p-6 mb-8">
        <nav class="flex justify-around items-center">
          <!--  -->
          <a
            [routerLink]="['/login']"
            class="text-lg font-semibold text-gray-800 hover:text-blue-500"
            >Login</a
          >
          <a
            [routerLink]="['/signup']"
            class="text-lg font-semibold text-gray-800 hover:text-blue-500"
            >Signup</a
          >
          <a
            [routerLink]="['/reset-password']"
            class="text-lg font-semibold text-gray-800 hover:text-blue-500"
            >ResetPassword</a
          >
          <!--  -->
        </nav>
      </header>
      <main class="container mx-auto px-4 py-8">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
})
export class AuthLayoutComponent {}
// ---------------------------------------------------------------------
// import { Component } from '@angular/core';
// import { RouterModule, RouterLink, RouterOutlet } from '@angular/router';
// import { SelectButtonModule } from 'primeng/selectbutton';
// import { FormsModule } from '@angular/forms';
// import { LoginComponent } from './components/login/login.component';
// import { SignupComponent } from './components/signup/signup.component';
// import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
// import { CommonModule } from '@angular/common';

// interface NavItem {
//   label: string;
//   route?: string[];
//   component?: any;
// }

// @Component({
//   selector: 'app-auth-layout',
//   standalone: true,
//   imports: [RouterModule, SelectButtonModule, FormsModule, CommonModule, RouterLink, RouterOutlet],
//   template: `
//     <main class="flex flex-col min-h-screen bg-gray-100 p-4">
//       <div class="sticky top-4 z-10 w-full">
//         <div class="mx-auto max-w-md">
//           <div class="relative rounded-lg p-4 bg-white shadow-md header-container">
//             <div class="relative p-4">
//               <div class="flex justify-center">
//                 <ng-container *ngIf="useComponents; else routeNav">
//                   <p-selectButton
//                     [options]="componentNavItems"
//                     [(ngModel)]="activeComponent"
//                     optionLabel="label"
//                     optionValue="component"
//                     aria-labelledby="component-selection"
//                     styleClass="w-full"
//                   ></p-selectButton>
//                 </ng-container>
//                 <ng-template #routeNav>
//                   <div class="flex space-x-4">
//                     <a *ngFor="let navItem of navItems" [routerLink]="navItem.route" class="p-2 rounded bg-gray-200 hover:bg-gray-300 transition">{{navItem.label}}</a>
//                   </div>
//                 </ng-template>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div class="mt-8 flex-grow overflow-y-auto">
//         <div class="bg-white rounded-lg shadow-md p-6">
//           <ng-container *ngIf="useComponents">
//             <ng-container *ngComponentOutlet="activeComponent"></ng-container>
//           </ng-container>
//           <router-outlet *ngIf="!useComponents"></router-outlet>
//         </div>
//       </div>
//     </main>
//   `,
//   styles: [`
//     /* ... (styles remain the same) */
//   `]
// })
// export class AuthLayoutComponent {
//   useComponents: boolean = true; // Default to component navigation
//   activeComponent: any = LoginComponent;

//   componentNavItems: NavItem[] = [
//     { label: 'Login', component: LoginComponent },
//     { label: 'Signup', component: SignupComponent },
//     { label: 'Reset Password', component: ResetPasswordComponent },
//   ];

//   navItems: NavItem[] = [
//     { label: 'Login', route: ['/login'] },
//     { label: 'Signup', route: ['/signup'] },
//     { label: 'Reset Password', route: ['/reset-password'] },
//   ];

//   navigateToComponent(component: any) {
//     this.activeComponent = component;
//   }
// }