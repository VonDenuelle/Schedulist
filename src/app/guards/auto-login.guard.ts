import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { filter, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanLoad {
  constructor(private authService: AuthenticationService, private router: Router) { }

  canLoad(): Observable<boolean> {
    return this.authService.isAuthenticated.pipe(
      filter(val => val !== null), //filter value of initial value of null from Behavior Subject
      take(1),    // take only 1 result from observable otherwise observable doesnt complete
      map(isAuthenticated => {
        if (isAuthenticated) {
          //go to home
          this.router.navigateByUrl('/home', {replaceUrl: true})
        }else {
          // allow going to login page
          return true;
        }
      })
    )
  }
}

