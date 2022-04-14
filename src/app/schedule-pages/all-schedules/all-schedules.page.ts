import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-all-schedules',
  templateUrl: './all-schedules.page.html',
  styleUrls: ['./all-schedules.page.scss'],
})
export class AllSchedulesPage implements OnInit {

  days : string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  lists = [
    {title : "Hello", time: "8:30 PM"},
    {title : "Hi", time: "10:30 PM"}
  ]

  constructor() { }

  ngOnInit() {
  }

}
