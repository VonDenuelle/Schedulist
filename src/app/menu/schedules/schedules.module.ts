
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedulesPageRoutingModule } from './schedules-routing.module';

import { SchedulesPage } from './schedules.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, 
    ComponentsModule,
    SchedulesPageRoutingModule
  ],
  declarations: [SchedulesPage]
})
export class SchedulesPageModule {}

