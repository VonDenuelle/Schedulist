import { Component, OnInit ,ViewChild } from '@angular/core';
import { IonDatetime, MenuController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';


@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.page.html',
  styleUrls: ['./add-schedule.page.scss'],
})
export class AddSchedulePage implements OnInit {
  constructor(public menuCtrl: MenuController) { }
  
  dateValue2 = format(new Date(), 'hh:mm a') // sets default current time

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);  //enable sidemenu
   }
  formatDate(time){
    const formattedString = format(parseISO(time), 'hh:mm a');
    return formattedString
  }
  
}
