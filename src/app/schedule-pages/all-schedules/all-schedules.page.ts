import { Component, IterableDiffers, OnInit, ViewChild } from '@angular/core';
import { IonAccordionGroup, MenuController } from '@ionic/angular';
import * as moment from 'moment';
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
    public users: UserService,

  ) { }

  ngOnInit() {}


  ionViewWillEnter() {
    this.menuCtrl.enable(false); //disable sidemenu

    //preload all schedules
    this.schedule.allSchedules(this.users.decodedToken.id).subscribe(
      async (response: any) => {
        if (response.response != undefined) {
          this.todaySchedules = response.response;
        }
       
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
  todaySchedules : any[]
  temporaryScheduleHolder : any[]
  iterableDiffer
  /**
   *  =========== Functions
   */
  
  // Time Formatting - 24 hour (From mysql) to 12 hour
  formatDate(time) {
    const formattedString = moment(time, "HH:mm:ss").format('hh:mm A')
    return formattedString;
  }

  getScheduleByDay(day) {
    this.temporaryScheduleHolder = []; // reset to none
    let abbr = day.substring(0, 3);

    /**
     * If the clicked accordion value(the day), is same with the day from the
     * response, then put that object to temporary array
     */
    if (this.todaySchedules != undefined) { // if there is no schedules yet
      let i = 0, len = this.todaySchedules.length; // caching length

      while (i < len) {
        if (this.todaySchedules[i].day == abbr) {
          this.temporaryScheduleHolder.push(this.todaySchedules[i]);
        }
        i++;
      }
    }
  }

  
  deleteFromList(index, id){
    /**
     *  First, Remove the element based on index clicked from temporaryScheduleHolder array 
     *  ( different index ) as it changes based on day 
     * 
     *  then, get the index from todaySchedules array
     *  ( that previously fetched everything )
     *  based on the id(from response) who was clicked 
     *  and remove the element
     *  
     *  this causes to completely REMOVE IT FROM BOTH ARRAYS without having any issues
     *  of reloading the unupdated list 
     */
    this.temporaryScheduleHolder.splice(index, 1)  // remove on position, how many  

    for (let i = 0; i < this.todaySchedules.length; i++) {
      if (this.todaySchedules[i].id == id) {
        this.todaySchedules.splice(i, 1) 
      }      
    }

  }
}
