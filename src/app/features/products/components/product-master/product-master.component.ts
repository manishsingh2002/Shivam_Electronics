
import { Component, Inject, Input, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormControl, FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
// import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { ApiService } from '../../../../core/services/api.service';
import { Select } from 'primeng/select';
import { isPlatformBrowser } from '@angular/common';

interface DetailedDescription {
  id: string;
  detail: string;
}

interface Dimensions {
  width: string;
  height: string;
  depth: string;
}

interface Location {
  type: 'Point';
  coordinates: string; // Changed to string to handle input
  address?: string;
  description?: string;
  day?: string;
}

interface Image {
  id?: string;
  detail?: string;
  link?: string;
}

interface Meta {
  createdAt: Date;
  updatedAt: Date;
  barcode: string;
  qrCode?: string;
}

interface StartLocation {
  type: 'Point';
  coordinates: string; // Changed to string
  address?: string;
  description?: string;
}

interface Product {
  title: string;
  description: string;
  detailedDescriptions: DetailedDescription[];
  category: string;
  rate: string;
  cgst: string;
  sgst: string;
  price: string;
  discountPercentage?: string;
  ratingAverage?: string;
  ratingQuantity?: string;
  stock: string;
  tags: string[];
  brand: string;
  sku: string;
  weight: string;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  startLocation: StartLocation;
  locations: Location[];
  returnPolicy: string;
  minimumOrderQuantity?: string;
  meta: Meta;
  images: Image[]; // Changed to non-optional
  thumbnail: string;
  salesPerson?: any[];
}

@Component({
  selector: 'app-product-master',
  // imports: [FloatLabelModule, Select, FormsModule, CommonModule, ReactiveFormsModule, RouterModule, InputTextModule, TextareaModule, ButtonModule],

  imports: [FloatLabelModule, Select, FormsModule, CommonModule, ReactiveFormsModule, RouterModule, InputTextModule, TextareaModule, ButtonModule],
  templateUrl: './product-master.component.html',
  styleUrl: './product-master.component.scss'
})
export class ProductMasterComponent {

  product: Product = {
    title: '',
    description: '',
    detailedDescriptions: [{ id: '', detail: '' }],
    category: 'manish',
    rate: '',
    cgst: '9',
    sgst: '9',
    price: '',
    stock: '',
    tags: [],
    brand: '',
    sku: '',
    weight: '',
    dimensions: { width: '', height: '', depth: '' },
    warrantyInformation: '',
    shippingInformation: '',
    availabilityStatus: 'In Stock',
    startLocation: { type: 'Point', coordinates: '' }, // Initialized as string
    locations: [{ type: 'Point', coordinates: '' }], // Initialized as string
    returnPolicy: '',
    minimumOrderQuantity: '',
    meta: { createdAt: new Date(), updatedAt: new Date(), barcode: '' },
    images: [{ id: '', detail: '', link: '' }], // Initialized
    thumbnail: '',
    salesPerson: [],
  };
  @Input() redirectedData:any
  public productdata: any
  public productdropdwn: any
  public selectedProductId: any;

  constructor(private apiService: ApiService, @Inject(PLATFORM_ID) private platformId: Object) { }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const storedData = localStorage.getItem('autopopulate');
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData); // Parse the JSON string
          this.productdropdwn = parsedData.products || []; // Access the products array (or empty array if not present)
          console.log(this.productdropdwn);
        } catch (error) {
          console.error('Error parsing JSON from localStorage:', error);
          // Handle the error appropriately, e.g., set a default value or display an error message
          this.productdropdwn = [];
        }
      } else {
        console.log('No data found in localStorage for key "autopopulate"');
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.redirectedData)  this.product= this.redirectedData
  }

  Update() {
    this.apiService.updateProduct(this.selectedProductId, this.product).subscribe((res: any) => {
      console.log(res);
    })
  }

  autopopulate() {
    if (this.selectedProductId) { // Check if a product ID is selected
      this.apiService.getProductDatawithId(this.selectedProductId).subscribe(
        (res: any) => {
          this.productdata = res;
          this.product =res.data
         console.log("populated product", this.product)
        },
        (error) => {
          console.error('Error fetching product data:', error);
          // Handle the error (e.g., display an error message to the user)
        }
      );
    }
  }

  addDetailedDescription() {
    this.product.detailedDescriptions.push({ id: '', detail: '' });
  }

  addLocation() {
    this.product.locations.push({ type: 'Point', coordinates: '' });
  }

  addImage() {
    this.product.images.push({ id: '', detail: '', link: '' });
  }

  removeImage(index: number) {
    this.product.images.splice(index, 1);
  }

  onSubmit() {
    console.log(this.product);
    this.apiService.createNewProduct(this.product).subscribe((res: any) => {
      console.log(res);
    })
  }
}
