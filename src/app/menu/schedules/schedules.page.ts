import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.page.html',
  styleUrls: ['./schedules.page.scss'],
})
export class SchedulesPage implements OnInit {

  constructor(private popoverController: PopoverController) { }

  ngOnInit() {
  }

  
  // Dismiss Popover
  async DismissClick() {
    await this.popoverController.dismiss();
      }

}
