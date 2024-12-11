import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from '../dashboard/home-page/home-page.component';

@Component({
  selector: 'app-main-layout',
  template: `
    <div class="min-h-full">
      <app-header></app-header>
      <main>
        <!-- <div class="mx-auto w-full px-4 py-6 sm:px-6 lg:px-8"> -->
        <div class="mx-auto w-full  py-6 ">
          <!-- <app-home-page></app-home-page> -->
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  styleUrl: './main-layout.component.scss',
  standalone: true,
  imports: [
    SidebarComponent,
    RouterModule,
    FooterComponent,
    HeaderComponent,
    HomePageComponent,
  ],
})
export class MainLayoutComponent {}
