import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.form = new AddScheduleForm(this.formBuilder).createForm();
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true); //enable sidemenu
    this.checkDayToggleStatus();
  }

  /**
   *  =============== Variables
   */
  dateValue2 = moment().format('hh:mm A')// sets default current time to label

  days = [
    { day: 'Mon', toggle: false },
    { day: 'Tue', toggle: false },
    { day: 'Wed', toggle: false },
    { day: 'Thu', toggle: false },
    { day: 'Fri', toggle: false },
    { day: 'Sat', toggle: false },
    { day: 'Sun', toggle: false },
  ];
  dayCounter = 0;

  // Other Variables to pass on services
  vibrateStatus: boolean = false;
  taskStatus: boolean = false;
  form: FormGroup;

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
    const formattedString = moment(time).format('hh:mm A')
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
  }

  
  // Buttons : Delete or Save
  async save() {
    const loading = await this.loadingController.create();
    await loading.present();

    for (let index = 0; index < this.days.length; index++) {
      if (this.days[index].toggle == true) {
        // if its toggled, then do this query
         this.schedule
          .addSchedule(
            this.users.decodedToken.id,
            this.days[index].day,
            moment(this.dateValue2, "hh:mm A").format('HH:mm:ss'),
            this.form.get('title').value,
            this.form.get('description').value,
            this.vibrateStatus,
            this.taskStatus
          )
          .subscribe(
            async (response: any) => {
              console.log('RESPONSE: ', response);
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
          moment(this.dateValue2, "hh:mm A").format('HH:mm:ss'),
          this.days[index].day
        );
      }
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
}
