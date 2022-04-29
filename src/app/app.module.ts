import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SchedulesPageModule } from './menu/schedules/schedules.module';
import { AllSchedulesPageModule } from './schedule-pages/all-schedules/all-schedules.module';
import { SchedulesPage } from './menu/schedules/schedules.page';
import { AllSchedulesPage } from './schedule-pages/all-schedules/all-schedules.page';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [HttpClient , SchedulesPage, AllSchedulesPage, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
