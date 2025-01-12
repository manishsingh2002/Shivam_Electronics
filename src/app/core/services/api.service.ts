import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
// import { environment } from 'src/environments/environment'; // Adjust for environments

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:4000/api';
  public headers: any;

  constructor(private http: HttpClient, private authService: AuthService) { }
  ngOnInit(): void {
    this.headers = this.authService.getAuthHeaders();
  }

  //User authentication rlated
  getUserData() {
    const headers = this.authService.getAuthHeaders();
    return this.http.get('http://localhost:3000/api/v1/users/me', { headers });
  }

  updatePassword(data: any) {
    const headers = this.authService.getAuthHeaders();
    return this.http.patch(
      'http://localhost:3000/api/v1/users/updatePassword',
      data,
      { headers }
    );
  }

  // Fetch data
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

  getProductDatawithId(Id: any): Observable<Product> { // Return Observable<Product>
    return this.http.get<Product>(`${this.baseUrl}/v1/products/${Id}`) // Get a single Product
      .pipe(
        catchError((error, caught) => this.handleError('getProductDatawithId', error))
      );
  }

  // Create a new product
  createNewProduct(data: any): Observable<any> {
    const endpoint = `${this.baseUrl}/v1/products`;
    const token = localStorage.getItem('authToken'); 
    if (!token) {
      console.error("No token found. User not authenticated.");
      return new Observable(observer => observer.error("No token found"));
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Add the Authorization header
    });
    return this.http.post<any>(endpoint, data, { headers });
  }

  // Update a product
  // updateProduct(productId: string, data: any): Observable<any> {
  //   const endpoint = `${this.baseUrl}/v1/products/${productId}`;
  //   return this.http
  //     .put(endpoint, data)
  //     .pipe(catchError((error) => this.handleError('updateProduct', error)));
  // }


  updateProduct(productId: string, data: any): Observable<any> {
    const endpoint = `${this.baseUrl}/v1/products/${productId}`;
    const token = localStorage.getItem('authToken');

    if (!token) {
      console.error("No token found. User not authenticated.");
      return throwError(() => new Error("No token found")); // Use throwError directly
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.patch(endpoint, data, { headers }).pipe(
      catchError((error, caught) => this.handleError('updateProduct', error))
      // tap(response => console.log('Product updated successfully:', response)) // Optional success logging
    );
  }

  // Delete a product
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
    const errorMessage =
      error?.error?.message || 'An unexpected error occurred';
    console.error(`Error in ${method}: ${errorMessage}`);
    
    // Add specific check for invalid ObjectId in error
    if (error.message.includes("Cast to ObjectId failed")) {
      console.error("Invalid ObjectId format detected.");
    }
    
    return throwError(() => new Error(`${method} failed: ${errorMessage}`));
  }
  
}
