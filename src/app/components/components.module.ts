import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SchedulesListComponent } from "./schedules-list/schedules-list.component";

@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    IonicModule
],
    declarations: [SchedulesListComponent],
    exports: [SchedulesListComponent]
})

export class ComponentsModule{}