import { Time } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedules-list',
  templateUrl: './schedules-list.component.html',
  styleUrls: ['./schedules-list.component.scss'],
})
export class SchedulesListComponent implements OnInit {

  @Input() time: string
  @Input() title: string

  idType
  taskStatus : boolean
  constructor() { }

  ngOnInit() {
  
  }

  edit(hello){
    
    console.log(this.idType);
  }

  delete(){
    console.log("DELETE");

  }

  taskChange(){
      console.log(this.taskStatus);
      
  }
}
