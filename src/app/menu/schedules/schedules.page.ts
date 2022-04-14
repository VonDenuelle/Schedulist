import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.page.html',
  styleUrls: ['./schedules.page.scss'],
})
export class SchedulesPage implements OnInit {

  constructor(private popoverController: PopoverController, public menuCtrl: MenuController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);  //enable sidemenu
   }
  
  // Dismiss Popover
  async DismissClick() {
    await this.popoverController.dismiss();
      }

}
