import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/users.services';





@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Schedules', url: '/schedules', icon: 'list' },
    { title: 'About', url: '/about-page', icon: 'information-circle' }
  ];
  constructor(private authService: AuthenticationService, private router: Router, public users: UserService) {}
 
  async logout() {
    await this.authService.logout()
    this.router.navigateByUrl('/', { replaceUrl: true })
  }
}
