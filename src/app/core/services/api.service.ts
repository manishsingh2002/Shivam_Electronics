import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  // private baseUrl = 'http://localhost:4000/api';
  // public headers: any;
  private baseUrl = 'https://4000-idx-manish-testing-1736743032103.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // User authentication related methods (use methods from AuthService)
  getUserData() {
    return this.http.get('http://localhost:3000/api/v1/users/me'); // Interceptor adds headers
  }

  updatePassword(data: any) {
    return this.http.patch('http://localhost:3000/api/v1/users/updatePassword', data); // Interceptor adds headers
  }

  // Fetch data

// --------------------------------------------------------------------------------------------------------------------------------
getAutopopulateData(): Observable<any> {
  return this.http
    .get(`${this.baseUrl}/v1/products/autopopulate`)
    .pipe(catchError((error) => this.handleError('getData', error)));
}
// Fetch all products
getAllProductData(): Observable<Product[]> {
  return this.http
    .get<Product[]>(`${this.baseUrl}/v1/products`)
    .pipe(catchError((error) => this.handleError('getAllProductData', error)));
}
//get data with ID
getProductDatawithId(Id: any): Observable<Product> { // Return Observable<Product>
  return this.http.get<Product>(`${this.baseUrl}/v1/products/${Id}`) // Get a single Product
    .pipe(
      catchError((error, caught) => this.handleError('getProductDatawithId', error))
    );
}  
// Create a new product
  createNewProduct(data: any): Observable<any> {
    const endpoint = `${this.baseUrl}/v1/products`;
    return this.http.post<any>(endpoint, data).pipe(
      catchError((error) => this.handleError('createNewProduct', error))
    );
  }

  updateProduct(productId: string, data: any): Observable<any> {
    const endpoint = `${this.baseUrl}/v1/products/${productId}`;
    return this.http.patch(endpoint, data).pipe(
      catchError((error) => this.handleError('updateProduct', error))
    );
  }
// <<<<<<< main

//   deleteProduct(productId: any): Observable<any> {
//     const endpoint = `${this.baseUrl}/v1/products/deletemany`;
//     const body = JSON.stringify({ ids: productId }); // Stringify the body

//     return this.http.delete(endpoint, {
//       headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
//       body: body,
//     }).pipe(
//       catchError((error) => this.handleError('deleteProduct', error))
//     );
//   }

//   private handleError(method: string, error: any): Observable<never> {
//     let errorMessage = error?.error?.message || 'An unexpected error occurred';

//     if (error.message.includes("Cast to ObjectId failed")) {
//       errorMessage = "Invalid ID format provided."; // More user-friendly message
//       console.error("Invalid ObjectId format detected.", error); // Keep detailed error in console for debugging
//     } else {
//       console.error(`Error in ${method}:`, error); // Log the full error object
//     }

// =======
// // 
  deleteProduct(productId: any): Observable<any> {
    const endpoint = `${this.baseUrl}/v1/products/deletemany`;
    const body = { ids: productId };
    console.log(body);
    return this.http.delete(endpoint, { // Correct DELETE request
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: body // Correctly send the body
  })
      .pipe(catchError((error) => this.handleError('deleteProduct', error)));
  }


  // Centralized error handling
  private handleError(method: string, error: any): Observable<never> {
    const errorMessage =  error?.error?.message || 'An unexpected error occurred';
    // console.error(`Error in ${method}: ${errorMessage}`);

    // Add specific check for invalid ObjectId in error
    if (error.message.includes("Cast to ObjectId failed")) {
      console.error("Invalid ObjectId format detected.");
    }
    return throwError(() => new Error(`${method} failed: ${errorMessage}`));
  }
}


