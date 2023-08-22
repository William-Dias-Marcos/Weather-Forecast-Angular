import { TestBed } from '@angular/core/testing';

import { WeatherConsultationService } from './weather-consultation.service';

describe('WeatherConsultationService', () => {
  let service: WeatherConsultationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherConsultationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
