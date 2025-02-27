import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ApiService } from '../../../core/services/api.service';
@Component({
  selector: 'app-invoice-print',
  imports: [CommonModule],
  templateUrl: './invoice-print.component.html',
  styleUrl: './invoice-print.component.scss'
})
export class InvoicePrintComponent implements OnInit {
  @Input() Id: any; // Input to receive invoice data
  invoiceData: any
  ngOnInit(): void {
    if (!this.Id) {
      console.error('Invoice data is required for PrintableInvoiceComponent');
    } else {
      this.getInvoiceWithId()
    }

  }

  constructor(private apiService: ApiService) { }

  convertNumberToWords(num: number | undefined): string {
    if (num === undefined) return ''; // Handle undefined case

    const ones = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
      "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

    function convertToWords(n: number): string {
      if (n < 20) return ones[n];
      if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + ones[n % 10] : "");
      if (n < 1000) return ones[Math.floor(n / 100)] + " Hundred" + (n % 100 !== 0 ? " and " + convertToWords(n % 100) : "");
      if (n < 100000) return convertToWords(Math.floor(n / 1000)) + " Thousand" + (n % 1000 !== 0 ? " " + convertToWords(n % 1000) : "");
      if (n < 10000000) return convertToWords(Math.floor(n / 100000)) + " Lakh" + (n % 100000 !== 0 ? " " + convertToWords(n % 100000) : "");
      if (n < 1000000000) return convertToWords(Math.floor(n / 10000000)) + " Crore" + (n % 10000000 !== 0 ? " " + convertToWords(n % 10000000) : "");
      return "Number too large";
    }

    return convertToWords(Math.round(num)); // Round to handle decimal amounts appropriately
  }

  getInvoiceWithId() {
    this.apiService.getinvoiceDataWithId(this.Id).subscribe((res: any) => {
      this.invoiceData = res.data
    })
  }

  downloadPDF() {
    const DATA = document.querySelector('.invoice-container') as HTMLElement;
    html2canvas(DATA).then(canvas => {
      const fileWidth = 210; // A4 size paper width in mm
      const fileHeight = 297; // A4 size paper height in mm
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      var width = pdf.internal.pageSize.getWidth();
      var height = pdf.internal.pageSize.getHeight();
      pdf.addImage(contentDataURL, 'PNG', 0, 0, width, height);
      pdf.save('invoice.pdf');
    });
  }
}

