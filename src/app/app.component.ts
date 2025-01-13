import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ApiService } from './core/services/api.service';
import { isPlatformBrowser } from '@angular/common';
@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        ButtonModule,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'shivam_Electronics';

  constructor(private ApiServide:ApiService,@Inject(PLATFORM_ID) private platformId: Object){}
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.ApiServide.getAutopopulateData().subscribe((res)=>{
      console.log(res)
      localStorage.setItem('autopopulate', JSON.stringify(res.data));
    })}
}
}
