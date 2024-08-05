import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { WeatherData } from 'src/app/interface/weather-data';
import { Suggestions } from 'src/app/interface/suggestions';

import { WeatherConsultationService } from 'src/app/service/weather-consultation.service';
import { ButtonCityComponent } from '../button-city/button-city.component';

@Component({
  selector: 'app-climate',
  templateUrl: './climate.component.html',
  styleUrls: ['./climate.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonCityComponent],
})
export class ClimateComponent {
  cityName: string = '';
  cityWeather: WeatherData | null = null;
  error: boolean = false;
  loading: boolean = false;

  suggestions: Suggestions[] = [
    { city: 'Porto Alegre' },
    { city: 'Taquara' },
    { city: 'São Paulo' },
    { city: 'Rio de Janeiro' },
    { city: 'Buenos Aires' },
    { city: 'Montevidéu' },
    { city: 'Londres' },
    { city: 'Paris' },
  ];

  constructor(
    private _weatherConsultationService: WeatherConsultationService
  ) {}

  localClimate(city: string) {
    this.error = false;
    this.loading = true;

    this._weatherConsultationService.getClimate(city).subscribe(
      (data) => {
        this.cityWeather = data;
        this.loading = false;
      },
      (error) => {
        console.error('Ocorreu um erro ao obter os dados do clima:', error);
        this.error = true;
        this.cityWeather = null;
      }
    );
  }
}
