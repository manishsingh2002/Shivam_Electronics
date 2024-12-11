import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterModule, SignupComponent, LoginComponent],
  template: ` <router-outlet></router-outlet>`,
})
export class AuthLayoutComponent {}
