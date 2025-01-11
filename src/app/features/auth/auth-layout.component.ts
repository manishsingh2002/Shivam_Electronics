import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppNavigationComponent } from "../../shared/components/common-layout/common-layout.component";
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
@Component({
    selector: 'app-auth-layout',
    imports: [CommonModule, SelectButtonModule, FormsModule, RouterModule, AppNavigationComponent],
    template: `
    <!-- <div class="bg-gray-100 min-h-screen">
      <header class="bg-white rounded-b-2xl shadow-md p-6 mb-8">
        <nav class="flex justify-around items-center">
          
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
          
        </nav>
      </header>
      <main class="container mx-auto px-4 py-8">
        <router-outlet></router-outlet>
      </main>
    </div> -->
    <main class="flex-1 overflow-y-auto w-full relative">
  <div class="sticky top-0 z-10 w-full shadow-md rounded-lg font-roboto">
    <app-common-layout
      [navItems]="componentNavItems"
      [activeItem]="activeComponent"
      (activeItemChange)="activeComponent = $event"
    ></app-common-layout>
  </div>
  <div class="mt-4">
    <ng-container *ngComponentOutlet="activeComponent"></ng-container>
  </div>
</main>
  `
})
export class AuthLayoutComponent {
  activeComponent: any = LoginComponent; 
  componentNavItems: any[] = [
   { label: 'login', component: LoginComponent },
   { label: 'signup', component: SignupComponent },
   { label: 'reset', component: ResetPasswordComponent }, // Corrected key
   { label: 'update List', component: UpdatePasswordComponent },
 
 ];
     navigateToComponent(component: any) {
       this.activeComponent = component;
     }
}
