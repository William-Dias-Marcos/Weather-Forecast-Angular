import { Injectable } from '@angular/core';
import { CityCoordinates } from 'src/app/interface/city-coordinates';

@Injectable({
  providedIn: 'root',
})
export class CityCoordinatesService {
  private coordinates!: CityCoordinates;

  getCoordinates(): CityCoordinates | undefined {
    if (this.coordinates) {
      return this.coordinates;
    } else {
      return undefined;
    }
  }

  setCoordinates(coordinates: CityCoordinates): void {
    this.coordinates = coordinates;
  }
}
