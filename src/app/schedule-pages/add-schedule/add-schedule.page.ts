import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NativeAudio } from '@capacitor-community/native-audio';
import { Storage } from '@capacitor/storage';
import {
  IonDatetime,
  IonRouterOutlet,
  LoadingController,
  MenuController,
  Platform,
  ToastController,
} from '@ionic/angular';
import * as moment from 'moment';
import { DAY_KEY, HomeScheduleService, ID_KEY, TIME_KEY } from 'src/app/services/home-schedule.services';
import { NotificationsService } from 'src/app/services/notifications.services';
import { ScheduleService } from 'src/app/services/schedule.services';
import { UserService } from 'src/app/services/users.services';
import { AddScheduleForm } from './add-schedule.page.form';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.page.html',
  styleUrls: ['./add-schedule.page.scss'],
})
export class AddSchedulePage implements OnInit {
  constructor(
    public menuCtrl: MenuController,
    private schedule: ScheduleService,
    public users: UserService,
    private formBuilder: FormBuilder,
    public toastController: ToastController,
    private loadingController: LoadingController,
    private route: ActivatedRoute,
    private notifications: NotificationsService,
    public homeSchedule: HomeScheduleService,
    private platform: Platform,
    private _location: Location
  ) { 
     // if back button is pressed, then stop what music is playing
     this.platform.backButton.subscribeWithPriority(10, () => {
      console.log('Handler was called!');
      this.stop()
        if (this._location.isCurrentPathEqualTo('/home'))
        {
          navigator['app'].exitApp();
        } 
        else
        {
          this._location.back();
        }
      
    });


  }

  async ngOnInit() {

    this.form = new AddScheduleForm(this.formBuilder).createForm();   
    this.preloadSounds() 

  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false); //disable sidemenu
    this.checkDayToggleStatus();

    // Pre loads all Schedules upon entering
    this.loadAllSchedules()

