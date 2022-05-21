import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { OpenNativeSettings } from '@awesome-cordova-plugins/open-native-settings';

import { Geolocation } from '@capacitor/geolocation';
import { Channel, LocalNotifications } from '@capacitor/local-notifications';
import { Storage } from '@capacitor/storage';
import { AlertController, MenuController, ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { ListModalComponent } from 'src/app/components/list-modal/list-modal.component';

import { DAY_KEY, DESCRIPTION_KEY, HomeScheduleService, ID_KEY, PRIORITY_KEY, TIME_KEY, TITLE_KEY } from 'src/app/services/home-schedule.services';
import { NotificationsService } from 'src/app/services/notifications.services';
import { WeatherService } from 'src/app/services/weather.services';


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


  // Weather
  cloud
  temperature
  city
  icon

  constructor(
    public menuCtrl: MenuController,
    private notifications: NotificationsService,
    private router: Router,
    public modalController: ModalController,
    public homeSchedule: HomeScheduleService,
    public alertController: AlertController,
    public weather: WeatherService
  ) {
    this.refreshTime()
    this.notifications.setNotificationForToday()
  }

  async ngOnInit() {
   await Storage.get({ key: ID_KEY }).then(res => {
      console.log(res);
      
      if (res.value == null){
          console.log("storage");
          
          this.homeSchedule.updateStorage({})
      }     
  });
   

    // Request Permmision
    // Local Notifications
    await LocalNotifications.checkPermissions()
    await LocalNotifications.requestPermissions();

    this.temperature = 'Allow location permission' // set defaults
    this.city = "none"
    this.cloud = "none"
    this.icon = "https://cdn-icons-png.flaticon.com/512/252/252035.png"

    // Location
    await Geolocation.requestPermissions();
    await Geolocation.checkPermissions().then(permission => {
      console.log(permission);
      
      if (permission.coarseLocation == 'denied' || permission.location == 'denied') {
        // this.presentAlert('settings', 'Localtion Permission', 'Please allow location permission of this appliction from your phone settings to continue using weather', "application_details")
        this.temperature = 'Allow location permission'
        this.city = "none"
        this.cloud = "none"
        this.icon = "https://cdn-icons-png.flaticon.com/512/252/252035.png"
      } else {
            // weather still has value  availabes
            if(this.weather.temperature != ''){
              console.log("Yes");
              
                //set local variables
                this.city = this.weather.city
                this.cloud = this.weather.cloud
                this.temperature = this.weather.temperature
                this.icon = this.weather.icon
            } else {
              this.getWeatherAPI()
             }
      }
    })


    // remove all listeners first
    await LocalNotifications.removeAllListeners()

    // updates storage
    await LocalNotifications.addListener('localNotificationReceived',
      async (notif) => {
        console.log("receive listed");
        // if the notification is a NOTIFY BEFORE, then don't change shown schedule in home
        if (notif.extra.before == false) {
          this.homeSchedule.updateStorage({
            id: notif.extra.id as string,
            time: moment(notif.extra.time, 'HH:mm:ss').format('hh:mm a'),
            day: moment(notif.extra.day, 'ddd').format('dddd'),
            title: notif.extra.title,
            description: notif.extra.description,
            priority: notif.extra.priority == 0 ? "true" : 'false'
          })
        }

        //resets value immediately
        this.time = moment(notif.extra.time, 'HH:mm:ss').format('hh:mm a')
        this.day = moment(notif.extra.day, 'ddd').format('dddd'),
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
          'description': notif.notification.extra.description,
          'priority': notif.notification.extra.priority == 0 ? true : false,
          'vibrate': notif.notification.extra.vibrate == 0 ? true : false,
          'ringtone': notif.notification.extra.ringtone == 0 ? true : false,
          'time': moment(notif.notification.extra.time, 'HH:mm:ss').format('hh:mm a'),
          'day': notif.notification.extra.day,
        }
      });
      await modal.present();
    })

  }

  async basic() {


    let channel: Channel = {
      id: 'hello0909',
      importance: 3,
      name: "mychannel",
      visibility: 1,
      vibration: true,
      sound: 'bell.wav'
    };

    let channel2: Channel = {
      id: 'hello2',
      importance: 3,
      name: "mychannel",
      visibility: 1,
      vibration: true,
      sound: 'apple_radar_ringtone.wav'
    };

    let channel3: Channel = {
      id: 'hello3',
      importance: 3,
      name: "mychannel",
      visibility: 1,
      vibration: true,
      sound: 'bell.wav'
    };
    console.log(await LocalNotifications.listChannels());


    (await LocalNotifications.listChannels()).channels.forEach(
      async (element) => {
        await LocalNotifications.deleteChannel({
          id: element.id,
          name: element.name,
          importance: element.importance,
          sound: element.sound,
          visibility: element.visibility
        }); // deletes all channels
      }
    );
    await LocalNotifications.removeAllListeners()
    await LocalNotifications.createChannel(channel)
    LocalNotifications.getPending().then(async (element) => {

      element.notifications.forEach(async (element) => {
        console.log(element.id);

        await LocalNotifications.cancel({
          notifications: [
            {
              id: element.id
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
          title: "Helww",
          body: "Join the academfewy",
          id: 1235,
          smallIcon: "ic_stat_ssss",
          iconColor: "#05575F",
          ongoing: true,
          autoCancel: false,
          channelId: 'hello0909',
          schedule: {
            allowWhileIdle: true,
          }
        }
      ]
    })

    LocalNotifications.removeAllListeners
    console.log(await LocalNotifications.listChannels());

  }
  async advance() {
    console.log(await LocalNotifications.listChannels());
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
          title: "Helww",
          body: "Join the academfewy",
          id: 1235,
          smallIcon: "ic_stat_ssss",
          iconColor: "#05575F",
          ongoing: true,
          autoCancel: false,
          channelId: 'NOTIFY_BEFORE',
          schedule: {
            allowWhileIdle: true,
          }
        }
      ]
    })
  }

  async ionViewWillEnter() {
    this.menuCtrl.enable(true);  //enable sidemenu


    this.time = (await Storage.get({ key: TIME_KEY })).value
    this.day = (await Storage.get({ key: DAY_KEY })).value
    this.title = (await Storage.get({ key: TITLE_KEY })).value
    this.description = (await Storage.get({ key: DESCRIPTION_KEY })).value
    this.priority = (await Storage.get({ key: PRIORITY_KEY })).value


    let currentTime = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      new Date().getHours(),
      new Date().getMinutes(),
      new Date().getSeconds()
    )

    if (this.notifications.todaySchedule != undefined) {
      if (this.notifications.todaySchedule.length > 0) {

        //this is for when notification is received while app is closed

        for (let index = 0; index < this.notifications.todaySchedule.length; index++) {
          let responseTimeFormatWithDate = new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate(),
            moment(this.notifications.todaySchedule[index].time, 'HH:mm:ss').format('HH') as unknown as number,
            moment(this.notifications.todaySchedule[index].time, 'HH:mm:ss').format('mm') as unknown as number,
            moment(this.notifications.todaySchedule[index].time, 'HH:mm:ss').format('ss') as unknown as number
          );


          console.log(responseTimeFormatWithDate);
          console.log(index);
          console.log();
          console.log(currentTime);
          console.log("run", moment(responseTimeFormatWithDate).isAfter(currentTime, 'minute'));

          if (moment(responseTimeFormatWithDate).isAfter(currentTime, 'minute')) {
            console.log("run", moment(responseTimeFormatWithDate).isAfter(currentTime, 'minute'));
            console.log(responseTimeFormatWithDate);
            console.log(currentTime);

            this.time = moment(this.notifications.todaySchedule[index - 1].time, 'HH:mm:ss').format('hh:mm a')
            this.day = moment(this.notifications.todaySchedule[index - 1].day, 'ddd').format('dddd')
            this.title = this.notifications.todaySchedule[index - 1].title
            this.description = this.notifications.todaySchedule[index - 1].description
            this.priority = this.notifications.todaySchedule[index - 1].priority == 0 ? 'true' : 'false'

            //update storage
            this.homeSchedule.updateStorage({
              id: this.notifications.todaySchedule[index - 1].id,
              time: this.time,
              day: this.day,
              title: this.title,
              description: this.description,
              priority: this.priority
            })
            break
          } else if (this.notifications.todaySchedule.length - 1 == index) { // if it reaches end of task then show that task 
              this.time = moment(this.notifications.todaySchedule[index].time, 'HH:mm:ss').format('hh:mm a')
              this.day = moment(this.notifications.todaySchedule[index].day, 'ddd').format('dddd')
              this.title = this.notifications.todaySchedule[index].title
              this.description = this.notifications.todaySchedule[index].description
              this.priority = this.notifications.todaySchedule[index].priority == 0 ? 'true' : 'false'

            //update storage
              this.homeSchedule.updateStorage({
                id: this.notifications.todaySchedule[index].id,
                time: this.time,
                day: this.day,
                title: this.title,
                description: this.description,
                priority: this.priority
              })
          }
        }
      }
    }
  }



  // real time clock 
  async refreshTime() {
    let intervalVar = setInterval(function () {
      this.currentTime = moment().format('hh : mm : ss')
      this.timeMeridiem = moment(new Date).format('a')
    }.bind(this), 1000)
  }


  // refresh weather
  async doRefresh(event) {

    console.log('Begin async operation');

    //check location permission first
    await Geolocation.checkPermissions().then( async (permission) => {
      console.log(permission);
      if (permission.coarseLocation == 'denied' || permission.location == 'denied') {
        this.presentAlert('settings', 'Localtion Permission', 'Please allow location permission of this appliction from your phone settings to continue using weather', "application_details")
        this.temperature = 'Allow location permission' // set defaults
        this.city = "none"
        this.cloud = "none"
        this.icon = "https://cdn-icons-png.flaticon.com/512/252/252035.png"
      } else  {
        //check if weather service has values
          console.log(this.weather.temperature, "run");
          await this.getWeatherAPI()    
      }
    })

    event.target.complete();
  }

  //get weather api
  async getWeatherAPI(){
    console.log('get run');
      //get current position
      await Geolocation.getCurrentPosition({enableHighAccuracy : true, timeout: 3600000, maximumAge : 21600000}).then(
        async (res) => { // location is enab;ed
          console.log('Current position:', res);
                          
          await this.weather.weather(res.coords).subscribe(
            async (res : any) =>{
              console.log(" WHETER ", res);
              //set weather services variables
              this.weather.city = `${res.location.name}, ${res.location.region}`
              this.weather.cloud = res.current.condition.text
              this.weather.temperature = `${res.current.temp_c}°C`
              this.weather.icon = res.current.condition.icon

              //set local variables
              this.city = this.weather.city
              this.cloud = this.weather.cloud
              this.temperature = this.weather.temperature
              this.icon = this.weather.icon
            },
            async (error : any) =>{
              console.log(error);
              this.presentAlert('info', error.code, error.message , '')
            }
          )
        },
        error => {               
          this.presentAlert('settings', error.message, 'Please turn on your GPS', "location")
          this.temperature = 'Allow location permission' // set defaults
          this.city = "none"
          this.cloud = "none"
          this.icon = "https://cdn-icons-png.flaticon.com/512/252/252035.png"
        });

    
  }

  // toolbar how
  info() {
    this.presentAlert('info', 'Refresh Weather', 'Pull down the page to refresh weather', "")
  }

  async presentAlert(id, header, message, settings: string) {
    let alert
    if (id == 'info') {
      alert = await this.alertController.create({
        header: header,
        message: message,
        buttons: ['OK']
      })
    } else {
      alert = await this.alertController.create({
        header: header,
        message: message,
        buttons: [{
          text: 'OK',
          role: 'cancel'
        },
        {
          text: 'Settings',
          handler: () => {
            OpenNativeSettings.open(settings)
          },

        }
        ]
      });
    }


    await alert.present();

  }

}
