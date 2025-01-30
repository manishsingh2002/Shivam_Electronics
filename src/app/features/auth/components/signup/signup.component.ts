import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
@Component({
    selector: 'app-signup',
    imports: [RouterModule, FormsModule],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.scss'
})
export class SignupComponent {
  constructor(private auth: AuthService, private router: Router) {}

  public signupdetails = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    role: '',
  };
  public errorMessage: string | null = null; // To display error messages

  signUp() {
    this.errorMessage = null; // Clear any previous error messages
  this.auth.signUp(this.signupdetails).subscribe({
    next: (response: any) => {
      // console.log('Login Response:', response);
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