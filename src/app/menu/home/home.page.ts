import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Channel, LocalNotifications } from '@capacitor/local-notifications';
import { MenuController, ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { ListModalComponent } from 'src/app/components/list-modal/list-modal.component';
import { NotificationsService } from 'src/app/services/notifications.services';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  currentTime = moment().format('hh : mm : ss') // initialieze
  timeMeridiem
  constructor(
    public menuCtrl: MenuController, 
    public notifications: NotificationsService, 
    private router: Router,
    public modalController: ModalController
    ) { 
    this.refreshTime()
    this.notifications.setNotificationForToday()

  }

  async ngOnInit() {
    // Request Permmision
    // await LocalNotifications.checkPermissions()
    await LocalNotifications.requestPermissions();
   
    LocalNotifications.addListener('localNotificationActionPerformed', async (notif) => {
      console.log(notif.notification.extra.title);
      console.log("log");
      
      const modal = await this.modalController.create({
        component: ListModalComponent,
        componentProps: { 
          'title': notif.notification.extra.title,
          'description' : notif.notification.extra.description,
          'priority' : notif.notification.extra.priority == 0? true : false,
          'vibrate' : notif.notification.extra.vibrate  == 0 ? true : false,
          'ringtone' : notif.notification.extra.ringtone  == 0 ? true : false,
          'time' : moment(notif.notification.extra.time, 'HH:mm:ss').format('hh:mm a'),
          'day' : notif.notification.extra.day,
        }
      });
     await modal.present();
   })
  }
  
  async basic(){


  let channel : Channel = {
    id : 'hello0909' ,
    importance : 3,
    name : "mychannel",
    visibility : 1,
    vibration : true,
    sound : 'bell.wav'
  };

  let channel2 : Channel = {
    id : 'hello2',
    importance : 3,
    name : "mychannel",
    visibility : 1,
    vibration : true,
    sound : 'apple_radar_ringtone.wav'
  };

  let channel3 : Channel = {
    id : 'hello3',
    importance : 3,
    name : "mychannel",
    visibility : 1,
    vibration : true,
    sound : 'bell.wav'
  };
  console.log(await LocalNotifications.listChannels());


  (await LocalNotifications.listChannels()).channels.forEach(
    async (element) => {
      await LocalNotifications.deleteChannel({
        id: element.id,
        name: element.name,
        importance: element.importance,
        sound : element.sound,
        visibility : element.visibility
      }); // deletes all channels
    }
  );
  await LocalNotifications.removeAllListeners()
  await LocalNotifications.createChannel(channel)
  LocalNotifications.getPending().then(async (element) => {
      
    element.notifications.forEach(async (element) => {
      console.log(element.id);
      
      await LocalNotifications.cancel({
        notifications : [
          {
            id : element.id
          }
        ]
      })
    });
  })
  // await LocalNotifications.createChannel(channel2)
  // await LocalNotifications.createChannel(channel3)
 
  console.log(await LocalNotifications.listChannels());
 
  //  LocalNotifications.addListener('localNotificationReceived', (notif) => {
  //    console.log("hellow fvrst");
  // })
  
      
  await LocalNotifications.schedule({
    notifications: [
      {
        title : "Helww",
        body : "Join the academfewy",
        id : 1235,
        smallIcon: "ic_stat_ssss",
        iconColor: "#05575F",
        ongoing : true,
        autoCancel : false,
        channelId : 'hello0909',
        schedule : {
          allowWhileIdle : true,
        }
      }
    ]
  })

  LocalNotifications.removeAllListeners
  console.log(await LocalNotifications.listChannels());
  
  }
  advance(){
  //  LocalNotifications.schedule({
  //     notifications: [
  //       {
  //         sound : 'samsung_over_the_horizon.wav',
  //         title : "Hello",
  //         body : "Join the academfewy",
  //         id : 9999,
  //         extra: {
  //           data : 'PAss data obj to handler'
  //         },
  //         smallIcon: "ic_stat_ssss",
  //         iconColor: "#05575F",
  //         ongoing : true,
  //         autoCancel : false,
  //         // channelId : 'hello',
  //         schedule : {
  //           allowWhileIdle : true,
  //         }
  //       }
  //     ]
  //   })
    
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
