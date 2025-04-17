import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

import { ClimateService } from 'src/app/service/climate/climate.service';
import { WeatherData } from 'src/app/interface/weather-data';
import { WeeklyWeatherData } from 'src/app/interface/weekly-weather-data';

import { CardResultComponent } from 'src/app/components/card-result/card-result.component';
import { TableResultComponent } from '../../components/table-result/table-result.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';

@Component({
    selector: 'app-home',
    imports: [
        CommonModule,
        HeaderComponent,
        CardResultComponent,
        TableResultComponent,
        SpinnerComponent,
    ],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public cityWeather!: WeatherData;
  public cityWeeklyWeather!: WeeklyWeatherData;
  public loading: boolean = false;

  private climateService = inject(ClimateService);

  ngOnInit(): void {
    this.getWeatherData();
  }

  public getWeatherData(): void {
    this.loading = true;

    this.climateService.fetchWeatherByCoordinates().subscribe({
      next: (resp) => {
        this.cityWeather = resp;
        this.loading = false;
      },
      error: (error) =>
        this.handleError(error, 'Erro ao obter os dados do clima'),
    });

    this.climateService.fetchWeeklyWeather().subscribe({
      next: (resp) => {
        this.cityWeeklyWeather = resp;
        this.loading = false;
      },
      error: (error) =>
        this.handleError(error, 'Erro ao obter os dados do clima semanal'),
    });
  }

  private handleError(error: any, message: string): void {
    console.error(message, error);
    this.loading = false;
  }
}
