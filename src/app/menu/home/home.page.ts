import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ListModalComponent } from '../list-modal/list-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  
  constructor(public modalController: ModalController) {}

  async presentModal() {
    const modal = await this.modalController.create({
      component: ListModalComponent,
      cssClass: 'my-custom-class',
    });
    return await modal.present();
  }

  ngOnInit(): void {
    
  }

}
