import { Component, IterableDiffers, OnInit, ViewChild } from '@angular/core';
import { IonAccordionGroup, LoadingController, MenuController } from '@ionic/angular';
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
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    
  }


  async ionViewWillEnter() {
    this.menuCtrl.enable(false); //disable sidemenu
    this.temporaryScheduleHolder = [
      {day : 'Mon' , result : []},
      {day : 'Tue' , result : []},
      {day : 'Wed' , result : []},
      {day : 'Thu' , result : []},
      {day : 'Fri' , result : []},
      {day : 'Sat' , result : []},
      {day : 'Sun' , result : []},
    ]; // reset to none

    const loading = await this.loadingController.create();
    await loading.present();   
    //preload all schedules by day
    this.schedule.allSchedules(this.users.decodedToken.id).subscribe(
      async (response: any) => {
        if (response.response != undefined) {
          
          this.todaySchedules = response.response;
          
         /**
          *  seggregate schedules depending on day
          */
          let i = 0, len = this.todaySchedules.length; // caching length
    
          while (i < len) { // loop all schedules
 
            this.temporaryScheduleHolder.forEach(element => { // if day is == with day from all schedules, then push

              if ( this.todaySchedules[i].day == element.day) {   

                this.getScheduleByDay(moment(element.day, 'ddd').format('dddd'))     
                 this.temporaryScheduleHolder[this.dayIndex].result.push(this.todaySchedules[i])
      
              }
            });
            i++;
          }
          console.log(this.temporaryScheduleHolder);

        }
        
       await loading.dismiss();
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
  temporaryScheduleHolder  = [
    {day : 'Mon' , result : []},
    {day : 'Tue' , result : []},
    {day : 'Wed' , result : []},
    {day : 'Thu' , result : []},
    {day : 'Fri' , result : []},
    {day : 'Sat' , result : []},
    {day : 'Sun' , result : []},
  ]
 dayIndex = 1

  /**
   *  =========== Functions
   */
  
  // Time Formatting - 24 hour (From mysql) to 12 hour
  formatDate(time) {
    const formattedString = moment(time, "HH:mm:ss").format('hh:mm A')
    return formattedString;
  }

  async getScheduleByDay(day) {
    switch (day) {
      case 'Monday':
        this.dayIndex = 0
        break;
      case 'Tuesday':
        this.dayIndex = 1
        break;
      case 'Wednesday':
        this.dayIndex = 2
        break;
      case 'Thursday':
        this.dayIndex = 3
        break;
      case 'Friday':
        this.dayIndex = 4
        break;
      case 'Saturday':
        this.dayIndex = 5
        break;
      case 'Sunday':
        this.dayIndex = 6
        break; 
    }
  }

  /** 
   *  Update Contents instead of always recreating ionic components
   *  by tracking if schedule.id changes. it its the same than before 
   *  then dont recreate it 
   */
   trackById(index, schedule){
    return index;
  }
  
  deleteFromList(dayIndex, index, id){
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
    this.temporaryScheduleHolder[dayIndex].result.splice(index, 1)  // remove on position, how many  

    for (let i = 0; i < this.todaySchedules.length; i++) {
      if (this.todaySchedules[i].id == id) {
        this.todaySchedules.splice(i, 1) 
      }      
    }

  }
}
