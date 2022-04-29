import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient) { }

  /**
   *  API Content-Type Differences
   * @param formData  
   * @returns application/x-www-form-urlencoded
   * 
   * @param json
   * @returns application/json
   */


  /**
   * Adding Schedule API Connections
   */
  addSchedule(userid, day, time, title, description, vibrate, toggle){
    let formData = new FormData();
        formData.append('userid' , userid);
        formData.append('day' , day);
        formData.append('time' , time);
        formData.append('title' , title);
        formData.append('description' , description);
        formData.append('vibrate' , vibrate);
        formData.append('toggle' , toggle);
    
    
    return this.http.post(environment.localhost + 'post/add-schedule.php', formData)
  }


  /**
   *  Displaying Schedule API Connections
   */
   todaySchedules(userid, day){
    let json = {
      'userid' : userid,
      'day' : day
    }

    return this.http.post(environment.localhost + "post/today-schedules.php", json)
  }

  allSchedules(userid){
    let json = {
      'userid' : userid
    }

    return this.http.post(environment.localhost + "post/all-schedules.php", json)
  }

  scheduleById(id){
    return this.http.get(environment.localhost + "get/scheduleby-id.php?id=" + id)
  }

  /**
   *  Updating Schedules
   */
  updateSchedule(id, time, title, description, vibrate, toggle){
    let json = {
      'id' : id,
      'time' : time,
      'title' : title,
      'description' : description,
      'vibrate' : vibrate,
      'toggle' : toggle

    }

    return this.http.patch(environment.localhost + "patch/update-schedule.php", json)
  }

  
  /**
   *  Deleting Schedules
   */
   deleteSchedule(id){
    return this.http.get(environment.localhost + "delete/delete-schedule.php?id=" + id)
  }
}
