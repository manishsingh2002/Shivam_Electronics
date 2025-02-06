// import { FloatLabelModule } from 'primeng/floatlabel';
// import { InputTextModule } from 'primeng/inputtext';
// import { TextareaModule } from 'primeng/textarea';
import { IftaLabelModule } from 'primeng/iftalabel';
// import { SelectModule } from 'primeng/select';

import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ApiService } from '../../../core/services/api.service';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CardModule } from 'primeng/card';
import { SelectModule } from 'primeng/select';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { RadioButtonModule } from 'primeng/radiobutton';
// import { ChartModule } from 'primeng/chart';
import { KeyFilterModule } from 'primeng/keyfilter';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { SupabaseService } from '../../../core/services/supabase.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer-master.component.html',
  styleUrls: ['./customer-master.component.scss'],
  imports: [
    CardModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TagModule,
    DialogModule,
    KeyFilterModule,
    TableModule,
    RadioButtonModule,
    InputTextModule, ButtonModule,
    SelectModule,
    FileUploadModule,
    ImageModule,
  ],
  providers: [ApiService,SupabaseService, IftaLabelModule, ConfirmationService, MessageService],
})
export class CustomerMasterComponent implements OnInit {
  selectedFile: File | null = null;
  imageUrl: string | null = null;
  bucketName = 'manish'; // Replace with your bucket name


  customer = {
    fullname: '',
    profileImg: '',
    email: '',
    status: 'pending',
    phoneNumbers: [{ number: '', type: 'mobile', primary: false }],
    addresses: [
      {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        type: 'home',
        isDefault: false,
      },
    ],
    cart: { items: [] },
    guaranteerId: '6787cc8facb090dbb35b773a',
    totalPurchasedAmount: 0,
    remainingAmount: 0,
    paymentHistory: [],
    metadata: {},
  };

