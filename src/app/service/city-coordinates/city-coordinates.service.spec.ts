import { TestBed } from '@angular/core/testing';

import { CityCoordinatesService } from './city-coordinates.service';

describe('CityCoordinatesService', () => {
  let service: CityCoordinatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CityCoordinatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
