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
