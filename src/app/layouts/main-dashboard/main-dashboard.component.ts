import { Component } from '@angular/core';
import { HomePageComponent } from '../dashboard/home-page/home-page.component';
import { Router, NavigationEnd } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
@Component({
  selector: 'app-main-dashboard',
  standalone: true,
  imports: [HomePageComponent, SidebarComponent, RouterModule,FooterComponent, HeaderComponent],
  templateUrl: './main-dashboard.component.html',
  styleUrl: './main-dashboard.component.scss',
})
export class MainDashboardComponent {
  showHeaderAndSidebar: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const noSidebarRoutes = ['/login', '/signup'];
        this.showHeaderAndSidebar = !noSidebarRoutes.includes(this.router.url);
      }
    });
  }
}
