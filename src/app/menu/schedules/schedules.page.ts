import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController, PopoverController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import * as moment from 'moment';
import { ListModalComponent } from 'src/app/components/list-modal/list-modal.component';
import { ScheduleService } from 'src/app/services/schedule.services';
import { UserService } from 'src/app/services/users.services';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.page.html',
  styleUrls: ['./schedules.page.scss'],
})
export class SchedulesPage implements OnInit {
  constructor(
    private popoverController: PopoverController,
    public menuCtrl: MenuController,
    private schedule: ScheduleService,
    public users: UserService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.menuCtrl.enable(true); //enable sidemenu
    this.schedule.todaySchedules(this.users.decodedToken.id, this.day)
      .subscribe( 
        async (response : any) =>  {
          this.todaySchedules = response.response;
          this.stringifiedTodaySchedules = JSON.stringify(this.todaySchedules);

        },
        async (error) =>{
          console.log(error);
          
        }
      );
    
  }

  
  /**
   *  =============== Variables
   */
   day = moment(new Date()).format('ddd'); 
   todaySchedules // response holder for todaySchedules
   stringifiedTodaySchedules

 /**
   * ================= FUNCTIONS
   */

  // Time Formatting - 24 hour (From mysql) to 12 hour
  formatDate(time) {
    const formattedString = moment(time, "HH:mm:ss").format('hh:mm A')
    return formattedString;
  }

  // Dismiss Popover
  async DismissClick() {
    await this.popoverController.dismiss();
  }


  public deleteFromList(index){
    this.todaySchedules.splice(index, 1)  // remove on position, how many  
  }
}
