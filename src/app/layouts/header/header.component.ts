import { Component } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [Dialog, ButtonModule, CommonModule, InputTextModule],
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
}
