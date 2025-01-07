import { Component, inject, OnInit } from '@angular/core';

import { CityCoordinatesService } from './service/city-coordinates/city-coordinates.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private _cityCoordinatesService = inject(CityCoordinatesService);

  ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const local = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };

          this._cityCoordinatesService.setCoordinates(local);
        },
        (error) => this.handleGeolocationError(error)
      );
    } else {
      console.error('Geolocalização não é suportada pelo navegador.');
    }
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
