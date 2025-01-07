import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

import { ClimateService } from 'src/app/service/climate/climate.service';
import { CityCoordinatesService } from 'src/app/service/city-coordinates/city-coordinates.service';
import { WeatherData } from 'src/app/interface/weather-data';
import { WeeklyWeatherData } from 'src/app/interface/weekly-weather-data';

import { CardResultComponent } from 'src/app/components/card-result/card-result.component';
import { TableResultComponent } from '../../components/table-result/table-result.component';
import { HeaderComponent } from 'src/app/components/header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    CardResultComponent,
    TableResultComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public cityWeather!: WeatherData;
  public cityWeeklyWeather!: WeeklyWeatherData;

  private _climateService = inject(ClimateService);
  private _cityCoordinatesService = inject(CityCoordinatesService);

  ngOnInit(): void {
    setTimeout(() => {
      this.getWeatherData();
    }, 100);
  }

  public getWeatherData() {
    this._climateService.fetchWeatherByCoordinates().subscribe(
      (resp) => {
        this.cityWeather = resp;
      },
      (error) => {
        console.error('Erro ao obter os dados do clima:', error);
      }
    );

    this._climateService.fetchWeeklyWeather().subscribe(
      (resp) => {
        this.cityWeeklyWeather = resp;
      },
      (error) => {
        console.error('Erro ao obter os dados do clima:', error);
      }
    );
  }
}
