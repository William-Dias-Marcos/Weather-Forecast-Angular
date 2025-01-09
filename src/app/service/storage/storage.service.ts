import { Injectable } from '@angular/core';
import { CityCoordinatesStorage } from 'src/app/interface/city-coordinates';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly storageKey = 'citys';

  getAll(): CityCoordinatesStorage[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  getLastAdded(): CityCoordinatesStorage {
    let defaultCity = {
      lat: -30.0331,
      lon: -51.23,
      city: 'Porto Alegre',
    };

    const citys = this.getAll();
    return citys.length > 0 ? citys[citys.length - 1] : defaultCity;
  }

  add(newCity: CityCoordinatesStorage): void {
    this.removeOne(newCity);

    const citys = this.getAll();
    citys.push(newCity);
    localStorage.setItem(this.storageKey, JSON.stringify(citys));
  }

  removeOne(cityData: CityCoordinatesStorage): void {
    let citys = this.getAll();
    citys = citys.filter(
      (city) =>
        city.city.toLowerCase() !== cityData.city.toLowerCase() ||
        city.lat !== cityData.lat ||
        city.lon !== cityData.lon
    );
    localStorage.setItem(this.storageKey, JSON.stringify(citys));
  }

  removeAll(): void {
    localStorage.removeItem(this.storageKey);
  }
}