  statuses = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
    { label: 'Pending', value: 'pending' },
    { label: 'Suspended', value: 'suspended' },
    { label: 'Blocked', value: 'blocked' },
  ];

  phoneTypes = [
    { label: 'Home', value: 'home' },
    { label: 'Mobile', value: 'mobile' },
    { label: 'Work', value: 'work' },
  ];

  addressTypes = [
    { label: 'Billing', value: 'billing' },
    { label: 'Shipping', value: 'shipping' },
    { label: 'Home', value: 'home' },
    { label: 'Work', value: 'work' }
  ];

  newAddress = {
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    type: 'home',
    isDefault: false
  };

  phoneDialogVisible = false;
  newPhoneNumber: any = {};
  // i: number;
  customerId: string = '12345'; // You should dynamically get this from your application (e.g., logged-in user's customer ID)
  uploadStatus: string = ''; // For showing the status of the upload

  constructor(
    private supabase: SupabaseService,
    private ApiService: ApiService,
    private http:HttpClient,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    // Fetch customer data (replace with your actual logic)
    // this.getCustomerID();
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    this.upload()
  }

  async upload() {
    if (this.selectedFile) {
        const timestamp = Date.now();
        const filePath = `${timestamp}-${this.selectedFile.name}`;
        const uploadResult = await this.supabase.uploadImage(this.selectedFile, this.bucketName, filePath);

        if ('data' in uploadResult && uploadResult.data) {  // Check if 'data' exists
            this.imageUrl = await this.supabase.getImageUrl(this.bucketName, filePath);
            console.log("Image URL:", this.imageUrl); // Log for debugging
        } else if ('error' in uploadResult && uploadResult.error) {
            console.error("Upload failed:", uploadResult.error);
            // Display error message to the user (important!)
            alert(`Upload failed: ${uploadResult.error.message || 'Unknown error'}`); // Example
        } else {
          console.error("Unexpected upload result:", uploadResult); // Handle unexpected cases
        }
    }
}
  // async upload() {
  //   if (this.selectedFile) {
  //       const timestamp = Date.now(); // or use UUID library
  //       const filePath = `${timestamp}-${this.selectedFile.name}`; // Create a unique filename
  //       const uploadResult = await this.supabase.uploadImage(this.selectedFile, this.bucketName, filePath);

  //       if (uploadResult?.data) {
  //           this.imageUrl = await this.supabase.getImageUrl(this.bucketName, filePath);
  //       } else if (uploadResult?.error) {
  //           // Handle error
  //           console.error("Upload failed:", uploadResult?.error);
  //       }
  //   }
  // }

  // async onFileSelected(event: Event) {
  //   console.log(event)
  //   const input = event.target as HTMLInputElement;
  //   const file = input.files?.[0];
  //   if (!file) return;

  //   try {
  //     const data = await this.supabase.uploadImage(
  //       file,
  //       'bucket-name',
  //       `uploads/${file.name}`
  //     );
  //     console.log('Upload successful:', data);
  //   } catch (error) {
  //     console.error('Upload failed:', error);
  //   }
  // }

  getCustomerID() {
    // Assuming you have a customer ID available (e.g., from route params)
    const customerId = 'your-customer-id';

    this.ApiService.getCustomerDataWithId(customerId)
      .subscribe({
        next: (customer) => {
          this.customer = customer;
        },
        error: (err) => {
          console.error('Error fetching customer:', err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load customer data.' });
        }
      });
  }


  
  // handleFileSelect(event?: any) {
  //   console.log(event);
  //   const file = event.files[0]; 
  //   if (file) {
  //     this.uploadStatus = 'Preparing to upload...';
  //     const formData = new FormData();
  //     formData.append('image', file); // Append the selected file to FormData
  //     // this.ApiService.uploadProfileImage(formData, this.customerId).subscribe(
  //     //   (response: any) => {
  //     //     this.uploadStatus = 'Image uploaded successfully!';
  //     //     console.log('Upload Response:', response);
  //     //   },
  //     //   (error: any) => {
  //     //     this.uploadStatus = 'Error uploading image.';
  //     //     console.error('Upload Error:', error);
  //     //   }
  //     // );
  //   } else {
  //     console.log('No file selected');
  //   }
  // }
  
  // handleFileSelect(event?: any) {
  //   const file = event.files[0];  // Extract the first selected file

  //   if (file) {
  //     this.uploadStatus = 'Preparing to upload...';
  //     const formData = new FormData();
  //     formData.append('image', file); 
      
  //     this.ApiService.uploadProfileImage(formData, this.customerId).subscribe(
  //       (response:any) => {
  //         this.uploadStatus = 'Image uploaded successfully!';
  //         console.log('Upload Response:', response);
  //       },
  //       (error:any) => {
  //         this.uploadStatus = 'Error uploading image.';
  //         console.error('Upload Error:', error);
  //       }
  //     );
  //   } else {
  //     console.log('No file selected');
  //   }
  // }

  // Handle file upload
  handleFileUpload(event: any) {
    console.log('File uploaded:', event);
  }


  // saveCustomer() {
  //   if (this.validateCustomer()) {
  //     this.ApiService.createNewCustomer(this.customer).subscribe(
  //       (response: { data: { _id: any; }; }) => {
  //         response.data._id
  //         this.handleFileSelect()
  //         // this.ApiService.updateCustomerImage()
  //       });
  //   } else {
  //     this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please correct the errors in the form.' });
  //   }
  // }
  
  saveCustomer() {
    if (this.validateCustomer()) {
      this.ApiService.createNewCustomer(this.customer).subscribe(
        (response: any) => {
          console.log(response);
          const customerId = response.data.data._id; 
          console.log('Customer ID:', customerId);
          this.customerId = customerId;  
          // this.handleFileSelect();
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create customer.' });
        }
      );
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please correct the errors in the form.' });
    }
  }
  

  validateCustomer(): boolean {
    // Basic validation checks
    if (!this.customer.fullname) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Fullname is required.' });
      return false;
    }

    if (!this.customer.email || !this.customer.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please enter a valid email address.' });
      return false;
    }

    return true;
  }

  showPhoneDialog() {
    this.phoneDialogVisible = true;
  }

  addPhoneNumber() {
    if (this.newPhoneNumber.number && this.newPhoneNumber.type) {
      this.customer.phoneNumbers.push(this.newPhoneNumber);
      this.phoneDialogVisible = false;
      this.newPhoneNumber = {};
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please enter phone number and type.' });
    }
  }

  deletePhone(index: number) {
    this.customer.phoneNumbers.splice(index, 1);
  }

  addAddress() {
    if (this.newAddress.street && this.newAddress.city) {
      this.customer.addresses.push({ ...this.newAddress });
      this.newAddress = { street: '', city: '', state: '', zipCode: '', country: '', type: 'home', isDefault: false };
    }
  }

  setDefaultAddress(index: number) {
    this.customer.addresses.forEach((address: { isDefault: boolean; }, i: any) => address.isDefault = i === index);
  }

  removeAddress(index: number) {
    this.customer.addresses.splice(index, 1);
  }
}



    // Send the file to the backend
  // uploadProfileImage(formData: FormData, customerId: string): Observable<any> {
  //   const apiUrl = `http://localhost:3000/api/customers/${customerId}/profile-image`; // Backend endpoint
  //   return this.http.post(apiUrl, formData).pipe(
  //     catchError((error:any) => {
  //       console.error('Upload Error:', error);
  //       return of(error); // Fallback in case of an error
  //     })
  //   );
  // }


  // //////////////

  // uploadImage(formData: FormData): Observable<any> {
  //   const apiUrl = 'your-api-endpoint'; // Replace with your backend API URL
  //   return this.http.post(apiUrl, formData).pipe(
  //     catchError((error: any) => {
  //       console.error('Upload error:', error);
  //       return of(error); // Handle the error and return a fallback
  //     })
  //   );
  // }
  
