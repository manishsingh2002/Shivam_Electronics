

// import { Component } from '@angular/core';
// import { RouterModule } from '@angular/router';
// import { Router } from '@angular/router';
// import { AuthService } from '../../../../core/services/auth.service';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// @Component({
//     selector: 'app-login',
//     imports: [CommonModule, RouterModule, FormsModule],
//     templateUrl: './login.component.html',
//     styleUrls: ['./login.component.scss']
// })
// export class LoginComponent {
//   public logindetails = {
//     email: '',
//     password: '',
//   };
//   public errorMessage: string | null = null; // To display error messages

//   constructor(private auth: AuthService, private router: Router) {}

//   onLogin() {
//     this.errorMessage = null; // Clear any previous error messages
//     this.auth.login(this.logindetails).subscribe({
//       next: (response: any) => {
//         console.log('Login Response:', response);
//         if (response && response.token) {
//           // Check if token exists in the response
//           this.router.navigate(['/dashboard']);
//         } else {
//           this.errorMessage = 'Invalid credentials. Please try again.';
//         }
//       },
//       error: (error) => {
//         console.error('Login Error:', error);
//         this.errorMessage = 'An error occurred during login.'; // Display a generic error message
//         if (error?.error?.message) {
//           this.errorMessage = error.error.message;
//         }
//       },
//     });
//   }
// }
import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router'; // Import Router correctly
import { AuthService } from '../../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-login',
    standalone: true, // If you're using standalone components
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    public logindetails = {
        email: '',
        password: '',
    };
    public errorMessage: string | null = null;

    constructor(private auth: AuthService, private router: Router) {}

    onLogin() {
        this.errorMessage = null;
        this.auth.login(this.logindetails).subscribe({
            next: (response: any) => {
                console.log('Login Response:', response);
                if (response && response.data && response.token) { // Correct check
                    console.log("Login successful, redirecting to dashboard");
                    this.router.navigate(['/dashboard']);
                } else {
                    this.errorMessage = 'Invalid credentials. Please try again.';
                }
            },
            error: (error) => {
                console.error('Login Error:', error);
                this.errorMessage = 'An error occurred during login.';
                if (error?.error?.message) {
                    this.errorMessage = error.error.message;
                }
            },
        });
    }
}