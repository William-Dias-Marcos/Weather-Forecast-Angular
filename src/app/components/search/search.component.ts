import { FormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';

import { ClimateService } from 'src/app/service/climate/climate.service';
import { CityCoordinatesService } from 'src/app/service/city-coordinates/city-coordinates.service';
import { WeatherData } from 'src/app/interface/weather-data';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  public city: string = '';
  public loading: boolean = false;
  public messsageHelp: string =
    'Faça a pesquisa de uma cidade para consultar o clima.';

  public cityWeather!: WeatherData;

  private _climateService = inject(ClimateService);
  private _cityCoordinatesService = inject(CityCoordinatesService);

  public _ref = inject(DynamicDialogRef);

  public search(city: string) {
    this.loading = true;
    this._climateService.fetchWeatherByLocationName(city).subscribe({
      next: (resp) => {
        this.cityWeather = resp;
        this._cityCoordinatesService.setCoordinates(resp.coord);
        console.log(resp.coord);
      },
      error: (err) => {
        console.error('Erro ao buscar o clima:', err);
        this.messsageHelp =
          'Erro ao buscar informações. Verifique o nome da cidade e tente novamente.';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
        this._ref.close();
      },
    });
  }
}