import { Injectable } from '@angular/core';
import { RESOURCE_CACHE_PROVIDER } from '@angular/platform-browser-dynamic';
import {
  Channel,
  LocalNotifications,
  Weekday,
} from '@capacitor/local-notifications';
import { Storage } from '@capacitor/storage';
import * as moment from 'moment';
import { ScheduleService } from './schedule.services';
import { UserService } from './users.services';

const CHANNEL_KEY = 'channels-status';


@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private schedule: ScheduleService, public users: UserService) {

  }
  day = moment(new Date()).format('ddd');
  dayToEnum;
  channelPriority = ''

  async setNotificationForToday() {
    const channelKey = await Storage.get({key : CHANNEL_KEY});
    if (channelKey.value == '' || channelKey.value == undefined) {
      console.log("Has to run once creating CHANNEL");
      
      await this.createAllChannels() // create all channels then set storage key to status good
      await Storage.set({key : CHANNEL_KEY, value : 'Good'})
    } else {
        // run once
        this.notification()
        // Sets interval so it will always refresh when next day comes
        setInterval(
          function () {
            this.notification()
          }.bind(this),
          this.checkForNextDay()
        );
          }
  }



  notification(){
    this.schedule
    .todaySchedules(this.users.decodedToken.id, this.day) 
    .subscribe(
      async (response: any) => {
        console.log(response);
        
        if (response.response != undefined) {
          console.log( await LocalNotifications.listChannels());
          
          /** DOESNT NEED YET !!!
           *  Convert Weekday names Abbrevaition to full name
           *  then convert it to System ENUMS
           */
          // this.convertDaytoEnum(response.response);

          /** DOESNT NEED YET !!!
           *  Loops respose
           *  delete existing channels to only hold alarms set for today
           *  then create channels for every response
           */
          // (await LocalNotifications.listChannels()).channels.forEach(
          //   async (element) => {
          //     if(element.id != 'default'){  // do not delete default notif channel
          //       await LocalNotifications.deleteChannel({
          //         id: element.id,
          //         name: element.name,
          //         importance: element.importance,
          //       }); // deletes all channels
          //     }
          //   }
          // );
          await this.deleteNotification() // deletets pending notif to reset

 
          
          response.response.forEach(async (res) => {
            if (res.toggle == 0) {

                 // create date obj
              let myDate = new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDate(),
                moment(res.time, 'HH:mm:ss').format('HH') as unknown as number,
                moment(res.time, 'HH:mm:ss').format('mm') as unknown as number,
                moment(res.time, 'HH:mm:ss').format('ss') as unknown as number
              )
    
 // ====================== NOTIFY BEFORE TIME NOTIFICATION
              let notifyBefore = moment(myDate).subtract(res.notify_before, 'minutes') // time calculated for notify_before
              let notifyBeforeDate = notifyBefore.toDate()
              
             await LocalNotifications.schedule({
                notifications: [
                  {
                    title: res.title,
                    body: res.notify_before + " minutes before this schedule will run",
                    id: res.notify_before + res.id ,
                    smallIcon: 'ic_stat_ssss',
                    iconColor: '#05575F',
                    channelId: 'wav_notify_before',
                    extra : {
                      id : res.id,
                      description : res.description,
                      title : res.title,
                      priority : res.priority,
                      vibrate : res.vibrate,
                      ringtone : res.ringtone,
                      time : res.time,
                      day : res.day                      
                    },
                    schedule: {
                      at: new Date(notifyBeforeDate),
                      allowWhileIdle: true,
                    },
                  },
                ],
              });



 // ====================== EXACT TIME NOTIFICATION
              if (res.priority == 0) { // if high prio, set ringtoe to high_priority wav
                this.channelPriority = 'wav_high_priority'
              } else { // else none
                this.channelPriority = 'wav_teruhashi'
              }

              // Sets up schedule based on created channel with same id as response
              await LocalNotifications.schedule({
                notifications: [
                  {
                    title: res.title,
                    body: res.description.substring(0, 20),
                    largeBody: res.description,
                    id: res.id ,
                    smallIcon: 'ic_stat_ssss',
                    iconColor: '#05575F',
                    ongoing: true,
                    channelId: this.channelPriority,
                    extra : {
                      id : res.id,
                      description : res.description,
                      title : res.title,
                      priority : res.priority,
                      vibrate : res.vibrate,
                      ringtone : res.ringtone,
                      time : res.time,
                      day : res.day                      
                    },
                    schedule: {
                      at: new Date(myDate),
                      allowWhileIdle: true,
                    },
                  },
                ],
              });

              console.log(LocalNotifications.getPending());
              
              
            }
          });
        }
      },
      async (error) => {
        console.log(error);
      }
    );
  }
  convertDaytoEnum(response) {
    let day = moment(response.day).format('dddd');
    switch (day) {
      case 'Monday':
        this.dayToEnum = Weekday.Monday;
        break;

      case 'Tuesday':
        this.dayToEnum = Weekday.Tuesday;
        break;

      case 'Wednesday':
        this.dayToEnum = Weekday.Wednesday;
        break;

      case 'Thursday':
        this.dayToEnum = Weekday.Thursday;
        break;

      case 'Friday':
        this.dayToEnum = Weekday.Friday;
        break;

      case 'Saturday':
        this.dayToEnum = Weekday.Saturday;
        break;

      case 'Sunday':
        this.dayToEnum = Weekday.Sunday;
        break;
    }
  }

  checkForNextDay() {
    /**
     *  Set interval that calculates difference to current time
     *  to the next day to determine when should we reevaluate
     *  the following notifications
     */
    let currentTimeIntervalToNextDay = 0; // reset interval
    let currentTime = moment(); // get currenttime
    let nextDay = moment().add(1, 'd').startOf('day'); // get start of time the next day which is 12 AM

    currentTimeIntervalToNextDay = moment
      .duration(moment(nextDay).diff(currentTime))
      .asMilliseconds(); // get duration difference in minutes

    console.log(currentTimeIntervalToNextDay, currentTime, nextDay);

    return currentTimeIntervalToNextDay;
  }

  /**
   * Resets notification each day
   */
  async deleteNotification(){
    await LocalNotifications.getPending().then(async (element) => {
      
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
  }


  async createAllChannels(){
    // Notify_before.wav ============
    await LocalNotifications.createChannel({
      id: "wav_notify_before",
      importance: 3,
      name: 'wav notify before ringtone',
      visibility: 1,
      vibration: true,
      sound: 'notify_before.wav',
    }); 

    // samsung over the horizon .wav ============
    await LocalNotifications.createChannel({
      id: "wav_samsung_over_the_horizon",
      importance: 3,
      name: 'samsung over the horizon ringtone',
      visibility: 1,
      vibration: true,
      sound: 'samsung_over_the_horizon.wav',
    }); 

    // classic alarm ringtone .wav ============
    await LocalNotifications.createChannel({
      id: "wav_clasic_alarm_rington",
      importance: 3,
      name: 'classic alarm ringtont ringtone',
      visibility: 1,
      vibration: true,
      sound: 'classic_alarm_ringtone.wav',
    }); 

    // teruhashi .wav ============
    await LocalNotifications.createChannel({
      id: "wav_teruhashi",
      importance: 3,
      name: 'teruhashi ringtone',
      visibility: 1,
      vibration: true,
      sound: 'teruhashi.wav',
    }); 

    // saiki op .wav ============
    await LocalNotifications.createChannel({
      id: "wav_saiki",
      importance: 3,
      name: 'saiki ringtone',
      visibility: 1,
      vibration: true,
      sound: 'saiki.wav',
    }); 


    // cute beat ringtone .wav ============
    await LocalNotifications.createChannel({
      id: "wav_beat",
      importance: 3,
      name: 'beat ringtone ringtone',
      visibility: 1,
      vibration: true,
      sound: 'cute_beat_ringtone.wav', 
    }); 

    //samsung morning flower .wav ============
    await LocalNotifications.createChannel({
      id: "wav_samsung_morning_flower",
      importance: 3,
      name: 'samsung morning flower ringtone',
      visibility: 1,
      vibration: true,
      sound: 'samsung_morning_flower.wav',
    }); 

    //high priority ringtone .wav ============
    await LocalNotifications.createChannel({
      id: "wav_high_priority",
      importance: 3,
      name: 'high priority ringtone',
      visibility: 1,
      vibration: true,
      sound: 'high_priority_ringtone.wav',
    }); 


  }

}
