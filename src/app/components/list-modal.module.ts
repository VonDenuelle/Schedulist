import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { ListModalComponent } from "./list-modal/list-modal.component";

@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrowserModule
],
    declarations: [ListModalComponent],
    exports: [ListModalComponent]
})

export class ListModalModule{}