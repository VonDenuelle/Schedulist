import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.page.html',
  styleUrls: ['./about-page.page.scss'],
})
export class AboutPagePage implements OnInit {
  selected = 'abtSched';
  
  constructor(public menuCtrl: MenuController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);  //enable sidemenu
   }
}
