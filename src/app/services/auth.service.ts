import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { KEY_LOGIN, KEY_SEARCH_EMPLOYEE, LOGIN_INFORMATION } from '../models/app.constraint';
import { User } from '../models/app.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) { 

  }

  isUserLoggedIn(){
    return (localStorage.getItem(KEY_LOGIN) != null)
  }

  login(user: User){
    // console.log(user)
    if(user.username === LOGIN_INFORMATION.username && user.password === LOGIN_INFORMATION.password){
      localStorage.setItem(KEY_LOGIN, this.encryptLogin(user))
      this.isLoggedIn.next(true)
      this.router.navigate(['/']);
    }
  }

  private encryptLogin(user: User){
    let str = user.username + user.password
    return str.split('').reverse().join()
  }

  logout(){
    localStorage.removeItem(KEY_LOGIN)
    localStorage.removeItem(KEY_SEARCH_EMPLOYEE)
    this.isLoggedIn.next(false)
    this.router.navigate(['login']);
  }
}
