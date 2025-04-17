import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  toggleTheme(): void {
    const html = document.querySelector('html');
    if (html) {
      html.classList.toggle('my-app-dark');
    }
  }
}
