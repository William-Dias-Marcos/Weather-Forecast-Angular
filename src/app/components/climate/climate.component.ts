import { Component } from '@angular/core';
import { WeatherData } from 'src/app/interface/weather-data';
import { WeatherConsultationService } from 'src/app/service/weather-consultation.service';

@Component({
  selector: 'app-climate',
  templateUrl: './climate.component.html',
  styleUrls: ['./climate.component.css']
})
export class ClimateComponent {

  cityName: string = "";
  cityWeather!: WeatherData;
  error: boolean = false


  constructor( private _weatherConsultationService: WeatherConsultationService ){}

  localClimate(city: string) {
    this.error = false;
    this.cityName = "";

    this._weatherConsultationService.getClimate(city).subscribe(
      data => {
        this.cityWeather = data;
      },
      error => {
        console.error('Ocorreu um erro ao obter os dados do clima:', error);
        this.error = true;
      }
  
    ) 
  }
}
