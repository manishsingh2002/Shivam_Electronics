import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:4000/api'; // Update with your API base URL
  constructor(private http: HttpClient, private authService: AuthService) {}

  // === User Authentication Methods ===
  getUserData(): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/v1/users/me`) // Interceptor will add headers
      .pipe(catchError((error) => this.handleError('getUserData', error)));
  }

  // updateUserPassword(): Observable<any> {
  //   return this.http
  //     .get(`${this.baseUrl}/v1/users/me`) // Interceptor will add headers
  //     .pipe(catchError((error) => this.handleError('getUserData', error)));
  // }

  deleteUser(): Observable<any> {
    return this.http
      .delete(`${this.baseUrl}/v1/users/me`) // Interceptor will add headers
      .pipe(catchError((error) => this.handleError('getUserData', error)));
  }


  getAllUserData(): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/v1/users/allusers`) // Interceptor will add headers
      .pipe(catchError((error) => this.handleError('getUserData', error)));
  }

  updatePassword(data: any): Observable<any> {
    return this.http
      .patch(`${this.baseUrl}/v1/users/updatePassword`, data) // Interceptor will add headers
      .pipe(catchError((error) => this.handleError('updatePassword', error)));
  }






  // -----------------------------------------------------------------------------------------------------------------------------------------------------------
  // === Product CRUD Methods ===
  getAutopopulateData(): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/v1/products/autopopulate`)
      .pipe(catchError((error) => this.handleError('getAutopopulateData', error)));
  }

  getAllProductData(): Observable<Product[]> {
    return this.http
      .get<Product[]>(`${this.baseUrl}/v1/products`)
      .pipe(catchError((error) => this.handleError('getAllProductData', error)));
  }

  getProductDataWithId(id: string): Observable<Product> {
    return this.http
      .get<Product>(`${this.baseUrl}/v1/products/${id}`)
      .pipe(catchError((error) => this.handleError('getProductDataWithId', error)));
  }

  createNewProduct(data: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/v1/products`, data)
      .pipe(catchError((error) => this.handleError('createNewProduct', error)));
  }
  
  updateProduct(productId: string, data: any): Observable<any> {
    return this.http
      .patch(`${this.baseUrl}/v1/products/${productId}`, data)
      .pipe(catchError((error) => this.handleError('updateProduct', error)));
  }

  deleteProduct(productIds: string[]): Observable<any> {
    const endpoint = `${this.baseUrl}/v1/products/deletemany`;
    const body = { ids: productIds };

    return this.http
      .delete(endpoint, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        body, // Pass the body correctly
      })
      .pipe(catchError((error) => this.handleError('deleteProduct', error)));
  }

  // === Error Handling ===
  private handleError(method: string, error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unexpected error occurred';
    let backendErrorCode: string | undefined;

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error in ${method} (Client): ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error in ${method} (Server - Status ${error.status}): `;
      if (error.error) {
        if (typeof error.error === 'string') {
          errorMessage += error.error;
        } else if (typeof error.error === 'object') {
          if (error.error.message) errorMessage += error.error.message;
          if (error.error.code) backendErrorCode = error.error.code;
          if (error.error.errors && Array.isArray(error.error.errors)) {
            errorMessage += '\nValidation Errors:\n';
            error.error.errors.forEach((err: any) => {
              errorMessage += `- ${err.msg || err.message || err.path}: ${err.value}\n`;
            });
          }
        }
      } else {
        errorMessage += 'No error details provided by the server.';
      }

      // MongoDB-specific error handling
      if (Number(backendErrorCode) === 11000) {
        errorMessage = `${method} failed: Duplicate entry detected.`;
      } else if (errorMessage.includes('Cast to ObjectId failed')) {
        errorMessage = `${method} failed: Invalid ID format.`;
      } else if (errorMessage.includes('Path `')) {
        const match = errorMessage.match(/Path `([^`]*)`/);
        if (match) errorMessage = `${method} failed: Invalid value for '${match[1]}'.`;
      }
    }

    console.error(`Error in ${method}:`, error); // Log detailed error to the console
    return throwError(() => new Error(errorMessage));
  }
}

// import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { AuthService } from './auth.service';

// export interface Product {
//   id: string;
//   name: string;
//   price: number;
//   description: string;
// }

// @Injectable({ providedIn: 'root' })
// export class ApiService {
//   // private baseUrl = 'http://localhost:4000/api';
//   // public headers: any;
//   // private baseUrl = 'https://4000-idx-manish-testing-1736743032103.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api';
// private baseUrl='http://localhost:4000/api'
//   constructor(private http: HttpClient, private authService: AuthService) {}

//   // User authentication related methods (use methods from AuthService)
//   getUserData() {
//     return this.http.get('http://localhost:3000/api/v1/users/me'); // Interceptor adds headers
//   }

//   updatePassword(data: any) {
//     return this.http.patch('http://localhost:3000/api/v1/users/updatePassword', data); // Interceptor adds headers
//   }

//   // Fetch data

// // --------------------------------------------------------------------------------------------------------------------------------
// getAutopopulateData(): Observable<any> {
//   return this.http
//     .get(`${this.baseUrl}/v1/products/autopopulate`)
//     .pipe(catchError((error) => this.handleError('getData', error)));
// }
// // Fetch all products
// getAllProductData(): Observable<Product[]> {
//   return this.http
//     .get<Product[]>(`${this.baseUrl}/v1/products`)
//     .pipe(catchError((error) => this.handleError('getAllProductData', error)));
// }
// //get data with ID
// getProductDatawithId(Id: any): Observable<Product> { // Return Observable<Product>
//   return this.http.get<Product>(`${this.baseUrl}/v1/products/${Id}`) // Get a single Product
//     .pipe(
//       catchError((error, caught) => this.handleError('getProductDatawithId', error))
//     );
// }  
// // Create a new product
//   createNewProduct(data: any): Observable<any> {
//     const endpoint = `${this.baseUrl}/v1/products`;
//     return this.http.post<any>(endpoint, data).pipe(
//       catchError((error) => this.handleError('createNewProduct', error))
//     );
//   }

//   updateProduct(productId: string, data: any): Observable<any> {
//     const endpoint = `${this.baseUrl}/v1/products/${productId}`;
//     return this.http.patch(endpoint, data).pipe(
//       catchError((error) => this.handleError('updateProduct', error))
//     );
//   }
// // <<<<<<< main

// //   deleteProduct(productId: any): Observable<any> {
// //     const endpoint = `${this.baseUrl}/v1/products/deletemany`;
// //     const body = JSON.stringify({ ids: productId }); // Stringify the body

// //     return this.http.delete(endpoint, {
// //       headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
// //       body: body,
// //     }).pipe(
// //       catchError((error) => this.handleError('deleteProduct', error))
// //     );
// //   }

// //   private handleError(method: string, error: any): Observable<never> {
// //     let errorMessage = error?.error?.message || 'An unexpected error occurred';

// //     if (error.message.includes("Cast to ObjectId failed")) {
// //       errorMessage = "Invalid ID format provided."; // More user-friendly message
// //       console.error("Invalid ObjectId format detected.", error); // Keep detailed error in console for debugging
// //     } else {
// //       console.error(`Error in ${method}:`, error); // Log the full error object
// //     }

// // =======
// // // 
//   deleteProduct(productId: any): Observable<any> {
//     const endpoint = `${this.baseUrl}/v1/products/deletemany`;
//     const body = { ids: productId };
//     console.log(body);
//     return this.http.delete(endpoint, { // Correct DELETE request
//       headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
//       body: body // Correctly send the body
//   })
//       .pipe(catchError((error) => this.handleError('deleteProduct', error)));
//   }


//    handleError(method: string, error: HttpErrorResponse): Observable<never> {
//     let errorMessage = 'An unexpected error occurred';
//     let backendErrorCode: string | undefined; // To store backend-specific error codes
  
//     if (error.error instanceof ErrorEvent) {
//       // Client-side error
//       errorMessage = `Error in ${method} (Client): ${error.error.message}`;
//     } else {
//       // Server-side error
//       errorMessage = `Error in ${method} (Server - Status ${error.status}): `;
//       if (error.error) { // Check if error.error exists
//         if (typeof error.error === 'string') {
//           errorMessage += error.error; // Handle string error messages
//         } else if (typeof error.error === 'object') {
//           if (error.error.message) {
//             errorMessage += error.error.message;
//           }
//           if (error.error.code) { // Check for backend error codes
//               backendErrorCode = error.error.code;
//               errorMessage += ` (Code: ${error.error.code})`;
//           }
//           if (error.error.errors && Array.isArray(error.error.errors)) {
//             errorMessage += "\nValidation Errors:\n";
//             error.error.errors.forEach((validationError: any) => {
//               errorMessage += `- ${validationError.msg || validationError.message || validationError.path}: ${validationError.value} \n`; // Adjust property names if needed
//             });
//           }
//         } else {
//           errorMessage += JSON.stringify(error.error); // Fallback to stringifying if it's neither string nor object
//         }
//       } else {
//           errorMessage += "No error details provided by the server.";
//       }
  
  
//       // Specific MongoDB error handling (based on Mongoose/MongoDB error structures)
//       if (Number(backendErrorCode) === 11000) { // Duplicate key error code
//           errorMessage = `${method} failed: Duplicate entry. Please check your input.`;
//       } else if (errorMessage.includes('Cast to ObjectId failed')) {
//         errorMessage = `${method} failed: Invalid ID format.`;
//       } else if (errorMessage.includes('Path `')) {
//           const pathMatch = errorMessage.match(/Path `([^`]*)`/);
//           if (pathMatch) {
//               const path = pathMatch[1];
//               errorMessage = `${method} failed: Invalid value for field '${path}'.`;
//           }
//       }
//     }
  
//     console.error(errorMessage); // Log the detailed error to the console
//     return throwError(() => new Error(errorMessage));
//   }
// }


