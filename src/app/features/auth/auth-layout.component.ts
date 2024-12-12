import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { LoginComponent } from './components/login/login.component';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterModule],
  template: `<router-outlet></router-outlet>`,
})
export class AuthLayoutComponent {}
