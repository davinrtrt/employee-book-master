import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  backToHome(){
    //if user is authenticated, 
    //then go back to home page, 
    //else to login page
    if(this.authService.isUserLoggedIn()){
      this.router.navigate(['home'])
    } else {
      this.router.navigate(['login'])
    }
  }
}
