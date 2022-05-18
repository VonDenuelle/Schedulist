import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Channel, LocalNotifications } from '@capacitor/local-notifications';
import { Storage } from '@capacitor/storage';
import { MenuController, ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { ListModalComponent } from 'src/app/components/list-modal/list-modal.component';
import { DAY_KEY, DESCRIPTION_KEY, HomeScheduleService, PRIORITY_KEY, TIME_KEY, TITLE_KEY } from 'src/app/services/home-schedule.services';
import { NotificationsService } from 'src/app/services/notifications.services';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  /* VARIABLES */
  currentTime = moment().format('hh : mm : ss') // initialieze
  timeMeridiem

  time
  day
  title
  description
  priority

  constructor(
    public menuCtrl: MenuController, 
    public notifications: NotificationsService, 
    private router: Router,
    public modalController: ModalController,
    public homeSchedule : HomeScheduleService
    ) { 
    this.refreshTime()
    this.notifications.setNotificationForToday()
  }

  async ngOnInit() {
    // Request Permmision
    // await LocalNotifications.checkPermissions()
    await LocalNotifications.requestPermissions();

     // updates storage
     await LocalNotifications.addListener('localNotificationReceived' , 
     async (notif) => {
       // if the notification is a NOTIFY BEFORE, then don't change shown schedule in home
       if (notif.extra.before == false) {
        this.homeSchedule.updateStorage({
          id : notif.extra.id as string,
          time : moment(notif.extra.time, 'HH:mm:ss').format('hh:mm a'),
          day : moment(notif.extra.day, 'ddd').format('dddd'),
          title : notif.extra.title,
          description : notif.extra.description,
          priority : notif.extra.priority == 0 ? "true" : 'false'
        })
       }
  


      //resets value immediately
      this.time = moment(notif.extra.time, 'HH:mm:ss').format('hh:mm a')
      this.day =  moment(notif.extra.day, 'ddd').format('dddd'),
      this.title = notif.extra.title
      this.description = notif.extra.description
      this.priority = notif.extra.priority == 0 ? "true" : 'false'
     })



    // when user clicked on notif, create modal
    await LocalNotifications.addListener('localNotificationActionPerformed', async (notif) => {
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
  async advance(){
    console.log( await LocalNotifications.listChannels());
   await LocalNotifications.removeAllListeners()
  //  await LocalNotifications.deleteChannel({
  //     id: '2',
  //     name: "mychannel",
  //     importance: 3,
  //     sound : 'notify_before.wav'
  //   }); // deletes all channels

    console.log(await LocalNotifications.listChannels());
    // let channel2 : Channel = {
    //   id : 'NOTIFY_BEFORE',
    //   importance : 3,
    //   name : "mychannel",
    //   visibility : 1,
    //   vibration : true,
    //   sound : 'notify_before.wav'
    // };

    // await LocalNotifications.createChannel(channel2)

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
          channelId : 'NOTIFY_BEFORE',
          schedule : {
            allowWhileIdle : true,
          }
        }
      ]
    })
  }

  async ionViewWillEnter() {
    this.menuCtrl.enable(true);  //enable sidemenu
    console.log((await Storage.get({key : PRIORITY_KEY})).value, (await Storage.get({key : TIME_KEY})).value);
    console.log(Storage.keys());
    

    this.time =  (await Storage.get({key : TIME_KEY})).value
    this.day = (await Storage.get({key : DAY_KEY})).value
    this.title = (await Storage.get({key : TITLE_KEY})).value
    this.description = (await Storage.get({key : DESCRIPTION_KEY})).value
    this.priority = (await Storage.get({key : PRIORITY_KEY})).value
   }


   // real time clock 
   async refreshTime(){  
    let intervalVar = setInterval(function () {
      this.currentTime = moment().format('hh : mm : ss')
      this.timeMeridiem = moment(new Date).format('a')
    }.bind(this),1000)
   
   }
}
