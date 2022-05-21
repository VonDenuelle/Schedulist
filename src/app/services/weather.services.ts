import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import * as moment from 'moment';
import { ScheduleService } from './schedule.services';


@Injectable({
  providedIn: 'root'
})


export class WeatherService {
    constructor(private http: HttpClient){}

    cloud = ''
    temperature =''
    city =''
    icon = ''
    
    //your api key
    apiKey = ''
    baseUrl = ''
   /** 
   *  Displaying Schedule API Connections
   */
   weather(coords : GeolocationCoordinates){

    return this.http.get(
        "http://api.weatherapi.com/v1/current.json?key="+this.apiKey+"&q="+coords.latitude+","+coords.longitude+"&aqi=no"
        )
  }
}