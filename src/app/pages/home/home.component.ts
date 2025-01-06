import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { CardResultComponent } from 'src/app/components/card-result/card-result.component';
import { WeatherData } from 'src/app/interface/weather-data';
import { ClimateService } from 'src/app/service/climate/climate.service';

import { WeeklyWeatherData } from 'src/app/interface/weekly-weather-data';
import { TableResultComponent } from '../../components/table-result/table-result.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardResultComponent, TableResultComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public cityWeather!: WeatherData;
  public cityWeeklyWeather!: WeeklyWeatherData;

  private _climateService = inject(ClimateService);

  ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          this.getWeatherData(latitude, longitude);
          this.getWeeklyWeatherData(latitude, longitude);
        },
        (error) => this.handleGeolocationError(error)
      );
    } else {
      console.error('Geolocalização não é suportada pelo navegador.');
    }
  }

  private getWeatherData(lat: number, lon: number) {
    this._climateService
      .fetchWeatherByCoordinates(lat.toString(), lon.toString())
      .subscribe(
        (resp) => {
          this.cityWeather = resp;
        },
        (error) => {
          console.error('Erro ao obter os dados do clima:', error);
        }
      );
  }

  private getWeeklyWeatherData(lat: number, lon: number) {
    this._climateService
      .fetchWeeklyWeather(lat.toString(), lon.toString())
      .subscribe(
        (resp) => {
          console.log(resp);
          this.cityWeeklyWeather = resp;
        },
        (error) => {
          console.error('Erro ao obter os dados do clima:', error);
        }
      );
  }

  private handleGeolocationError(error: GeolocationPositionError): void {
    const errorMessages: Record<number, string> = {
      [error.PERMISSION_DENIED]:
        'Usuário negou a solicitação de geolocalização.',
      [error.POSITION_UNAVAILABLE]:
        'Informações de localização estão indisponíveis.',
      [error.TIMEOUT]: 'A solicitação para obter a localização expirou.',
    };

    console.error(errorMessages[error.code] || 'Ocorreu um erro desconhecido.');
  }
}