    /**
     *  Get info from GET Query and 
     *  checks if there is a params, then set the 
     *  update_flag to true, meaning that it is an update
     *  else is an add
     */
    this.route.queryParamMap.subscribe(async (params) => {
      if (params.has('id')) {
        // Display information
        this.schedule.scheduleById(params.get('id')).subscribe(
          async (response: any) => {
            console.log(response.response);

            //toggles the color of day that corresponds from the response
            this.days.forEach((element) => {
              if (element.day == response.response.day) {
                element.toggle = true;
              }
            });
            this.notify = response.response.notify_before
            this.ringtone = response.response.ringtone
            this.priority = response.response.priority == 0 ? true : false;
            this.dateValue2 = moment(response.response.time, 'HH:mm:ss').format(
              'hh:mm A'
            );
            this.form.get('title').setValue(response.response.title);
            this.form.get('description').setValue(response.response.description);
            this.vibrateStatus = response.response.vibrate == 0 ? true : false;  // tinyint to boolean
            this.taskStatus = response.response.toggle == 0 ? true : false;

            this.checkDayToggleStatus()

          },
          async (error) => {
            console.log(error);
          }
        );

        this.update_flag = true; // it is an update, not add
        this.schedule_id = params.get('id');
      } else {
        this.update_flag = false;
      }
    });
  }

  /**
   *  =============== Variables
   */
  dateValue2 = moment().format('hh:mm A'); // sets default current time to label

  days = [
    { day: 'Mon', toggle: false, badge: false },
    { day: 'Tue', toggle: false, badge: false },
    { day: 'Wed', toggle: false, badge: false },
    { day: 'Thu', toggle: false, badge: false },
    { day: 'Fri', toggle: false, badge: false },
    { day: 'Sat', toggle: false, badge: false },
    { day: 'Sun', toggle: false, badge: false },
  ];
  dayCounter = 0; // responsible for disabling button if no day is toggled

  // Other Variables to pass on services
  vibrateStatus: boolean = false;
  taskStatus: boolean = false;
  form: FormGroup;
  notify = '10' // default value
  ringtone = 'Classic Alarm'
  priority: boolean = false
  // Update Variables
  update_flag: boolean = false;
  schedule_id;

  // Holder of Preloaded schedules based on user id for checking of conflicts
  allSchedules

  disableSaveButtonIfConflictExist = false

  soundPreloadedStatus = false
  soundTemporary = ''
  soundStatus = 'Play'
  soundIcon = 'play'
  // toast messages
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  /**
   * ================= FUNCTIONS
   */
  // Notify Before
  notifyOptions() {
    console.log(this.notify);
  }
  
  // Time Formatting
  formatDate(time) {
    this.checkDayToggleStatus();
    const formattedString = moment(time).format('hh:mm A');
    return formattedString;
  }

  // Task Toggle
  taskStatusChange() {
    this.checkDayToggleStatus();
  }

  // Day Toggles
  toggleDay(day) {
   /**
   *  if it is an update, then user can only select one
   */
    if (this.update_flag == true) {
      // resets all day toggle to false 
      this.days.forEach(day => {
        day.toggle = false
        day.badge = false
      });
    }
    
    //sets selected toggle to true
    day.toggle == false ? (day.toggle = true) : (day.toggle = false);
    this.checkDayToggleStatus();


    /**
     *  Checks if the day selected by the user is
     *  already existing corresponding with already selected time
     */
    // 12 hour tp 24 hour format
    let timeFormattedToMatchResponse = moment(this.dateValue2, 'hh:mm A').format('HH:mm:ss')

    this.allSchedules.forEach(element => {
      if (day.toggle == true) { // if its only toggled on
        if (element.day == day.day && element.time == timeFormattedToMatchResponse) {
          day.badge = true // show badge
        }
      } else {
        day.badge = false // if not toggled, then badge shouldn't show
      }
    });

    this.checkForConflictsOnSchedule()
  }

  // Time Changes
  timeChange(time) {
    this.dateValue2 = this.formatDate(time)
    /**
     *  Always reset badge value when time changes,
     *  and reapply it only if its toggled 
     */
    this.resetBadgeValue()

    /**
     *  Checks if the time selected by the user is
     *  already existing corresponding with already selected days
     */
    // 12 hour tp 24 hour format
    let timeFormattedToMatchResponse = moment(this.dateValue2, 'hh:mm A').format('HH:mm:ss')

    this.allSchedules.forEach(schedule => { // loop all schedules
      this.days.forEach(day => {  // loop days
        if (day.toggle == true) { // if its only toggled on        
          if (schedule.day == day.day && schedule.time == timeFormattedToMatchResponse) {
            day.badge = true // show badge
          }
        }
      });
    });

    this.checkForConflictsOnSchedule()

  }

  // Buttons : Delete or Save
  async save() {
    const loading = await this.loadingController.create();
    await loading.present();

    /**
     *  Checks if update flag is false, then it is an add query to API
     *  else an updated query to API
     */

    if (this.update_flag == false) { // if it is a normal add
      for (let index = 0; index < this.days.length; index++) {
        if (this.days[index].toggle == true) {
          // if the day is toggled, then do this query
          this.schedule
            .addSchedule(
              this.users.decodedToken.id,
              this.days[index].day,
              moment(this.dateValue2, 'hh:mm A').format('HH:mm:ss'),
              this.form.get('title').value,
              this.form.get('description').value,
              this.vibrateStatus,
              this.taskStatus,
              this.notify,
              this.priority,
              this.ringtone
            )
            .subscribe(
              async (response: any) => {
                console.log('RESPONSE: ', response);
                await this.loadAllSchedules() // reloads all schedules again since new one is added
                await this.notifications.setNotificationForToday() // recall notifications 
                await loading.dismiss();
                this.presentToast(response.message);

              },
              async (error) => {
                console.log(error);
                await loading.dismiss();
              }
            );
        }
      }
    } else { // if it is an update
      //get the day toggled
      let day 
      this.days.forEach(element => {
        if (element.toggle == true) {
          day = element.day
        }
      });

      this.schedule
        .updateSchedule(
          this.schedule_id,
          day,
          moment(this.dateValue2, 'hh:mm A').format('HH:mm:ss'),
          this.form.get('title').value,
          this.form.get('description').value,
          this.vibrateStatus,
          this.taskStatus,
          this.notify,
          this.priority,
          this.ringtone
        )
        .subscribe(
          async (response: any) => {    
            
            await this.notifications.setNotificationForToday() // recall notifications 
            
            if ( (await Storage.get({ key: ID_KEY })).value == response.response.id)  {
              // if time and day has not been changed, then do not change displayed schedule in home
              if (
                moment((await Storage.get({ key: TIME_KEY })).value, 'hh:mm a').format('HH:mm:ss') == response.response.time &&
                moment((await Storage.get({ key: DAY_KEY })).value, 'dddd').format('ddd') == response.response.day
              ) {
                this.homeSchedule.updateStorage({
                  id: response.response.id.toString(),
                  time: moment(response.response.time, 'HH:mm:ss').format('hh:mm a'),
                  day: moment(response.response.day, 'ddd').format('dddd'),
                  title: response.response.title,
                  description: response.response.description,
                  priority: response.response.priority == 0 ? "true" : 'false'
                })
              } else { // else , remove
                this.homeSchedule.updateStorage({
                  time: 'Updated',
                  title: "Time/day of schedule has been changed",
                  description: "Previously shown time or day of schedule has been changed to a different one. Wait for your next schedule notification"
                })
              }
            }
            await loading.dismiss();
            this.presentToast(response.message);
          },
          async (error) => {
            console.log(error);
          }
        );
    }
  }

  // Check if there is any day toggled
  checkDayToggleStatus() {
    this.dayCounter = 0; // reset counter
    for (let index = 0; index < this.days.length; index++) {
      if (this.days[index].toggle == true) {
        this.dayCounter++;
      }
    }
  }


  //Check if there is still conflicts then disable save button
  checkForConflictsOnSchedule() {
    this.disableSaveButtonIfConflictExist = false // reset
    this.days.forEach(element => {
      if (element.badge == true) {
        this.disableSaveButtonIfConflictExist = true // reset
      }
    });
  }

  /**
   *  Preloads all schedules based on user id
   *  to reduce network calls since 
   *  everytime user clicks a day, it will check if there is
   *  a conflict to schedule
   */
  loadAllSchedules() {
    this.schedule.allSchedules(this.users.decodedToken.id).subscribe(
      async (response: any) => {
        if (response.response != undefined) {
          this.allSchedules = response.response;
        }
      },
      async (error) => {
        console.log(error);
      }
    );
  }

  /**
   *  Reset Badge Value 
   */
  resetBadgeValue() {
    this.days.forEach(element => {
      element.badge = false
    });
  }



