import { Component } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DrawerModule } from 'primeng/drawer';
import { CommonModule } from '@angular/common';
import { TieredMenu } from 'primeng/tieredmenu';
import { MenuItem } from 'primeng/api';
import { Button } from 'primeng/button';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    TieredMenu,
    ButtonModule,
    CommonModule,
    DrawerModule,
    InputTextModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  shownotificationdropdown: boolean = false;
  appsdropdown: boolean = false;
  openUserDrop: boolean = false;

  notificationdropdown() {
    this.shownotificationdropdown = !this.shownotificationdropdown;
  }

  toggleAppDropDown() {
    this.appsdropdown = !this.appsdropdown;
  }
  openUserDropDown() {
    this.openUserDrop = !this.openUserDrop;
  }
  visible: boolean = false;

  position: string = 'topright';

  showDialog(position: string) {
    this.position = position;
    this.visible = true;
  }
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'File',
        icon: 'pi pi-file',
        items: [
          {
            label: 'New',
            icon: 'pi pi-plus',
            items: [
              {
                label: 'Document',
                icon: 'pi pi-file',
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
