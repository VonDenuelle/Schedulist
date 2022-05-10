import { Injectable } from '@angular/core';
import { RESOURCE_CACHE_PROVIDER } from '@angular/platform-browser-dynamic';
import {
  Channel,
  LocalNotifications,
  Weekday,
} from '@capacitor/local-notifications';
import * as moment from 'moment';
import { ScheduleService } from './schedule.services';
import { UserService } from './users.services';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private schedule: ScheduleService, public users: UserService) {

  }
  day = moment(new Date()).format('ddd');
  dayToEnum;

  async setNotificationForToday() {
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

  notification(){
    this.schedule
    .todaySchedules(this.users.decodedToken.id, this.day) 
    .subscribe(
      async (response: any) => {
        console.log(response);
        
        if (response.response != undefined) {
          console.log(LocalNotifications.listChannels());
          console.log(LocalNotifications.getPending());

          /**
           *  Convert Weekday names Abbrevaition to full name
           *  then convert it to System ENUMS
           */
          // this.convertDaytoEnum(response.response);

          /**
           *  Loops respose
           *  delete existing channels to only hold alarms set for today
           *  then create channels for every response
           */
          (await LocalNotifications.listChannels()).channels.forEach(
            async (element) => {
              LocalNotifications.deleteChannel({
                id: element.id,
                name: element.name,
                importance: element.importance,
              }); // deletes all channels
            }
          );
          await this.deleteNotification() // deletets pending notif to reset

 
          
          response.response.forEach(async (res) => {
            if (res.toggle == 0) {

              await LocalNotifications.createChannel({
                id: res.id,
                importance: 5,
                name: res.title,
                visibility: 1,
                vibration: res.vibrate == 0 ? true : false,
                sound: 'samsung_over_the_horizon.wav',
              }); // creates new channel for EXACT TIME NOTIFICATION

                 // create date obj
              let myDate = new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDate(),
                moment(res.time, 'HH:mm:ss').format('HH') as unknown as number,
                moment(res.time, 'HH:mm:ss').format('mm') as unknown as number,
                moment(res.time, 'HH:mm:ss').format('ss') as unknown as number
              )
    

              //====================== NOTIFY BEFORE
              // Sets up notification before the EXACT TIME NOTIFICATION ( notify_before)
              LocalNotifications.createChannel({
                id: "NOTIFY_BEFORE",
                importance: 3,
                name: 'NOTIFY_BEFORE NAME',
                visibility: 1,
                vibration: true,
                sound: 'notify_before.wav',
              }); // creates new channel for NOTIFY BEFORE NOTIFICATION

              let notifyBefore = moment(myDate).subtract(res.notify_before, 'minutes')
              let notifyBeforeDate = notifyBefore.toDate()
              
             await LocalNotifications.schedule({
                notifications: [
                  {
                    title: res.title,
                    body: res.notify_before + " minutes before this schedule will run",
                    id: res.notify_before + res.id,
                    smallIcon: 'ic_stat_ssss',
                    iconColor: '#05575F',
                    channelId: 'NOTIFY_BEFORE',
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
              // Sets up schedule based on created channel with same id as response
              await LocalNotifications.schedule({
                notifications: [
                  {
                    title: res.title,
                    body: res.description.substring(0, 20),
                    largeBody: res.description,
                    id: res.id,
                    smallIcon: 'ic_stat_ssss',
                    iconColor: '#05575F',
                    ongoing: true,
                    channelId: res.id,
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
                      // on: {
                      //   weekday: this.dayToEnum,
                      //   hour: moment(res.time, 'HH:mm:ss').format(
                      //     'HH'
                      //   ) as unknown as number,
                      //   minute: moment(res.time, 'HH:mm:ss').format(
                      //     'mm'
                      //   ) as unknown as number,
                      //   second: 0,
                      // },

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
  deleteNotification(){
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
  }



}
