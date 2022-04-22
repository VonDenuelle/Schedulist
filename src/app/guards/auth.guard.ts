import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map,take } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthenticationService, private router: Router){}

  canLoad(): Observable<boolean> {
    return this.authService.isAuthenticated.pipe(
      filter(val => val !== null), //filter value of initial value of null from Behavior Subject
      take(1),    // take only 1 result from observable otherwise observable doesnt complete
      map(isAuthenticated => {
        console.log('GUARD' , isAuthenticated);
        
        if (isAuthenticated) {
          return true;  //proceed to page
        } else {
          this.router.navigateByUrl('/landing') //return to login/register
          return false
        }
      })
    )
  }
}
