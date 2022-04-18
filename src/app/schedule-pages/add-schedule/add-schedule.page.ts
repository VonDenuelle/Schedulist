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
  taskStatus


  days  = [
    {day : 'Mon' , toggle : false},
    {day : 'Tue' , toggle : false},
    {day : 'Wed' , toggle : false},
    {day : 'Thu' , toggle : false},
    {day : 'Fri' , toggle : false},
    {day : 'Sat' , toggle : false},
    {day : 'Sun' , toggle : false},
  ]
 
  selectedDayId : number = 0; //default day toggled = none

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);  //enable sidemenu
   }
  formatDate(time){
    const formattedString = format(parseISO(time), 'hh:mm a');
    return formattedString
  }
  
  taskStatusChange(){
    
  }
  toggleDay(day){
    day.toggle == false ? day.toggle = true : day.toggle = false  
  }
 
}
