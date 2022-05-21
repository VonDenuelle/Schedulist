import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import { ErrorMessageComponentModule } from 'src/app/components/error-message.module';
import { ShowHidePasswordModule } from 'src/app/components/show-hide-password.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    ReactiveFormsModule,
    ErrorMessageComponentModule,
    ShowHidePasswordModule
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}
