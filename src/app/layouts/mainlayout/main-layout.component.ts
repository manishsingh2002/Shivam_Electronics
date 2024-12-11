import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent} from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-main-layout',
    template: `
    
<div class="min-h-full">
  <app-header></app-header>
  <main>
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
<router-outlet></router-outlet>
    </div>
  </main>
</div>
      <!-- <app-header></app-header>
      <div class="main-content">
        <app-sidebar></app-sidebar>
        <main class="content">
          <router-outlet></router-outlet>
        </main>
      </div>
      <app-footer></app-footer> -->
    `,
    styleUrl: './main-layout.component.scss',
  standalone: true,
  imports: [ SidebarComponent, RouterModule,FooterComponent, HeaderComponent],
  
})

export class MainLayoutComponent {}
