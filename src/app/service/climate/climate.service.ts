import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { WeatherData } from 'src/app/interface/weather-data';
import { WeeklyWeatherData } from 'src/app/interface/weekly-weather-data';
import { CityCoordinatesService } from '../city-coordinates/city-coordinates.service';

@Injectable({
  providedIn: 'root',
})
export class ClimateService {
  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;
  private apiKey2 = environment.apiKey2;

  private _http = inject(HttpClient);
  private _cityCoordinatesService = inject(CityCoordinatesService);

  public fetchWeatherByCoordinates(): Observable<WeatherData> {
    const lat = this._cityCoordinatesService.getCoordinates()?.lat;
    const lon = this._cityCoordinatesService.getCoordinates()?.lon;
    const url = `${this.apiUrl}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}&lang=pt_br`;
    return this._http.get<WeatherData>(url);
  }

  public fetchWeatherByLocationName(
    locationName: string
  ): Observable<WeatherData> {
    const url = `${this.apiUrl}/weather?q=${locationName}&units=metric&appid=${this.apiKey}&lang=pt_br`;
    return this._http.get<WeatherData>(url);
  }

  public fetchWeeklyWeather(): Observable<WeeklyWeatherData> {
    const lat = this._cityCoordinatesService.getCoordinates()?.lat;
    const lon = this._cityCoordinatesService.getCoordinates()?.lon;

    const url = `${this.apiUrl}/forecast/daily?lat=${lat}&lon=${lon}&appid=${this.apiKey2}&units=metric&lang=pt_br&cnt=7`;
    return this._http.get<WeeklyWeatherData>(url);
  }
}
