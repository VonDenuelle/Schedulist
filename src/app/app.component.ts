import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Schedules', url: '/schedules', icon: 'list' },
    { title: 'About', url: '/about', icon: 'information-circle' },
    { title: 'Log out', url: '/logout', icon: 'log-out' }
  ];
  constructor() {}
}
