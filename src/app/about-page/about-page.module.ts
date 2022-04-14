import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutPagePageRoutingModule } from './about-page-routing.module';

import { AboutPagePage } from './about-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutPagePageRoutingModule
  ],
  declarations: [AboutPagePage]
})
export class AboutPagePageModule {}
