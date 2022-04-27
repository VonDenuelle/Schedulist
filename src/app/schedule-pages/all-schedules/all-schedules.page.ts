import { Component, OnInit, ViewChild } from '@angular/core';
import { IonAccordionGroup, MenuController } from '@ionic/angular';
import { ScheduleService } from 'src/app/services/schedule.services';
import { UserService } from 'src/app/services/users.services';

@Component({
  selector: 'app-all-schedules',
  templateUrl: './all-schedules.page.html',
  styleUrls: ['./all-schedules.page.scss'],
})
export class AllSchedulesPage implements OnInit {
  @ViewChild(IonAccordionGroup, { static: true })
  accordionGroup: IonAccordionGroup;

  constructor(
    public menuCtrl: MenuController,
    private schedule: ScheduleService,
    public users: UserService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.menuCtrl.enable(true); //enable sidemenu

    //preload all schedules
    this.schedule.allSchedules(this.users.decodedToken.id).subscribe(
      async (response: any) => {
        console.log(response.response);
        this.todaySchedules = response.response;

      },
      async (error) => {
        console.log(error);
      }
    );

  
  
  }

  /**
   *  =========== Variables
   */
  days: string[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  // Arrays for responses
  todaySchedules : any = [];
  temporaryScheduleHolder: any = [];

  /**
   *  =========== Functions
   */
  getScheduleByDay(day) {
    this.temporaryScheduleHolder = []; // reset to none
    let abbr = day.substring(0, 3);

    /**
     * If the clicked accordion value(the day), is same with the day from the
     * response, then put that object to temporary array
     */

    let i = 0, len = this.todaySchedules.length; // caching length

    while (i < len) {
      if (this.todaySchedules[i].day == abbr) {
        this.temporaryScheduleHolder.push(this.todaySchedules[i]);
      }
      i++;
    }
  }
}