//   public customer = {
  //     fullname: '',
  //     email: '',
//     status: 'pending',
//     phoneNumbers: [{ number: '', type: 'mobile', primary: false }],

//     addresses: [
  //       {
//         street: '',
//         city: '',
//         state: '',
//         zipCode: '',
//         country: '',
//         type: 'home',
//         isDefault: false,
//       },
//     ],
//     cart: { items: [] },
//     guaranteerId: '',
//     totalPurchasedAmount: 0,
//     remainingAmount: 0,
//     paymentHistory: [],
//     metadata: {},
//   };

//   statuses = [
//     { label: 'Active', value: 'active' },
//     { label: 'Inactive', value: 'inactive' },
//     { label: 'Pending', value: 'pending' },
//     { label: 'Suspended', value: 'suspended' },
//     { label: 'Blocked', value: 'blocked' },
//   ];

//   phoneTypes = [
//     { label: 'Home', value: 'home' },
//     { label: 'Mobile', value: 'mobile' },
//     { label: 'Work', value: 'work' },
//   ];

//   addressTypes = [
//     { label: 'Billing', value: 'billing' },
//     { label: 'Shipping', value: 'shipping' },
//     { label: 'Home', value: 'home' },
//     { label: 'Work', value: 'work' },
//   ];

//   productdropdwn: any;

//   constructor(
//     private apiService: ApiService,
//     @Inject(PLATFORM_ID) private platformId: Object
//   ) {}

//   ngOnInit() {
  //     if (isPlatformBrowser(this.platformId)) {
    //       const storedData = localStorage.getItem('autopopulate');
//       if (storedData) {
  //         try {
    //           const parsedData = JSON.parse(storedData);
//           this.productdropdwn = parsedData.products || [];
//         } catch (error) {
//           console.error('Error parsing JSON from localStorage:', error);
//           this.productdropdwn = [];
//         }
//       } else {
  //         console.log('No data found in localStorage for key "autopopulate"');
  //       }
  //     }
  //   }
  
  //   addPhoneNumber() {
    //     this.customer.phoneNumbers.push({
