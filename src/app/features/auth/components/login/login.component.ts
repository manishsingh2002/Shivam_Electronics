// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from '../../../../core/services/auth.service';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// @Component({
//   selector: 'app-login',
//   standalone: true, // Standalone component declaration
//   imports: [CommonModule, FormsModule], // Import required modules
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss'],
// })
// export class LoginComponent {
//   constructor(private auth: AuthService, private router: Router) {}
//   public errorMessage: string | null = null; // To display error messages
//   //
//   public logindetails = {
//     email: '',
//     password: '',
//   };

//   onLogin() {
//     this.auth.login(this.logindetails).subscribe((response: any) => {
//       console.log(response);
//       if (response && response.token) {
//         // Check if token exists in the response
//         this.router.navigate(['/dashboard']); // Navigate to the dashboard
//       } else {
//         this.errorMessage = 'Invalid credentials. Please try again.';
//       }
//     });
//   }
// }
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainDashboardComponent } from '../../../../layouts/main-dashboard/main-dashboard.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public logindetails = {
    email: '',
    password: '',
  };
  public errorMessage: string | null = null; // To display error messages

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    this.errorMessage = null; // Clear any previous error messages
    this.auth.login(this.logindetails).subscribe({
      next: (response: any) => {
        console.log('Login Response:', response);
        if (response && response.token) {
          // Check if token exists in the response
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Invalid credentials. Please try again.';
        }
      },
      error: (error) => {
        console.error('Login Error:', error);
        this.errorMessage = 'An error occurred during login.'; // Display a generic error message
        if (error?.error?.message) {
          this.errorMessage = error.error.message;
        }
      },
    });
  }
}
