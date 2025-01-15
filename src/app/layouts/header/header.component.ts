import { Component, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DrawerModule } from 'primeng/drawer';
import { CommonModule } from '@angular/common';
import { TieredMenu } from 'primeng/tieredmenu';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

import { Ripple } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClass } from 'primeng/styleclass';
import { Drawer } from 'primeng/drawer';
@Component({
    selector: 'app-header',
    imports: [
        TieredMenu,
        ButtonModule,
        CommonModule,
        DrawerModule, AvatarModule,
        InputTextModule,
        RouterModule,
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
  shownotificationdropdown: boolean = false;
  appsdropdown: boolean = false;
  openUserDrop: boolean = false;
  visible: boolean = false;
  position: string = 'topright';

  notificationdropdown() {
    this.shownotificationdropdown = !this.shownotificationdropdown;
  }

  
toggleDarkMode() {
  const element = document.querySelector('html');
  element?.classList.toggle('my-app-dark');
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
  Admin: MenuItem[] | undefined;

  ngOnInit() {
    this.getmenuitem()
    }
    @ViewChild('drawerRef') drawerRef!: Drawer;

    closeCallback(e: Event): void {
        this.drawerRef.close(e);
    }

    getmenuitem(){
      this.Admin = [
        {
          label: 'Admin',
          icon: 'pi pi-file',
          items: [
            {
              label: 'Billing',
              icon: 'pi pi-plus',
              items: [
                {
                  label: 'invoice',
                  icon: 'pi pi-file',
                  routerLink: ['/admin/gst-invoice'],
                },
                {
                  label: 'Image',
                  icon: 'pi pi-image',
                },
                {
                  label: 'Video',
                  icon: 'pi pi-video',
                },
              ],
            },
            {
              label: 'Open',
              icon: 'pi pi-folder-open',
            },
            {
              label: 'Print',
              icon: 'pi pi-print',
            },
          ],
        },
        {
          label: 'Edit',
          icon: 'pi pi-file-edit',
          items: [
            {
              label: 'Copy',
              icon: 'pi pi-copy',
            },
            {
              label: 'Delete',
              icon: 'pi pi-times',
            },
          ],
        },
        {
          label: 'Search',
          icon: 'pi pi-search',
        },
        {
          separator: true,
        },
        {
          label: 'Share',
          icon: 'pi pi-share-alt',
          items: [
            {
              label: 'Slack',
              icon: 'pi pi-slack',
            },
            {
              label: 'Whatsapp',
              icon: 'pi pi-whatsapp',
            },
          ],
        },
      ];
    }

}

  