import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true, // Standalone component declaration
  imports: [CommonModule, FormsModule], // Import required modules
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    const success = this.authService.login(this.username, this.password);

    if (success) {
      console.log('Login successful');
      this.router.navigate(['/dashboard']);
    } else {
      console.log('Login failed');
      alert('Invalid credentials');
    }
  }
}

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
//   username: string = '';
//   password: string = '';

//   constructor(private authService: AuthService, private router: Router) {}
//   onLogin() {
//     if (this.authService.login(this.username, this.password)) {
//       // Store a dummy token in local storage
//       localStorage.setItem('authToken', 'dummyToken123');
//       console.log('Token stored in localStorage');
//       this.router.navigate(['/dashboard']);
//     } else {
//       alert('Invalid Username or Password');
//     }
//   }

//   // onLogin() {
//   //   if (this.authService.login(this.username, this.password)) {
//   //     localStorage.setItem('authToken', 'dummyToken123');
//   //     console.log('Token stored in localStorage');

//   //     this.router.navigate(['/dashboard']); // Redirect to the dashboard
//   //   } else {
//   //     alert('Invalid credentials!');
//   //   }
//   // }
// }
