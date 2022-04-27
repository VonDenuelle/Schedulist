import { Time } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ListModalComponent } from '../list-modal/list-modal.component';

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
  constructor(
    public modalController: ModalController) { }

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

  
  // present Modal
  async presentModal(title) {
    console.log(title);
    
    const modal = await this.modalController.create({
      component: ListModalComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'title': title
      }
    });
    return await modal.present();
  }
}
