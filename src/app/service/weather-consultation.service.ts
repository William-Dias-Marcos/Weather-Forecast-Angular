import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherConsultationService {

  private apiUrl = 'https://api.openweathermap.org/data/2.5';
  
  private apiKey = '76da943746cd6d004420e7c26d9f6a7c';

  constructor(private http: HttpClient) { }

  getClimate(locationName: string): Observable<any> {
    const url = `${this.apiUrl}/weather?q=${locationName}&units=metric&appid=${this.apiKey}&lang=pt_br`;
    return this.http.get(url);
  }

 
}
