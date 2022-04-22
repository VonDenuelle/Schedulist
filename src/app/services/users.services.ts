import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  /**
   *  Sets default object keys and values to prevent error from sidemenu(app.component.html)
   *  
   *  if decodedToken is set to none ( public decodedToken )
   *  Without setting default object keys and values, it returns an error since it detects that it has no
   *  value at first before having any value set by authentication.services.ts 
   * 
   *  even if it is actually working, error persist
   * 
   *  Setting it like this, with default values, removes the error it detects
   *
   */
  public decodedToken = {
    id : '',
    name : '',
    email : ''
  }
}
