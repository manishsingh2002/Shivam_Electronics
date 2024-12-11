// // import { Injectable } from '@angular/core';

// // @Injectable({
// //   providedIn: 'root',
// // })
// // export class AuthService {
// //   private isAuthenticated = false;

// //   // Dummy authentication logic
// //   login(username: string, password: string): boolean {
// //     if (username === '1' && password === '1') {
// //       console.log('User logged in');
// //       localStorage.setItem('authToken', 'dummy-token'); // Store token to simulate login
// //       this.isAuthenticated = true;
// //       return true;
// //     }
// //     return false;
// //   }

// //   logout(): void {
// //     localStorage.removeItem('authToken');
// //     this.isAuthenticated = false;
// //   }

// //   isLoggedIn(): boolean {
// //     return this.isAuthenticated || !!localStorage.getItem('authToken');
// //   }
// // }
// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private isAuthenticated = false;

//   login(username: string, password: string): boolean {
//     if (username === '1' && password === '1') {
//       localStorage.setItem('token', 'dummy-token');
//       this.isAuthenticated = true;
//       console.log('Admin logged in');
//       return true;
//     }
//     return false;
//   }

//   logout(): void {
//     localStorage.removeItem('token');
//     this.isAuthenticated = false;
//   }

//   isLoggedIn(): boolean {
//     return this.isAuthenticated || !!localStorage.getItem('token');
//   }
// }
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('token', 'admin-token');
      console.log('Admin token set');
      return true;
    }
    return false;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}
