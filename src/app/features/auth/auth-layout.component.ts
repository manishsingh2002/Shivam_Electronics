// import { Component } from '@angular/core';
// import { RouterModule } from '@angular/router';
// // import { LoginComponent } from './components/login/login.component';
// import { SelectButtonModule } from 'primeng/selectbutton';
// import { FormsModule } from '@angular/forms';
// import { LoginComponent } from './components/login/login.component';
// import { SignupComponent } from './components/signup/signup.component';
// import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
// @Component({
//   selector: 'app-auth-layout',
//   standalone: true,
//   imports: [RouterModule,SelectButtonModule,FormsModule],
//   template: `
//     <!-- <div class="bg-gray-100 min-h-screen">
//       <header class="bg-white rounded-b-2xl shadow-md p-6 mb-8">
//         <nav class="flex justify-around items-center">
          
//           <a
//             [routerLink]="['/login']"
//             class="text-lg font-semibold text-gray-800 hover:text-blue-500"
//             >Login</a
//           >
//           <a
//             [routerLink]="['/signup']"
//             class="text-lg font-semibold text-gray-800 hover:text-blue-500"
//             >Signup</a
//           >
//           <a
//             [routerLink]="['/reset-password']"
//             class="text-lg font-semibold text-gray-800 hover:text-blue-500"
//             >ResetPassword</a
//           >
//           s
//         </nav>
//       </header>
//       <main class="container mx-auto px-4 py-8">
//         <router-outlet></router-outlet>
//       </main>
//     </div> -->
//     <main class="flex-1 px-4 pt-8 overflow-y-auto w-full relative">
//   <div class="bg-gray-100 p-6 shadow-md rounded-lg font-roboto  sticky top-8 z-10">
//     <div class="card flex justify-center">
//       <p-selectButton [options]="componentNavItems" [(ngModel)]="activeComponent" optionLabel="label" optionValue="component" aria-labelledby="basic" (onChange)="navigateToComponent(activeComponent)"></p-selectButton>
//     </div>
//   </div>

//   <div class="mt-1">
//     <ng-container *ngComponentOutlet="activeComponent"></ng-container>
//   </div>
// </main>
//   `,
// })
// export class AuthLayoutComponent {
//  showHeaderAndSidebar: boolean = true;

//    activeComponent: any = LoginComponent; 
//    componentNavItems: any[] = [
//     { label: 'signup', component: SignupComponent },
//     { label: 'resetpassword', component: ResetPasswordComponent }, // Corrected key
//     // { label: 'Product List', component: ProductListComponent },
//     // { label: 'Product detail', component: ProductDetailComponent }
//   ];
//       navigateToComponent(component: any) {
//         this.activeComponent = component;
//       }

// }
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterModule, SelectButtonModule, FormsModule, CommonModule], // Add CommonModule
  template: `
  <main class="flex flex-col min-h-screen bg-gray-100 p-4">
  <div class="sticky top-4 z-10 w-full">
    <div class="mx-auto max-w-md">
      <div class="relative rounded-lg p-4 bg-white shadow-md">
        <div class="absolute inset-0 rounded-lg border-double border-4 animate-border"></div>
        <div class="relative p-4">
          <div class="flex justify-center">
            <p-selectButton
              [options]="componentNavItems"
              [(ngModel)]="activeComponent"
              optionLabel="label"
              optionValue="component"
              aria-labelledby="component-selection"
              styleClass="w-full"
            ></p-selectButton>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="mt-8 flex-grow overflow-y-auto">
    <div class="bg-white rounded-lg shadow-md p-6">
      <ng-container *ngComponentOutlet="activeComponent"></ng-container>
    </div>
  </div>
</main>
  `,
styles:`/* Add this to your styles.css or a separate CSS file */
.animate-border {
  animation: border-animation 4s linear infinite alternate;
  background-image: linear-gradient(to right, #ff0080, #ff00ff, #8000ff, #0000ff, #0080ff, #00ffff, #00ff80, #00ff00, #80ff00, #ffff00, #ff8000, #ff0000); /* Use a more complete rainbow gradient */
    background-size: 300% 300%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

@keyframes border-animation {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}


.p-button {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

.p-button:hover {
    @apply bg-gray-100 text-gray-800 border-gray-300;
}
.p-button.p-highlight {
    @apply bg-blue-500 border-blue-500 text-white;
}`
})
export class AuthLayoutComponent {
  showHeaderAndSidebar: boolean = true;

  activeComponent: any = LoginComponent;
  componentNavItems: any[] = [
    { label: 'Signup', component: SignupComponent }, // Consistent casing
    { label: 'Reset Password', component: ResetPasswordComponent }, // Consistent casing
    { label: 'Login', component: LoginComponent }
  ];

  navigateToComponent(component: any) {
    this.activeComponent = component;
  }
}