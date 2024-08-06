import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeService } from 'src/app/service/theme/theme.service';

import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { InputSwitchModule } from 'primeng/inputswitch';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule, FormsModule, InputSwitchModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'], // Correção aqui
})
export class HeaderComponent {
  items: MenuItem[] | undefined;
  checked: boolean = true;
  selectedTheme: string = 'dark';
  themeService: ThemeService = inject(ThemeService);

  ngOnInit() {
    this.themeService.setTheme(this.selectedTheme);

    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/',
      },
      {
        label: 'Favoritos',
        icon: 'pi pi-star',
        routerLink: '/favorites',
      },
      {
        label: 'Pesquisar',
        icon: 'pi pi-search',
        routerLink: '/search',
      },
    ];
  }

  onThemeChange(theme: string): void {
    this.selectedTheme = theme;
    this.themeService.setTheme(theme);
  }
}
