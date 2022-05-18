import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import * as moment from 'moment';
import { ScheduleService } from './schedule.services';

/* <KEYS> */
const TIME_KEY = 'time';
const DAY_KEY = 'day';
const TITLE_KEY = 'title';
const DESCRIPTION_KEY = 'description';
const PRIORITY_KEY = 'priority';

@Injectable({
  providedIn: 'root'
})

/* For Updating and Displaying which schedule should show in home */
export class HomeScheduleService {
    constructor(public schedule : ScheduleService){
        Storage.get({ key: TIME_KEY }).then(res => {
            if (res.value == '' ||  res.value == undefined ||res.value == null){
                this.updateStorage()
            }     
        });
    }
    
    /* Function for retaining schedule even on close, sets on storage 
    also for deleted sched or when time of sched is changed */
    async updateStorage(
        time = 'Waiting', 
        day = '',
        title = 'No schedule yet', 
        description = 'Wait for the next notification of your schedule or create one if you don\x27t have one yet', 
        priority = 'false'
        ){
            console.log(priority);
       
       await Storage.set({ key : PRIORITY_KEY, value : priority })
       await Storage.set({ key : TIME_KEY, value : time })
       await Storage.set({ key : DAY_KEY, value : day })
       await Storage.set({ key : TITLE_KEY, value : title })
       await Storage.set({ key : DESCRIPTION_KEY, value : description })

    }
}
 