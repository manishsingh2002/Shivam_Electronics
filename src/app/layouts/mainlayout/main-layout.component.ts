import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterModule } from '@angular/router';
@Component({
    selector: 'app-main-layout',
    template: `
    <div class="min-h-full flex flex-col">
      <app-header
        class="fixed top-0 left-0 w-full bg-white z-20 shadow-md"
      ></app-header>

      <div class="flex flex-1 pt-[64px] overflow-hidden">
        <aside>
          <!-- class="fixed top-[64px] left-0 w-20 bg-gray-200 z-10 h-[calc(100vh-64px)] pt-0.625rem overflow-y-auto mt-16" -->
          <!--  -->
          <div class="flex flex-col items-center py-4">
            <!-- sidebar columnlist -->
            <!-- users -->
            <svg [routerLink]="['/login']" class="w-[20px] h-[20px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 24 24" >
              <path fill-rule="evenodd"  d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H6Zm7.25-2.095c.478-.86.75-1.85.75-2.905a5.973 5.973 0 0 0-.75-2.906 4 4 0 1 1 0 5.811ZM15.466 20c.34-.588.535-1.271.535-2v-1a5.978 5.978 0 0 0-1.528-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2h-4.535Z" clip-rule="evenodd"/>
            </svg>
            <!-- Billings -->
            <svg [routerLink]="['/admin/gst-invoice']" class="w-[20px] h-[20px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M9 7V2.221a2 2 0 0 0-.5.365L4.586 6.5a2 2 0 0 0-.365.5H9Zm2 0V2h7a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9h5a2 2 0 0 0 2-2Zm2-2a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2h-3Zm0 3a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2h-3Zm-6 4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-6Zm8 1v1h-2v-1h2Zm0 3h-2v1h2v-1Zm-4-3v1H9v-1h2Zm0 3H9v1h2v-1Z" clip-rule="evenodd"/>
            </svg>
            <!-- shop -->
            <svg [routerLink]="['/products']" class="w-[20px] h-[20px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M14 7h-4v3a1 1 0 0 1-2 0V7H6a1 1 0 0 0-.997.923l-.917 11.924A2 2 0 0 0 6.08 22h11.84a2 2 0 0 0 1.994-2.153l-.917-11.924A1 1 0 0 0 18 7h-2v3a1 1 0 1 1-2 0V7Zm-2-3a2 2 0 0 0-2 2v1H8V6a4 4 0 0 1 8 0v1h-2V6a2 2 0 0 0-2-2Z" clip-rule="evenodd"/>
            </svg>
          </div>
        </aside>

        <main class="flex-1 ml-20 px-1  overflow-y-auto">
          <div class="mx-auto w-full py-2">
            <router-outlet></router-outlet>
          </div>
        </main>
      </div>
    </div>
    <!-- <router-outlet></router-outlet> -->
  `,
    styleUrl: './main-layout.component.scss',
    imports: [
        RouterModule,
        HeaderComponent,
    ]
})
export class MainLayoutComponent {}
