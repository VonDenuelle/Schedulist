import { Injectable } from '@angular/core';
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
    this.setNotification()
    // Sets interval so it will always refresh when next day comes
    setInterval(
      function () {
        this.setNotification()
      }.bind(this),
      this.checkForNextDay()
    );
  }

  setNotification(){
    this.schedule
    .todaySchedules(this.users.decodedToken.id, this.day)
    .subscribe(
      async (response: any) => {
        console.log(response);
        
        if (response.response != undefined) {
          console.log(response);
          console.log(LocalNotifications.getPending());

          /**
           *  Convert Weekday names Abbrevaition to full name
           *  then convert it to System ENUMS
           */
          this.convertDaytoEnum(response.response);

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

          response.response.forEach(async (res) => {
            if (res.toggle == 0) {
              await LocalNotifications.createChannel({
                id: res.id,
                importance: 5,
                name: res.title,
                visibility: 1,
                vibration: res.vibrate == 0 ? true : false,
                sound: 'samsung_over_the_horizon.wav',
              }); // creates new channel

              // Sets up schedule based on created channel with same id as response
              LocalNotifications.schedule({
                notifications: [
                  {
                    title: res.title,
                    body: 'Join the academfewy',
                    id: res.id,
                    smallIcon: 'ic_stat_ssss',
                    iconColor: '#05575F',
                    ongoing: true,
                    autoCancel: false,
                    channelId: res.id,
                    schedule: {
                      on: {
                        weekday: this.dayToEnum,
                        hour: moment(res.time, 'HH:mm:ss').format(
                          'HH'
                        ) as unknown as number,
                        minute: moment(res.time, 'HH:mm:ss').format(
                          'mm'
                        ) as unknown as number,
                        second: 0,
                      },
                      allowWhileIdle: true,
                    },
                  },
                ],
              });
            }
          });

          console.log('pending ', LocalNotifications.getPending());
          console.log(LocalNotifications.listChannels());
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
}
