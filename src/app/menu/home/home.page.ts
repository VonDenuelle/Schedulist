import { Component, OnInit } from '@angular/core';
import { Channel, LocalNotifications } from '@capacitor/local-notifications';
import { MenuController } from '@ionic/angular';
import * as moment from 'moment';
import { NotificationsService } from 'src/app/services/notifications.services';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  currentTime = moment().format('hh : mm : ss') // initialieze
  timeMeridiem
  constructor(public menuCtrl: MenuController, public notifications: NotificationsService) { 
    this.refreshTime()
  }

  async ngOnInit() {
    // Request Permmision
    // await LocalNotifications.checkPermissions()
    await LocalNotifications.requestPermissions();
   
    LocalNotifications.addListener('localNotificationReceived', (notif) => {
      console.log("hellow first ", notif.channelId);
   })
  
   await this.notifications.setNotificationForToday()

   
  }
  
  async basic(){


  let channel : Channel = {
    id : 'hello',
    importance : 5,
    name : "mychannel",
    visibility : 1,
    vibration : true,
    sound : 'samsung_over_the_horizon.wav'
  }


  await LocalNotifications.createChannel(channel)

 
   LocalNotifications.addListener('localNotificationReceived', (notif) => {
     console.log("hellow first");
  })
  
     
  await LocalNotifications.schedule({
    notifications: [
      {
        title : "Hello",
        body : "Join the academfewy",
        id : 1,
        extra: {
          data : 'PAss data obj to handler'
        },
        smallIcon: "ic_stat_ssss",
        iconColor: "#05575F",
        ongoing : true,
        autoCancel : false,
        channelId : 'hello',
        schedule : {
          allowWhileIdle : true,
        }
      }
    ]
  })
   
  }
  advance(){
    console.log(LocalNotifications.getPending());
    
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);  //enable sidemenu
   }

   async refreshTime(){  
    let intervalVar = setInterval(function () {
      this.currentTime = moment().format('hh : mm : ss')
      this.timeMeridiem = moment(new Date).format('a')
    }.bind(this),1000)
  
    
    
   }
}
