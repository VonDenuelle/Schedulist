import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  IonDatetime,
  LoadingController,
  MenuController,
  ToastController,
} from '@ionic/angular';
import * as moment from 'moment';
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
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = new AddScheduleForm(this.formBuilder).createForm();
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
    this.route.queryParamMap.subscribe((params) => {
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

            this.dateValue2 = moment(response.response.time, 'HH:mm:ss').format(
              'hh:mm A'
            );
            this.form.get('title').setValue(response.response.title);
            this.form
              .get('description')
              .setValue(response.response.description);
            this.vibrateStatus = response.response.vibrate == 0 ? true : false;  // tinyint to boolean
            this.taskStatus = response.response.toggle == 0 ? true : false;
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

  // Update Variables
  update_flag: boolean = false;
  schedule_id;

  // Holder of Preloaded schedules based on user id for checking of conflicts
  allSchedules

  disableSaveButtonIfConflictExist = false

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
        day.badge= false // if not toggled, then badge shouldn't show
      }
    });

    this.checkForConflictsOnSchedule()
  }

  // Time Changes
  timeChange(time){
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
    if (this.update_flag == false) {
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
              this.taskStatus
            )
            .subscribe(
              async (response: any) => {
                console.log('RESPONSE: ', response);
                await this.loadAllSchedules() // reloads all schedules again since new one is added
                await loading.dismiss();
                this.presentToast(response.message);
                
              },
              async (error) => {
                console.log(error);
                await loading.dismiss();
              }
            );

          console.log(
            this.users.decodedToken.id,
            this.form.get('title').value,
            this.form.get('description').value,
            this.vibrateStatus,
            this.taskStatus,
            moment(this.dateValue2, 'hh:mm A').format('HH:mm:ss'),
            this.days[index].day
          );
        }
      }
    } else {
      console.log( this.taskStatus, this.vibrateStatus);
      
      this.schedule
        .updateSchedule(
          this.schedule_id,
          moment(this.dateValue2, 'hh:mm A').format('HH:mm:ss'),
          this.form.get('title').value,
          this.form.get('description').value,
          this.vibrateStatus,
          this.taskStatus
        )
        .subscribe(
          async (response: any) => {
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


  //Check if there is still conflicts
  checkForConflictsOnSchedule(){
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
  loadAllSchedules(){
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
  resetBadgeValue(){
    this.days.forEach(element => {
      element.badge = false
    });
  }
  onClick(){
    console.log("ge");
    
  }
}
