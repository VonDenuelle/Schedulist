import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.page.html',
  styleUrls: ['./about-page.page.scss'],
})
export class AboutPagePage implements OnInit {
  selected = 'abtSched';
  constructor() { }

  ngOnInit() {
  }

}
