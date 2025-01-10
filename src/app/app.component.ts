import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from './layouts/header/header.component';
import { HomePageComponent } from './layouts/dashboard/home-page/home-page.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { LoginComponent } from './features/auth/components/login/login.component';
import { MainDashboardComponent } from './layouts/main-dashboard/main-dashboard.component';
@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        ButtonModule,
        HeaderComponent,
        SidebarComponent,
        HomePageComponent,
        LoginComponent,
        MainDashboardComponent,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'shivam_Electronics';
}
