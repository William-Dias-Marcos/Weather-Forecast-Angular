import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

import { WeatherData } from 'src/app/interface/weather-data';

import { CardModule } from 'primeng/card';

import { CapitalizeWordsPipe } from 'src/app/pipes/capitalize-words/capitalize-words.pipe';

@Component({
  selector: 'app-card-result',
  standalone: true,
  imports: [CommonModule, CardModule, CapitalizeWordsPipe],
  templateUrl: './card-result.component.html',
  styleUrl: './card-result.component.css',
})
export class CardResultComponent {
  cityWeather = input.required<WeatherData>();
}
