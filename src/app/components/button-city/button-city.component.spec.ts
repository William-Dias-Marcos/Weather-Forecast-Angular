import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonCityComponent } from './button-city.component';

describe('ButtonCityComponent', () => {
  let component: ButtonCityComponent;
  let fixture: ComponentFixture<ButtonCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonCityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
