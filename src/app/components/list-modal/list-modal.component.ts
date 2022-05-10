import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-list-modal',
  templateUrl: './list-modal.component.html',
  styleUrls: ['./list-modal.component.scss'],
})
export class ListModalComponent implements OnInit {
  // Data passed in by componentProps
  @Input() title: string;
  @Input() description: string;
  @Input() time
  @Input() day
  @Input() ringtone
  @Input() priority
  @Input() vibrate
  @Input() middleInitial: string;


  constructor(public modalController: ModalController) { }

  ngOnInit() {
    console.log(this.priority);
    
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}