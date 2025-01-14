
// app-message.service.ts
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppMessageService {

  constructor(private messageService: MessageService) { }

  handleResponse(response: any, successSummary?: string, successDetail?: string) {
    if (response === 'success' ||response.statusCode === 200 || response.status === 201) {
      this.add({ severity: 'success', summary: successSummary || 'Success', detail: successDetail || 'Operation successful', life: 3000 });
    } else if (response.status === 204) {
        this.add({ severity: 'success', summary: successSummary || 'Success', detail: successDetail || 'Operation completed with no content', life: 3000 });
    }
     else {
       this.handleError(response);
    }
  }

  handleError(error: any, customSummary?: string) {
    let errorMessage = 'An unexpected error occurred';
    let summary = customSummary || 'Error';

    if (error instanceof HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Client Error: ${error.error.message}`;
      } else {
        // Server-side error
        errorMessage = `Server Error (Status ${error.status}): `;
        if (typeof error.error === 'string') {
          errorMessage += error.error;
        } else if (typeof error.error === 'object') {
          if (error.error.message) {
            errorMessage += error.error.message;
          }
          if (error.error.errors && Array.isArray(error.error.errors)) {
            errorMessage += "\nValidation Errors:\n";
            error.error.errors.forEach((validationError: any) => {
              errorMessage += `- ${validationError.msg || validationError.message || validationError.path}: ${validationError.value} \n`;
            });
          }
        } else {
          errorMessage += JSON.stringify(error.error);
        }
      }
    } else if (error.message) {
        errorMessage = error.message;
    }
    this.add({ severity: 'error', summary: summary, detail: errorMessage, life: 5000 });
  }

  add(message: { severity: string; summary: string; detail?: string; life?: number }) {
    this.messageService.add(message);
  }

  clear() {
    this.messageService.clear();
  }
}
// app-message.service.ts (or message.service.ts, whichever you prefer)
// import { Injectable } from '@angular/core';
// import { MessageService } from 'primeng/api';

// @Injectable({
//   providedIn: 'root'
// })
// export class AppMessageService {

//   constructor(private messageService: MessageService) { }

//   add(message: { severity: string; summary: string; detail?: string; life?: number }) {
//     this.messageService.add(message);
//   }

//   addSuccess(summary: string, detail?: string, life?: number) {
//     this.add({ severity: 'success', summary, detail, life });
//   }

//   addInfo(summary: string, detail?: string, life?: number) {
//     this.add({ severity: 'info', summary, detail, life });
//   }

//   addWarn(summary: string, detail?: string, life?: number) {
//     this.add({ severity: 'warn', summary, detail, life });
//   }

//   addError(summary: string, detail?: string, life?: number) {
//     this.add({ severity: 'error', summary, detail, life });
//   }

//   clear() {
//     this.messageService.clear();
//   }
// }