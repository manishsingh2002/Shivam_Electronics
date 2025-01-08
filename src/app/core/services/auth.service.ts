import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'authToken';
  private userSubject: BehaviorSubject<any | null>; // Explicitly type as nullable
  public user: Observable<any | null>;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object // Inject platform ID
  ) {
    let storedUser = null;

    if (isPlatformBrowser(this.platformId)) {
      // Check if running in browser
      try {
        const storedUserString = localStorage.getItem(this.tokenKey);
        storedUser = storedUserString ? JSON.parse(storedUserString) : null;
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem(this.tokenKey); // Clear potentially corrupted data
      }
    }

    this.userSubject = new BehaviorSubject<any | null>(storedUser);
    this.user = this.userSubject.asObservable();
  }

  login(data: any): Observable<any> {
    return this.http
      .post<any>('https://4000-idx-shivamelectronicsbackend-1736329366153.cluster-e3wv6awer5h7kvayyfoein2u4a.cloudworkstations.dev/api/v1/users/login', data)
      .pipe(
        map((response) => {
          if (isPlatformBrowser(this.platformId) && response.token) {
            localStorage.setItem(this.tokenKey, JSON.stringify(response.token));
            this.userSubject.next(response.token);
          }
          return response;
        }),
        catchError((error) => {
          console.error('Login error:', error);
          return of(null); // Return null in case of error to avoid breaking the observable chain
        })
      );
  }

  signUp(data: any): Observable<any> {
    return this.http
      .post<any>('https://4000-idx-shivamelectronicsbackend-1736329366153.cluster-e3wv6awer5h7kvayyfoein2u4a.cloudworkstations.dev/api/v1/users/signup', data)
      .pipe(
        map((response) => {
          if (isPlatformBrowser(this.platformId) && response.token) {
            localStorage.setItem(this.tokenKey, JSON.stringify(response.token));
            this.userSubject.next(response.token);
          }
          return response;
        }),
        catchError((error) => {
          console.error('Signup error:', error);
          return of(null);
        })
      );
  }

  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem(this.tokenKey);
    }
    return false; // Return false if not in browser
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenKey);
    }
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : '',
    });
  }
}
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// // import { HttpClientModule } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private tokenKey = 'authToken'; // Key for storing token in localStorage
//   private userSubject: BehaviorSubject<any>;
//   public user: Observable<any>;

//   constructor(private http: HttpClient, private router: Router) {
//     const storedUser = JSON.parse(
//       localStorage.getItem(this.tokenKey) || 'null'
//     );
//     this.userSubject = new BehaviorSubject<any>(storedUser);
//     this.user = this.userSubject.asObservable();
//   }

//   // Login method
//   login(data: any): Observable<any> {
//     return this.http
//       .post<any>('http://localhost:4000/api/v1/users/login', data)
//       .pipe(
//         map((response) => {
//           if (response.token) {
//             localStorage.setItem(this.tokenKey, JSON.stringify(response.token));
//             this.userSubject.next(response.token);
//           }
//           return response;
//         })
//       );
//   }

//   //signup
//   signUp(data: any): Observable<any> {
//     return this.http
//       .post<any>('http://localhost:4000/api/v1/users/signup', data)
//       .pipe(
//         map((response) => {
//           if (response.token) {
//             localStorage.setItem(this.tokenKey, JSON.stringify(response.token));
//             this.userSubject.next(response.token);
//           }
//           return response;
//         })
//       );
//   }

//   // Check if user is authenticated
//   isAuthenticated(): boolean {
//     return !!localStorage.getItem(this.tokenKey);
//   }

//   // Get token
//   getToken(): string | null {
//     return localStorage.getItem(this.tokenKey);
//   }

//   // Logout method
//   logout(): void {
//     localStorage.removeItem(this.tokenKey);
//     this.userSubject.next(null);
//     this.router.navigate(['/login']);
//   }

//   // Attach token to headers
//   getAuthHeaders(): HttpHeaders {
//     const token = this.getToken();
//     return new HttpHeaders({
//       Authorization: token ? `Bearer ${token}` : '',
//     });
//   }
// }

// // // // import { Injectable } from '@angular/core';

// // // // @Injectable({
// // // //   providedIn: 'root',
// // // // })
// // // // export class AuthService {
// // // //   private isAuthenticated = false;

// // // //   // Dummy authentication logic
// // // //   login(username: string, password: string): boolean {
// // // //     if (username === '1' && password === '1') {
// // // //       console.log('User logged in');
// // // //       localStorage.setItem('authToken', 'dummy-token'); // Store token to simulate login
// // // //       this.isAuthenticated = true;
// // // //       return true;
// // // //     }
// // // //     return false;
// // // //   }

// // // //   logout(): void {
// // // //     localStorage.removeItem('authToken');
// // // //     this.isAuthenticated = false;
// // // //   }

// // // //   isLoggedIn(): boolean {
// // // //     return this.isAuthenticated || !!localStorage.getItem('authToken');
// // // //   }
// // // // }
// // // import { Injectable } from '@angular/core';

// // // @Injectable({
// // //   providedIn: 'root',
// // // })
// // // export class AuthService {
// // //   private isAuthenticated = false;

// // //   login(username: string, password: string): boolean {
// // //     if (username === '1' && password === '1') {
// // //       localStorage.setItem('token', 'dummy-token');
// // //       this.isAuthenticated = true;
// // //       console.log('Admin logged in');
// // //       return true;
// // //     }
// // //     return false;
// // //   }

// // //   logout(): void {
// // //     localStorage.removeItem('token');
// // //     this.isAuthenticated = false;
// // //   }

// // //   isLoggedIn(): boolean {
// // //     return this.isAuthenticated || !!localStorage.getItem('token');
// // //   }
// // // }
// // import { Injectable } from '@angular/core';

// // @Injectable({
// //   providedIn: 'root',
// // })
// // export class AuthService {
// //   login(username: string, password: string): boolean {
// //     if (username === '1' && password === '1') {
// //       localStorage.setItem('token', 'admin-token');
// //       console.log('Admin token set');
// //       return true;
// //     }
// //     return false;
// //   }

// //   isLoggedIn(): boolean {
// //     return !!localStorage.getItem('token');
// //   }

// //   logout() {
// //     localStorage.removeItem('token');
// //   }
// // }
