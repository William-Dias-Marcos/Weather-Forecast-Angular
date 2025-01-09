import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { WeatherData } from 'src/app/interface/weather-data';
import { WeeklyWeatherData } from 'src/app/interface/weekly-weather-data';

import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class ClimateService {
  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;
  private apiKey2 = environment.apiKey2;

  private _http = inject(HttpClient);

  private _storageService = inject(StorageService);

  public fetchWeatherByCoordinates(): Observable<WeatherData> {
    const city = this._storageService.getLastAdded();

    const url = `${this.apiUrl}/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${this.apiKey}&lang=pt_br`;
    return this._http.get<WeatherData>(url);
  }

  public fetchWeatherByLocationName(
    locationName: string
  ): Observable<WeatherData> {
    const url = `${this.apiUrl}/weather?q=${locationName}&units=metric&appid=${this.apiKey}&lang=pt_br`;
    return this._http.get<WeatherData>(url);
  }

  public fetchWeeklyWeather(): Observable<WeeklyWeatherData> {
    const city = this._storageService.getLastAdded();

    const url = `${this.apiUrl}/forecast/daily?lat=${city.lat}&lon=${city.lon}&appid=${this.apiKey2}&units=metric&lang=pt_br&cnt=7`;
    return this._http.get<WeeklyWeatherData>(url);
  }
}
