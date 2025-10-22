import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeService } from 'src/app/service/theme/theme.service';

import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { Card } from 'primeng/card';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SearchComponent } from '../search/search.component';
import { SearchHistoryComponent } from '../search-history/search-history.component';

@Component({
  selector: 'app-header',
  imports: [MenubarModule, FormsModule, ToggleSwitchModule, Card],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [DialogService],
})
export class HeaderComponent {
  @Output() search = new EventEmitter();

  items: MenuItem[] = [
    {
      label: 'Pesquisar',
      icon: 'pi pi-search',
      command: () => this.showDlgSearch(),
    },
    {
      label: 'Histórico',
      icon: 'pi pi-history',
      command: () => this.showDlgHistory(),
    },
  ];

  checked: boolean = true;
  _themeService: ThemeService = inject(ThemeService);

  _dialogService = inject(DialogService);
  ref: DynamicDialogRef | undefined;

  ngOnInit() {
    this._themeService.toggleTheme();
  }

  onThemeChange(): void {
    this._themeService.toggleTheme();
  }

  showDlgSearch() {
    const dialogRef = this._dialogService.open(SearchComponent, {
      header: 'Pesquisar',
      width: '700px',
      modal: true,
      breakpoints: {
        '960px': '70vw',
        '640px': '90vw',
      },
      closable: true,
    });

    if (dialogRef) {
      this.ref = dialogRef;
      this.ref.onClose.subscribe(() => {
        this.search.emit();
      });
    }
  }

  showDlgHistory() {
    const dialogRef = this._dialogService.open(SearchHistoryComponent, {
      header: 'Histórico',
      width: '500px',
      modal: true,
      breakpoints: {
        '960px': '60vw',
        '640px': '90vw',
      },
      closable: true,
    });

    if (dialogRef) {
      this.ref = dialogRef;
      this.ref.onClose.subscribe(() => {
        this.search.emit();
      });
    }
  }
}
