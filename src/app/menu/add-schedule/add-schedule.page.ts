<<<<<<< Updated upstream
import { Component, OnInit} from '@angular/core';
=======
import { Component, OnInit  } from '@angular/core';
import { IonDatetime } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
>>>>>>> Stashed changes
@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.page.html',
  styleUrls: ['./add-schedule.page.scss'],
})
export class AddSchedulePage implements OnInit {
  constructor() { }
  dateValue2 = format(new Date(), 'hh:mm a') // sets default current time

  ngOnInit() {
  }

  formatDate(time){
    const formattedString = format(parseISO(time), 'hh:mm a');
    return formattedString
  }
}
