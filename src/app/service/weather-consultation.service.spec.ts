// import { TestBed, waitForAsync } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { WeatherConsultationService } from './weather-consultation.service';
// import { environment } from 'src/environments/environment';

// describe('WeatherConsultationService', () => {
//   let service: WeatherConsultationService;
//   let httpTestingController: HttpTestingController;

//   beforeEach(waitForAsync(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [WeatherConsultationService]
//     }).compileComponents();

//     service = TestBed.inject(WeatherConsultationService);
//     httpTestingController = TestBed.inject(HttpTestingController);
//   }));

//   afterEach(() => {
//     httpTestingController.verify();
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   it('should get climate data for a location', () => {
//     const locationName = 'Taquara';
//     const mockResponse = {
//       coord: {
//         lon: -50.7806,
//         lat: -29.6506,
//       },
//       weather: [
//         {
//           id: 804,
//           main: 'Clouds',
//           description: 'nublado',
//           icon: '04d',
//         },
//       ],
//       base: 'stations',
//       main: {
//         temp: 16.92,
//         feels_like: 16.6,
//         temp_min: 15.38,
//         temp_max: 18.54,
//         pressure: 1014,
//         humidity: 74,
//         sea_level: 1014,
//         grnd_level: 1010,
//       },
//       visibility: 10000,
//       wind: {
//         speed: 1.09,
//         deg: 166,
//         gust: 3.62,
//       },
//       clouds: {
//         all: 89,
//       },
//       dt: 1692906795,
//       sys: {
//         type: 2,
//         id: 2017152,
//         country: 'BR',
//         sunrise: 1692870459,
//         sunset: 1692911034,
//       },
//       timezone: -10800,
//       id: 3446847,
//       name: locationName,
//       cod: 200,
//     };

//     service.getClimate(locationName).subscribe(response => {
//       expect(response).toEqual(mockResponse);
//     });

//     const url = `${environment.apiUrl}/weather?q=${locationName}&units=metric&appid=${environment.apiKey}&lang=pt_br`;
//     const req = httpTestingController.expectOne(url);
//     expect(req.request.method).toBe('GET');
//     req.flush(mockResponse);
//   });

//   it('should handle errors when getting climate data', () => {
//     const locationName = 'NonExistentCity';

//     service.getClimate(locationName).subscribe(
//       () => fail('expected an error, but got a response'),
//       error => {
//         expect(error).toBeTruthy();
//       }
//     );

//     const url = `${environment.apiUrl}/weather?q=${locationName}&units=metric&appid=${environment.apiKey}&lang=pt_br`;
//     const req = httpTestingController.expectOne(url);
//     expect(req.request.method).toBe('GET');
//     req.error(new ErrorEvent('Network error'));
//   });
// });

import { TestBed, waitForAsync, fakeAsync, tick } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { WeatherConsultationService } from 'src/app/service/weather-consultation.service';
import { environment } from 'src/environments/environment';
import { WeatherData } from 'src/app/interface/weather-data';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('WeatherConsultationService', () => {
  let service: WeatherConsultationService;
  let httpTestingController: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [WeatherConsultationService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();

    service = TestBed.inject(WeatherConsultationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  }));

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get climate data for a location', fakeAsync(() => {
    const locationName = 'SampleCity';
    const mockResponse: WeatherData = {
            coord: {
              lon: -50.7806,
              lat: -29.6506
            },
            weather: [
              {
                id: 804,
                main: 'Clouds',
                description: 'nublado',
                icon: '04d'
              }
            ],
            base: "stations",
            main: {
              temp: 16.92,
              feels_like: 16.6,
              temp_min: 15.38,
              temp_max: 18.54,
              pressure: 1014,
              humidity: 74,
              sea_level: 1014,
              grnd_level: 1010
            },
            visibility: 10000,
            wind: {
              speed: 1.09,
              deg: 166,
              gust: 3.62
            },
            clouds: {
              all: 89
            },
            dt: 1692906795,
            sys: {
              type: 2,
              id: 2017152,
              country: 'BR',
              sunrise: 1692870459,
              sunset: 1692911034
            },
            timezone: -10800,
            id: 3446847,
            name: locationName,
            cod: 200
          };

    let response: WeatherData | undefined;

    service.getClimate(locationName).subscribe(res => {
      response = res;
    });

    const url = `${environment.apiUrl}/weather?q=${locationName}&units=metric&appid=${environment.apiKey}&lang=pt_br`;
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

    tick();

    expect(response).toEqual(mockResponse);
  }));

  it('should handle errors when getting climate data', fakeAsync(() => {
    const locationName = 'NonExistentCity';

    let errorResponse: any;

    service.getClimate(locationName).subscribe(
      () => fail('expected an error, but got a response'),
      error => {
        errorResponse = error;
      }
    );

    const url = `${environment.apiUrl}/weather?q=${locationName}&units=metric&appid=${environment.apiKey}&lang=pt_br`;
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Network error'));

    tick();

    expect(errorResponse).toBeDefined();
  }));

  it('should handle 404 Not Found error when getting climate data', fakeAsync(() => {
    const locationName = 'NonExistentCity';

    let errorResponse: any;

    service.getClimate(locationName).subscribe(
      () => fail('expected an error, but got a response'),
      error => {
        errorResponse = error;
      }
    );

    const url = `${environment.apiUrl}/weather?q=${locationName}&units=metric&appid=${environment.apiKey}&lang=pt_br`;
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Not Found'), { status: 404 });

    tick();

    expect(errorResponse).toBeDefined();
    expect(errorResponse.status).toBe(404);
  }));

});
