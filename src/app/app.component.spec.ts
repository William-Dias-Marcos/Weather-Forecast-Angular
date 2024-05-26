import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ClimateComponent } from './components/climate/climate.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'; // Import HttpClientModule
import { provideHttpClientTesting } from '@angular/common/http/testing'; // Import HttpClientTestingModule

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [AppComponent, ClimateComponent],
    imports: [HttpClientModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}{
    declarations: [AppComponent, ClimateComponent],
    imports: [HttpClientTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi())]
}).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
