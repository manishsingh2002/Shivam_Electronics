import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from './layouts/header/header.component';
import { HomePageComponent } from './layouts/dashboard/home-page/home-page.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { LoginComponent } from './features/auth/components/login/login.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ButtonModule,
    HeaderComponent,
    SidebarComponent,
    HomePageComponent,
    LoginComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'shivam_Electronics';
}
