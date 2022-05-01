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
    
    
    return this.http.post(environment.lan + 'post/add-schedule.php', formData)
  }


  /**
   *  Displaying Schedule API Connections
   */
   todaySchedules(userid, day){
    let json = {
      'userid' : userid,
      'day' : day
    }

    return this.http.post(environment.lan + "post/today-schedules.php", json)
  }

  allSchedules(userid){
    let json = {
      'userid' : userid
    }

    return this.http.post(environment.lan + "post/all-schedules.php", json)
  }

  scheduleById(id){
    return this.http.get(environment.lan + "get/scheduleby-id.php?id=" + id)
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

    return this.http.patch(environment.lan + "patch/update-schedule.php", json)
  }

  updateToggleStatus(id, toggle){
    let json = {
      'id' : id,
      'toggle' : toggle
    }
    return this.http.patch(environment.lan + "patch/update-toggle-status.php", json)
  }

  
  /**
   *  Deleting Schedules
   */
   deleteSchedule(id){
    return this.http.get(environment.lan + "delete/delete-schedule.php?id=" + id)
  }


  /**
   *  Checking For Conflicts
   */
  checkForConflictsOnSchedules(userid, day, time){
    let json = {
      'id' : userid,
      'day' : day,
      'time' : time
    }
    return this.http.post(environment.lan + "post/check-day-and-time-conflicts.php", json)
  }
}
