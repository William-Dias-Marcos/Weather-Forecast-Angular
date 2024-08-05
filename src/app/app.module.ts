import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

import { AppComponent } from './app.component';
import { ClimateComponent } from './components/climate/climate.component';
@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ClimateComponent,
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class AppModule {}
