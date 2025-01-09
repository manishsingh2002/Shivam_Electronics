
import { Component } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
// import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
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
  standalone: true,
  imports: [FloatLabelModule, CommonModule, FormsModule, RouterModule, InputTextModule, TextareaModule, ButtonModule],
  templateUrl: './product-master.component.html',
  styleUrl: './product-master.component.scss'
})
export class ProductMasterComponent {
  product: Product = {
    title: '',
    description: '',
    detailedDescriptions: [{ id: '', detail: '' }],
    category: '',
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
    locations: [{type: 'Point', coordinates: ''}], // Initialized as string
    returnPolicy: '',
    minimumOrderQuantity: '',
    meta: { createdAt: new Date(), updatedAt: new Date(), barcode: '' },
    images: [{ id: '', detail: '', link: '' }], // Initialized
    thumbnail: '',
    salesPerson: [],
  };

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
  }
}
// import { Component } from '@angular/core';
// import { FloatLabelModule } from 'primeng/floatlabel';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

// import { CommonModule } from '@angular/common';
// interface DetailedDescription {
//   id: string;
//   detail: string;
// }

// interface Dimensions {
//   width: string;
//   height: string;
//   depth: string;
// }

// interface Location {
//   type: 'Point';
//   coordinates: number[];
//   address?: string;
//   description?: string;
//   day?: string;
// }

// interface Image {
//   id?: string;
//   detail?: string;
//   link?: string;
// }

// interface Meta {
//   createdAt: Date;
//   updatedAt: Date;
//   barcode: string;
//   qrCode?: string;
// }

// interface StartLocation {
//   type: 'Point';
//   coordinates: number[];
//   address?: string;
//   description?: string;
// }

// interface Product {
//   title: string;
//   description: string;
//   detailedDescriptions: DetailedDescription[];
//   category: string;
//   rate: string;
//   cgst: string;
//   sgst: string;
//   price: string;
//   discountPercentage?: string;
//   ratingAverage?: string;
//   ratingQuantity?: string;
//   stock: string;
//   tags: string[];
//   brand: string;
//   sku: string;
//   weight: string;
//   dimensions: Dimensions;
//   warrantyInformation: string;
//   shippingInformation: string;
//   availabilityStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
//   startLocation: StartLocation;
//   locations: Location[];
//   returnPolicy: string;
//   minimumOrderQuantity?: string;
//   meta: Meta;
//   images?: Image[];
//   thumbnail: string;
//   salesPerson?: any[]; // Use appropriate type for ObjectId if available
// }

// @Component({
//   selector: 'app-product-master',
//   standalone: true,
//   imports: [FloatLabelModule,CommonModule,FormsModule,RouterModule],
//   templateUrl: './product-master.component.html',
//   styleUrl: './product-master.component.scss'
// })

// export class ProductMasterComponent {


//     product: Product = {
//       title: '',
//       description: '',
//       detailedDescriptions: [{ id: '', detail: '' }], // Initialize as an array with one empty object
//       category: '',
//       rate: '',
//       cgst: '9',
//       sgst: '9',
//       price: '',
//       stock: '',
//       discountPercentage:'',
//       tags: [], // Initialize as empty array
//       brand: '',
//       sku: '',
//       weight: '',
//       dimensions: { width: '', height: '', depth: '' }, // Initialize nested object
//       warrantyInformation: '',
//       shippingInformation: '',
//       availabilityStatus: 'In Stock',
//       startLocation: { type: 'Point', coordinates: [] },
//       locations: [], // Initialize as empty array
//       returnPolicy: '',
//       images:[],
//       meta: { createdAt: new Date(), updatedAt: new Date(), barcode: '' }, // Initialize Date objects
//       thumbnail: '',
//     };
  
//     addDetailedDescription() {
//       this.product.detailedDescriptions.push({ id: '', detail: '' });
//     }
  
//     addLocation(){
//       this.product.locations.push({ type: 'Point', coordinates: [] });
//     }
//     addImage() {
//       this.product.images.push({ id: '', detail: '', link: '' });
//     }
  
//     onSubmit() {
//       console.log(this.product);
//       // Handle form submission
//     }
//   }