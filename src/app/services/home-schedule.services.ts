import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import * as moment from 'moment';
import { ScheduleService } from './schedule.services';

/* <KEYS> */
export const TIME_KEY = 'time';
export const DAY_KEY = 'day';
export const TITLE_KEY = 'title';
export const DESCRIPTION_KEY = 'description';
export const PRIORITY_KEY = 'priority';
export const ID_KEY = 'id';

@Injectable({
  providedIn: 'root'
})

/* For Updating and Displaying which schedule should show in home */
export class HomeScheduleService {
    constructor(public schedule : ScheduleService){

    }
    
    /* Function for retaining schedule even on close, sets on storage 
    also for deleted sched or when time of sched is changed */
    async updateStorage({
        id = '-1',
        time = 'Waiting', 
        day = '',
        title = 'No schedule yet', 
        description = 'Wait for the next notification of your schedule or create one if you don\x27t have one yet', 
        priority = 'false'
    }
        ){

       await Storage.set({key : ID_KEY, value : id})
       await Storage.set({ key : PRIORITY_KEY, value : priority })
       await Storage.set({ key : TIME_KEY, value : time })
       await Storage.set({ key : DAY_KEY, value : day })
       await Storage.set({ key : TITLE_KEY, value : title })
       await Storage.set({ key : DESCRIPTION_KEY, value : description })

    }
}
 