import { Injectable } from '@angular/core';
import { CityCoordinates } from 'src/app/interface/city-coordinates';

@Injectable({
  providedIn: 'root',
})
export class CityCoordinatesService {
  private coordinates: CityCoordinates = {
    lat: -30.0331,
    lon: -51.23,
  };

  getCoordinates(): CityCoordinates | undefined {
    return this.coordinates;
  }

  setCoordinates(coordinates: CityCoordinates): void {
    this.coordinates = coordinates;
  }
}
