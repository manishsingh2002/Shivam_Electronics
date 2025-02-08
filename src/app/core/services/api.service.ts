import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import {ErrorhandlingService} from './errorhandling.service';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  // private baseUrl='https://4000-idx-backend-1737022093659.cluster-7ubberrabzh4qqy2g4z7wgxuw2.cloudworkstations.dev/api'
  private baseUrl = 'https://4000-idx-backend-1737022093659.cluster-7ubberrabzh4qqy2g4z7wgxuw2.cloudworkstations.dev/api';
  // private baseUrl = 'http://localhost:4000/api'
  constructor(private http: HttpClient, private authService: AuthService ,private errorhandler:ErrorhandlingService) {}

  // === User Authentication Methods ===
  getUserData(): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/v1/users/me`) // Interceptor will add headers
      .pipe(catchError((error) => this.errorhandler.handleError('getUserData', error)));
  }

  // updateUserPassword(): Observable<any> {
  //   return this.http
  //     .get(`${this.baseUrl}/v1/users/me`) // Interceptor will add headers
  //     .pipe(catchError((error) => this.errorhandler.handleError('getUserData', error)));
  // }

  // getCustomers(): Observable<any> {
  //   return this.http
  //   .get(`${this.baseUrl}/v1/customers`) 
  //   .pipe(catchError((error) => this.errorhandler.handleError('getCustomers', error)));
  // }

  // getCustomerById(id: string): Observable<any> {
  //   return this.http.get<any>(`${this.baseUrl}/v1/customers/${id}`);
  // }

  // updateCustomer(id: string, customer: any): Observable<any> {
  //   return this.http.put<any>(`${this.baseUrl}/v1/customers/${id}`, customer);
  // }

  deleteUser(): Observable<any> {
    return this.http
      .delete(`${this.baseUrl}/v1/users/me`) // Interceptor will add headers
      .pipe(catchError((error) => this.errorhandler.handleError('getUserData', error)));
  }

  getAllUserData(): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/v1/users/allusers`) // Interceptor will add headers
      .pipe(catchError((error) => this.errorhandler.handleError('getUserData', error)));
  }

  updatePassword(data: any): Observable<any> {
    return this.http
      .patch(`${this.baseUrl}/v1/users/updatePassword`, data) // Interceptor will add headers
      .pipe(catchError((error) => this.errorhandler.handleError('updatePassword', error)));
  }

  // -----------------------------------------------------------------------------------------------------------------------------------------------------------
  // === Product CRUD Methods ===
  getAutopopulateData(): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/v1/products/autopopulate`)
      .pipe(catchError((error) => this.errorhandler.handleError('getAutopopulateData', error)));
  }

  getAllProductData(): Observable<Product[]> {
    return this.http
      .get<Product[]>(`${this.baseUrl}/v1/products`)
      .pipe(catchError((error) => this.errorhandler.handleError('getAllProductData', error)));
  }

  getProductDataWithId(id: string): Observable<Product> {
    return this.http
      .get<Product>(`${this.baseUrl}/v1/products/${id}`)
      .pipe(catchError((error) => this.errorhandler.handleError('getProductDataWithId', error)));
  }

  createNewProduct(data: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/v1/products`, data)
      .pipe(catchError((error) => this.errorhandler.handleError('createNewProduct', error)));
  }
  
  updateProduct(productId: string, data: any): Observable<any> {
    return this.http
      .patch(`${this.baseUrl}/v1/products/${productId}`, data)
      .pipe(catchError((error) => this.errorhandler.handleError('updateProduct', error)));
  }

  deleteProduct(productIds: string[]): Observable<any> {
    const endpoint = `${this.baseUrl}/v1/products/deletemany`;
    const body = { ids: productIds };
    return this.http
      .delete(endpoint, {body:body}
      //   {
      //   headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      //   body, // Pass the body correctly
      // }
    )
      .pipe(catchError((error) => this.errorhandler.handleError('deletecustomer', error)));
  }
  // === Customer Service  ===

  getAllCustomerData(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.baseUrl}/v1/customers`)
      .pipe(catchError((error) => this.errorhandler.handleError('getAllcustomerData', error)));
  }
  
// updateCustomerImage(data:any,customerid:any){
//   return this.http
//   .post(`${this.baseUrl}/v1/customers/${customerid}`, data)
//   .pipe(catchError((error) => this.errorhandler.handleError('createNewcustomer', error)));
// }
// uploadProfileImage(formData: FormData, customerId: string) {
//   const apiUrl = `/api/customers/${customerId}/profile-image`;  // Replace with your actual API URL
//   return this.http.post(apiUrl, formData);
// }

uploadProfileImage(formData: FormData, customerId: string): Observable<any> {
  const apiUrl = `http://localhost:4000/api/customers/${customerId}/profile-image`; // Backend endpoint
  return this.http.post(apiUrl, formData).pipe(
    catchError((error:any) => {
      console.error('Upload Error:', error);
      return error // Fallback in case of an error
    })
  );
}


  getCustomerDataWithId(id: string): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}/v1/customers/${id}`)
      .pipe(catchError((error) => this.errorhandler.handleError('getcustomerDataWithId', error)));
  }

  createNewCustomer(data: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/v1/customers/`, data)
      .pipe(catchError((error) => this.errorhandler.handleError('createNewcustomer', error)));
  }
  
  updateCustomer(customerId: string, data: any): Observable<any> {
    return this.http
      .patch(`${this.baseUrl}/v1/customers/${customerId}`, data)
      .pipe(catchError((error) => this.errorhandler.handleError('updatecustomer', error)));
  }

  deleteCustomerID(customerIds: string[]): Observable<any> {
    const endpoint = `${this.baseUrl}/v1/customers/${customerIds}`;
    return this.http
      .delete(endpoint)
      .pipe(catchError((error) => this.errorhandler.handleError('deleteProduct', error)));
  }

  deleteCustomers(customerIds: string[]): Observable<any> {
    const endpoint = `${this.baseUrl}/v1/customers/deletemany`;
    const body = { ids: customerIds };
    return this.http
      .delete(endpoint, {body:body}
    )
      .pipe(catchError((error) => this.errorhandler.handleError('deleteProduct', error)));
  }
  //////////////////---------------------- Payment ----------------------\\\\\\\\\\\\\

  getAllpaymentData(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.baseUrl}/v1/payments`)
      .pipe(catchError((error) => this.errorhandler.handleError('getAllpaymentData', error)));
  }

  getpaymentDataWithId(id: string): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}/v1/payments/${id}`)
      .pipe(catchError((error) => this.errorhandler.handleError('getpaymentDataWithId', error)));
  }

  createNewpayment(data: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/v1/payments`, data)
      .pipe(catchError((error) => this.errorhandler.handleError('createNewpayment', error)));
  }
  
  updatepayment(paymentId: string, data: any): Observable<any> {
    return this.http
      .patch(`${this.baseUrl}/v1/payments/${paymentId}`, data)
      .pipe(catchError((error) => this.errorhandler.handleError('updatepayment', error)));
  }

  deletepayments(paymentIds: string[]): Observable<any> {
    const endpoint = `${this.baseUrl}/v1/payments/deletemany`;
    const body = { ids: paymentIds };
    return this.http
      .delete(endpoint, {body:body}
    ).pipe(catchError((error) => this.errorhandler.handleError('delete payment ', error)));
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


