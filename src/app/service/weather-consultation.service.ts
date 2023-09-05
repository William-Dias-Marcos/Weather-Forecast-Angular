import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WeatherData } from '../interface/weather-data';

@Injectable({
  providedIn: 'root'
})
export class WeatherConsultationService {

  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) { }

  getClimate(locationName: string): Observable<WeatherData> {
    const url = `${this.apiUrl}/weather?q=${locationName}&units=metric&appid=${this.apiKey}&lang=pt_br`;
    return this.http.get<WeatherData>(url);
  }
}

