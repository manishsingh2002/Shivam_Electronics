import { Component, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DrawerModule } from 'primeng/drawer';
import { CommonModule } from '@angular/common';
import { TieredMenu } from 'primeng/tieredmenu';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { Ripple } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClass } from 'primeng/styleclass';
import { Drawer } from 'primeng/drawer';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    TieredMenu,
    ButtonModule,
    CommonModule,
    DrawerModule,
    AvatarModule,
    InputTextModule,
    RouterModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  shownotificationdropdown = false;
  appsdropdown = false;
  openUserDrop = false;
  visible = false;
  position = 'topright';
  themeLabel = 'Dark Mode';

  @ViewChild('drawerRef') drawerRef!: Drawer;

  constructor(private themeService: ThemeService) {
    this.themeLabel = localStorage.getItem('theme') === 'dark' ? 'Light Mode' : 'Dark Mode';
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.themeLabel = this.themeLabel === 'Dark Mode' ? 'Light Mode' : 'Dark Mode';
  }

  toggleNotificationDropdown() {
    this.shownotificationdropdown = !this.shownotificationdropdown;
  }

  toggleAppDropDown() {
    this.appsdropdown = !this.appsdropdown;
  }

  openUserDropDown() {
    this.openUserDrop = !this.openUserDrop;
  }

  showDialog(position: string) {
    this.position = position;
    this.visible = true;
  }

  closeCallback(e: Event): void {
    this.drawerRef.close(e);
  }

  menuItems: MenuItem[] = [];

  ngOnInit() {
    this.getMenuItems();
  }

  getMenuItems() {
    this.menuItems = [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        routerLink: ['/dashboard']
      },
      {
        label: 'Admin',
        icon: 'pi pi-users',
        items: [
          {
            label: 'Users',
            icon: 'pi pi-user',
            routerLink: ['/admin/users']
          },
          {
            label: 'Invoice',
            icon: 'pi pi-file-invoice',
            routerLink: ['/admin/invoice']
          },
          {
            label: 'Payment',
            icon: 'pi pi-credit-card',
            routerLink: ['/admin/payment']
          }
        ]
      },
      {
        label: 'Customers',
        icon: 'pi pi-user-plus',
        items: [
          {
            label: 'List',
            icon: 'pi pi-list',
            routerLink: ['/customers/list']
          },
          {
            label: 'Master',
            icon: 'pi pi-cog',
            routerLink: ['/customers/master']
          },
          {
            label: 'Details',
            icon: 'pi pi-info-circle',
            routerLink: ['/customers/details']
          }
        ]
      },
      {
        label: 'Invoices',
        icon: 'pi pi-file',
        items: [
          {
            label: 'View',
            icon: 'pi pi-eye',
            routerLink: ['/invoices/view']
          },
          {
            label: 'Create',
            icon: 'pi pi-plus',
            routerLink: ['/invoices/create']
          }
        ]
      },
      {
        label: 'Products',
        icon: 'pi pi-box',
        items: [
          {
            label: 'List',
            icon: 'pi pi-list',
            routerLink: ['/products/list']
          },
          {
            label: 'Master',
            icon: 'pi pi-cog',
            routerLink: ['/products/master']
          }
        ]
      }
    ];
  }
}