//       number: '',
//       type: 'mobile',
//       primary: false,
//     });
//   }

//   addAddress() {
//     this.customer.addresses.push({
  //       street: '',
//       city: '',
//       state: '',
//       zipCode: '',
//       country: '',
//       type: 'home',
//       isDefault: false,
//     });
//   }

//   saveCustomer() {
//     this.customer
//    this.apiService.createNewCustomer(this.customer).subscribe((res:any)=>{
  //     console.log(res);
//    })
//   }
// }

// // import { Component, Inject, Input, PLATFORM_ID, SimpleChanges } from '@angular/core';
// // import { FloatLabelModule } from 'primeng/floatlabel';
// // import {  FormsModule,  ReactiveFormsModule } from '@angular/forms';
// // import { RouterModule } from '@angular/router';
// // import { CommonModule } from '@angular/common';
// // import { InputTextModule } from 'primeng/inputtext';
// // import { ButtonModule } from 'primeng/button';
// // import { TextareaModule } from 'primeng/textarea';
// // import { ApiService } from '../../../core/services/api.service';
// // import { Select } from 'primeng/select';
// // import { isPlatformBrowser } from '@angular/common';
// // import { IftaLabelModule } from 'primeng/iftalabel';

// // interface PhoneNumber {
  // //   number: string;
// //   type: 'home' | 'mobile' | 'work';
// //   primary: boolean;
// // }

// // interface Address {
  // //   street: string;
  // //   city: string;
  // //   state: string;
  // //   zipCode: string;
  // //   country: string;
  // //   type: 'billing' | 'shipping' | 'home' | 'work';
// //   isDefault: boolean;
// // }

// // interface Customer {
// //   customerId?: string;
// //   email: string;
// //   firstName: string;
// //   lastName: string;
// //   birthDate: Date;
// //   phoneNumbers: PhoneNumber[];
// //   addresses: Address[];
// //   preferences: {
// //     marketingEmails: boolean;
// //     communicationLanguage: string;
// //     currency: string;
// //     newsletterSubscription: boolean;
// //     productNotifications: boolean;
// //   };
// //   metadata?: any;
// // }

// // @Component({
  // //   selector: 'app-customer-master',
  // //   imports: [FloatLabelModule,IftaLabelModule, Select, FormsModule, CommonModule, ReactiveFormsModule, RouterModule, InputTextModule, TextareaModule, ButtonModule],
  // //   templateUrl: './customer-master.component.html',
  // //   styleUrl: './customer-master.component.scss'
  // // })
  // // export class CustomerMasterComponent {
// //   productdropdwn: any;
// // constructor(private apiService: ApiService, @Inject(PLATFORM_ID) private platformId: Object) { }
// // customer = {
  // //   fullname: '',
// //   email: '',
// //   status: 'pending',
// //   phoneNumbers: [{ number: '', type: 'mobile', primary: false }],
// //   addresses: [{
// //     street: '',
// //     city: '',
// //     state: '',
// //     zipCode: '',
// //     country: '',
// //     type: 'home',
// //     isDefault: false,
// //   }],
// //   cart: { items: [] },
// //   guaranteerId: '',
// //   totalPurchasedAmount: 0,
// //   remainingAmount: 0,
// //   paymentHistory: [],
// //   metadata: {},
// // };

// // statuses = [
  // //   { label: 'Active', value: 'active' },
  // //   { label: 'Inactive', value: 'inactive' },
  // //   { label: 'Pending', value: 'pending' },
  // //   { label: 'Suspended', value: 'suspended' },
  // //   { label: 'Blocked', value: 'blocked' },
  // // ];
  
  // // phoneTypes = [
    // //   { label: 'Home', value: 'home' },
// //   { label: 'Mobile', value: 'mobile' },
// //   { label: 'Work', value: 'work' },
// // ];