// ==================================
 
  /**
   *  When selected new sound, stop current playing sound
   */
  changeSound(){ 
    this.soundStatus = 'Play'
    this.soundIcon = 'play'
    NativeAudio.stop({
      assetId:  this.soundTemporary,
    });
  }
  /**
   *  Play Sound
   */
  play(){
    this.soundTemporary = this.selectSound(this.ringtone)
    this.soundStatus = 'Playing'
    this.soundIcon = 'musical-note'

    //if user clicks play again, stop and re run
    NativeAudio.stop({
      assetId: this.selectSound(this.ringtone),
    });

    NativeAudio.play({
      assetId: this.selectSound(this.ringtone),
      time : 0.0
    });

  }

  /**
   *  Stop Sound
   */
  stop(){
    this.soundStatus = 'Play'
    this.soundIcon = 'play'
    NativeAudio.stop({
      assetId: this.selectSound(this.ringtone),
    });
  }

  /**
   *  Preload sounds for preview
   */
  async preloadSounds(){
    await Storage.set({key : 'sound' , value : "true"})
    NativeAudio.preload({
      assetId: "classic",
      assetPath: "classic_alarm_ringtone.mp3",
      audioChannelNum: 1,
      isUrl: false
  });
    
    NativeAudio.preload({
      assetId: "beat",
      assetPath: "cute_beat_ringtone.mp3",
      audioChannelNum: 2,
      isUrl: false
  });
    
    NativeAudio.preload({
      assetId: "saiki",
      assetPath: "saiki.mp3",
      audioChannelNum: 3,
      isUrl: false
  });
    
    NativeAudio.preload({
      assetId: "morning",
      assetPath: "samsung_morning_flower.mp3",
      audioChannelNum: 4,
      isUrl: false
  });
    
    NativeAudio.preload({
      assetId: "horizon",
      assetPath: "samsung_over_the_horizon.mp3",
      audioChannelNum: 5,
      isUrl: false
  });
    
    NativeAudio.preload({
      assetId: "teruhashi",
      assetPath: "teruhashi.mp3",
      audioChannelNum: 6,
      isUrl: false
  });

  }


  /**
   *  Select sound based on selected option
   */
  selectSound(ringtone) : string{
    let sound = ''
    switch (ringtone) {
      case 'Samsung Over The Horizon':
        sound = 'horizon'
        break;
      case 'Samsung Morning Flower':
        sound = 'morning'
        break;
      case 'Beat Ringtone':
        sound = 'beat'
        break;
      case 'Saiki':
        sound = 'saiki'
        break;
      case 'Teruhashi':
        sound = 'teruhashi'
        break;
      case 'Classic Alarm':
        sound = 'classic'
        break;
    }
    return sound;
  }

}
