import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SignupComponent } from "./components/signup/signup.component";

@Component({
    selector: 'app-auth-layout',    standalone: true,
    imports: [RouterModule, SignupComponent],
    template: ` 
    <app-signup>
    <router-outlet></router-outlet>`, 
  })
// @Component({
//   selector: 'app-auth-layout',
//   template: `
//     <router-outlet></router-outlet>
//   `,
// })
export class AuthLayoutComponent {}
