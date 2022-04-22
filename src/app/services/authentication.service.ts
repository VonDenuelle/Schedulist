import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@capacitor/storage';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { map,tap,switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserService } from './users.services';

const TOKEY_KEY = 'my-token';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
}) 
export class AuthenticationService {

  isAuthenticated : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null) // true or false if user has token
  token = '';
  decodedToken

  constructor(private http: HttpClient, public users: UserService) {
    this.loadToken()
   }

   /**
    *  loads token to check if isAuthenticated then proceed to go on to desired page
    *  NOTE: this one gets called when page refreshes instead of below functions
    */
  async loadToken(){
    const token = await Storage.get({key : TOKEY_KEY})
    if (token && token.value) {
      this.token = token.value;
      this.retrievePayload(this.token)
      this.isAuthenticated.next(true)  // sets true if user has the right token
    } else{
      this.isAuthenticated.next(false);
    }
  }


/**
 * 
 * LOGIN 
 */
  login(credentials: {email, password}): Observable<any>{
    /**
     *  environment.lan = 192.168.1 ...
     *  environment.localhost = localhost ...
     */
     return this.http.post(environment.localhost + "post/login.php", credentials).pipe(  
    // return this.http.post('https://reqres.in/api/login', credentials).pipe(
      map((data : any) => data.token),   //maps data like $.map in jquery
      switchMap(token =>{                 // switch to new observable 
        console.log(token);
        
        this.retrievePayload(token)
          return from(Storage.set({key : TOKEY_KEY, value: token}))  //return new obs : of type Promise then store token     
      }),
      tap( _ => {
        this.isAuthenticated.next(true);  //emits new value
      })
    )
  }

/**
 * REGISTER
 */
  register(credentials): Observable<any>{
    return this.http.post(environment.localhost + "post/register.php", credentials).pipe(
      map((data : any) => data.token),   //maps data like $.map in jquery
      switchMap(token =>{                 // switch to new observable 
         this.retrievePayload(token)
          return from(Storage.set({key : TOKEY_KEY, value: token}))  //return new obs : of type Promise then store token     
      }),
      tap( _ => {
        this.isAuthenticated.next(true);  //emits new value
      })
    )
  }

  logout() : Promise<void>{
    this.isAuthenticated.next(false);
    return Storage.remove({key : TOKEY_KEY})
  }


  /**
   *  Decodes Token and Sets Decoded Token Payloads to users access
   */
  retrievePayload(token){
    this.decodedToken = helper.decodeToken(token) // Decode token and send to public services

    /**
     *   This prevents error from loading details immediately on side menu (refer to users.services.ts comments)
     */
    this.users.decodedToken.name = this.decodedToken.name; 
    this.users.decodedToken.email = this.decodedToken.email; 
    this.users.decodedToken.id = this.decodedToken.id; 
  }
}
