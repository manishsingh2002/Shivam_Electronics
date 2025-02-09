// import { Routes } from '@angular/router';
// import { AuthLayoutComponent } from '../features/auth/auth-layout.component';
// import { LoginComponent } from '../features/auth/components/login/login.component';
// import { SignupComponent } from '../features/auth/components/signup/signup.component';
// import { ResetPasswordComponent } from '../features/auth/components/reset-password/reset-password.component';
// import { UpdatePasswordComponent } from '../features/auth/components/update-password/update-password.component';

// export const authRoutes: Routes = [
//   {
//     path: 'auth',
//     component: AuthLayoutComponent,
//     children: [
//       { path: 'login', component: LoginComponent },
//       { path: 'signup', component: SignupComponent },
//       { path: 'reset-password', component: ResetPasswordComponent },
//       { path: 'update-password', component: UpdatePasswordComponent },
//       { path: '', redirectTo: 'login', pathMatch: 'full' },
//     ],
//   },
// ];

import { Routes } from '@angular/router';
import { AuthLayoutComponent } from '../features/auth/auth-layout.component';
import { LoginComponent } from '../features/auth/components/login/login.component';
import { SignupComponent } from '../features/auth/components/signup/signup.component';
import { ResetPasswordComponent } from '../features/auth/components/reset-password/reset-password.component';
import { UpdatePasswordComponent } from '../features/auth/components/update-password/update-password.component';

export const authRoutes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: 'update-password', component: UpdatePasswordComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },  // ✅ Default to login
    ],
  },
];
