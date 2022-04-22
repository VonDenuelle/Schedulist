// for shared components only for errormessage
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ErrorMessageComponent } from "./error-message/error-message.component";

@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    IonicModule
],
    declarations: [ErrorMessageComponent],
    exports: [ErrorMessageComponent]
})

export class ErrorMessageComponentModule{}