// // addressTypes = [
// //   { label: 'Billing', value: 'billing' },
// //   { label: 'Shipping', value: 'shipping' },
// //   { label: 'Home', value: 'home' },
// //   { label: 'Work', value: 'work' },
// // ];

// // ngOnInit() {
  // //   if (isPlatformBrowser(this.platformId)) {
    // //     const storedData = localStorage.getItem('autopopulate');
    // //     if (storedData) {
// //       try {
// //         const parsedData = JSON.parse(storedData); // Parse the JSON string
// //         this.productdropdwn = parsedData.products || []; // Access the products array (or empty array if not present)
// //         console.log(this.productdropdwn);
// //       } catch (error) {
// //         console.error('Error parsing JSON from localStorage:', error);
// //         this.productdropdwn = [];
// //       }
// //     } else {
// //       console.log('No data found in localStorage for key "autopopulate"');
// //     }
// //   }
// // }

// // // Add a new phone number field
// // addPhoneNumber() {
  // //   this.customer.phoneNumbers.push({
// //     number: '',
// //     type: 'mobile',
// //     primary: false,
// //   });
// // }

// // // Add a new address field
// // addAddress() {
// //   this.customer.addresses.push({
  // //     street: '',
  // //     city: '',
  // //     state: '',
  // //     zipCode: '',
// //     country: '',
// //     type: 'home',
// //     isDefault: false,
// //   });
// // }

// // // Save customer data (mock function)
// // saveCustomer() {
  // //   console.log('Customer data:', this.customer);
  // //   alert('Customer data saved successfully!');
  // // }
  // // }
  
  
  
  // ////////////////////////////////////////////
  // getCustomer() {
  //   // Assuming you have a customer ID available (e.g., from route params)
  //   const customerId = 'your-customer-id';
  
  //   this.ApiService.getAllCustomerData()
  //     .subscribe({
  //       next: (customer) => {
  //         this.customer = customer;
  //       },
  //       error: (err) => {
  //         console.error('Error fetching customer:', err);
  //         this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load customer data.' });
  //       }
  //     });
  // }
  // handleImageUpload(event?: any, ID?: any) {
  //   console.log(event);
  //   this.ApiService.updateCustomerImage("data", ID).subscribe((res: any) => {
  //     console.log(res);
  //   })
  // }
  
  
  // handleImageUpload(event?: any, ID?: any) {
  //   console.log(event);
  //   const file = event.files[0];
  //   if (file) {
  //     const formData = new FormData();
  //     formData.append('file', file);
  //     formData.append('ID', '6787cc8facb090dbb35b773a');
  
  //     this.ApiService.updateCustomerImage(formData, '6787cc8facb090dbb35b773a').subscribe((res: any) => {
  //       console.log('File uploaded successfully:', res);
  //     }, (error) => {
  //       console.error('Error uploading file:', error);
  //     });
  //   } else {
  //     console.log('No file selected');
  //   }
  // }
  
  
  // handleFileSelect(event: any) {
  //   const file = event.files[0];  // Extract the selected file
  
  //   if (file) {
  //     const formData = new FormData();
  //     formData.append('image', file);  // Append the file to FormData
  
  //     // Assuming customerId is available
  //     this.uploadProfileImage(formData, customerId).subscribe(
  //       (response) => {
  //         console.log('Image uploaded successfully:', response);
  //       },
  //       (error) => {
  //         console.error('Error uploading image:', error);
  //       }
  //     );
  //   } else {
  //     console.log('No file selected');
  //   }
  // }
  
  
  
  
  //   console.log('File selected:', event.files);
  //   const file = event.files[0];  // Get the selected file (first one in the array)
  
  //   if (file) {
  //     const formData = new FormData();
  //     formData.append('file', file); // Append the file to FormData
  
  //     this.uploadImage(formData).subscribe(
  //       (response: any) => {
  //         console.log('Upload successful:', response);
  //       },
  //       (error: any) => {
  //         console.error('Error uploading file:', error);
  //       }
  //     );
  //   }
  // }
  
  // API call to upload the file
