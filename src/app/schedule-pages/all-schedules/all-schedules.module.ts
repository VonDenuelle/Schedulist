import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllSchedulesPageRoutingModule } from './all-schedules-routing.module';

import { AllSchedulesPage } from './all-schedules.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllSchedulesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AllSchedulesPage]
})
export class AllSchedulesPageModule {}
