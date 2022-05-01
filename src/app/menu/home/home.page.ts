import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  currentTime = moment().format('hh : mm : ss') // initialieze
  timeMeridiem
  constructor(public menuCtrl: MenuController) { 
    this.refreshTime()
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);  //enable sidemenu
   }

   refreshTime(){
    let intervalVar = setInterval(function () {
      this.currentTime = moment().format('hh : mm : ss')
      this.timeMeridiem = moment(new Date).format('a')
    }.bind(this),1000)
  
    
    
   }
}
