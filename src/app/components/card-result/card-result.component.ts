import { CommonModule } from '@angular/common';
import { Component, effect, input, OnInit } from '@angular/core';

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
  public date: string = '';
  public hours: string = '';

  cityWeather = input.required<WeatherData>();

  private cityWeatherEffect = effect(() => {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();

    this.date = `${day}/${month}/${year}`;

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    this.hours = `${hours}:${minutes}:${seconds}`;
  });
}
