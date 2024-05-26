import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClimateComponent } from './climate.component';
import { WeatherConsultationService } from 'src/app/service/weather-consultation.service';
import { Observable, of } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing'; // Importar o HttpClientTestingModule
import { WeatherData } from 'src/app/interface/weather-data';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ClimateComponent', () => {
  let component: ClimateComponent;
  let fixture: ComponentFixture<ClimateComponent>;
  let weatherConsultationService: WeatherConsultationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    declarations: [ClimateComponent],
    imports: [],
    providers: [WeatherConsultationService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});

    fixture = TestBed.createComponent(ClimateComponent);
    component = fixture.componentInstance;
    weatherConsultationService = TestBed.inject(WeatherConsultationService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize properties', () => {
    expect(component.cityName).toBe('');
    expect(component.cityWeather).toBeNull();
    expect(component.error).toBeFalse();
  });

  it('should call getClimate method and update cityWeather on successful request', () => {
    const testData: WeatherData = {
      coord: { lon: -50.7806, lat: -29.6506 },
      weather: [{ id: 804, main: 'Clouds', description: 'nublado', icon: '04d' }],
      base: 'stations',
      main: {
        temp: 16.92,
        feels_like: 16.6,
        temp_min: 15.38,
        temp_max: 18.54,
        pressure: 1014,
        humidity: 74,
        sea_level: 1014,
        grnd_level: 1010,
      },
      visibility: 10000,
      wind: { speed: 1.09, deg: 166, gust: 3.62 },
      clouds: { all: 89 },
      dt: 1692906795,
      sys: {
        type: 2,
        id: 2017152,
        country: 'BR',
        sunrise: 1692870459,
        sunset: 1692911034,
      },
      timezone: -10800,
      id: 3446847,
      name: 'locationName',
      cod: 200,
    };

    spyOn(weatherConsultationService, 'getClimate').and.returnValue(of(testData));

    component.localClimate('CityName');

    expect(weatherConsultationService.getClimate).toHaveBeenCalledWith('CityName');
    expect(component.cityWeather).toEqual(testData);
    expect(component.error).toBeFalse();
  });

  it('should handle error on failed request', () => {
    const errorResponse = { message: 'Error message' };

    spyOn(weatherConsultationService, 'getClimate').and.returnValue(
      // Simulate a failed request by returning an error observable
      new Observable((observer) => {
        observer.error(errorResponse);
      })
    );

    spyOn(console, 'error'); // Spy on console.error

    component.localClimate('CityName');

    expect(weatherConsultationService.getClimate).toHaveBeenCalledWith('CityName');
    expect(component.cityWeather).toBeNull();
    expect(component.error).toBeTrue();
    expect(console.error).toHaveBeenCalledWith(
      'Ocorreu um erro ao obter os dados do clima:',
      errorResponse
    );
  });
});
