import { Component, inject, OnInit } from '@angular/core';

import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ScrollPanelModule } from 'primeng/scrollpanel';

import { StorageService } from 'src/app/service/storage/storage.service';
import { CityCoordinatesStorage } from 'src/app/interface/city-coordinates';

@Component({
  selector: 'app-search-history',
  standalone: true,
  imports: [TableModule, ButtonModule, TooltipModule, ScrollPanelModule],
  templateUrl: './search-history.component.html',
  styleUrl: './search-history.component.css',
})
export class SearchHistoryComponent implements OnInit {
  public researchHistory!: CityCoordinatesStorage[];

  private _storageService = inject(StorageService);

  private _ref = inject(DynamicDialogRef);

  ngOnInit(): void {
    this.getResearchHistory();
  }

  public getResearchHistory() {
    this.researchHistory = this._storageService.getAll();
  }

  public searchWeather(city: CityCoordinatesStorage) {
    this._storageService.add(city);
    this._ref.close();
  }

  public removeCity(city: CityCoordinatesStorage) {
    this._storageService.removeOne(city);

    this.getResearchHistory();
  }
}
