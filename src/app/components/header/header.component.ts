import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeService } from 'src/app/service/theme/theme.service';

import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { InputSwitchModule } from 'primeng/inputswitch';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SearchComponent } from '../search/search.component';
import { SearchHistoryComponent } from '../search-history/search-history.component';

@Component({
  selector: 'app-header',
  imports: [MenubarModule, FormsModule, InputSwitchModule],
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
  ref!: DynamicDialogRef;

  ngOnInit() {
    this._themeService.toggleTheme();
  }

  onThemeChange(): void {
    this._themeService.toggleTheme();
  }

  showDlgSearch() {
    this.ref = this._dialogService.open(SearchComponent, {
      header: 'Pesquisar',
      width: '700px',
      modal: true,
      breakpoints: {
        '960px': '70vw',
        '640px': '90vw',
      },
      closable: true,
    });

    this.ref.onClose.subscribe(() => {
      this.search.emit();
    });
  }

  showDlgHistory() {
    this.ref = this._dialogService.open(SearchHistoryComponent, {
      header: 'Histórico',
      width: '500px',
      modal: true,
      breakpoints: {
        '960px': '60vw',
        '640px': '90vw',
      },
      closable: true,
    });

    this.ref.onClose.subscribe(() => {
      this.search.emit();
    });
  }
}
