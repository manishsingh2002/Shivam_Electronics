import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private _isDarkMode: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isDarkMode$ = this._isDarkMode.asObservable();

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    // Load the saved theme from localStorage or default to light mode
    const savedTheme = localStorage.getItem('theme');
    this._isDarkMode.next(savedTheme === 'dark');
    this.applyTheme(this._isDarkMode.value);
  }

  toggleTheme() {
    const isDarkMode = !this._isDarkMode.value;
    this._isDarkMode.next(isDarkMode);
    this.applyTheme(isDarkMode);
  }

  private applyTheme(isDarkMode: boolean) {
    if (isDarkMode) {
      this.renderer.addClass(document.body, 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      this.renderer.removeClass(document.body, 'dark');
      localStorage.setItem('theme', 'light');
    }
  }
}
