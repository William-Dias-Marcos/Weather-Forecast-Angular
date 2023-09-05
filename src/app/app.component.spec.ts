import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ClimateComponent } from './components/climate/climate.component';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, ClimateComponent],
      imports: [HttpClientModule, HttpClientTestingModule], // Include HttpClientModule and HttpClientTestingModule
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
