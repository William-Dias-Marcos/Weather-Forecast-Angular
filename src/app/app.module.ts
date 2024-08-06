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
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from './app.routing.module';
@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    ClimateComponent,
    HeaderComponent,
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class AppModule {}
