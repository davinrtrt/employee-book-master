import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean = false

  @Input()
  sidenav: MatSidenav

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

  }

  ngDoCheck(){
    this.loggedIn = this.authService.isUserLoggedIn()
  }

  onLogout(){
    this.authService.logout()
  }
}
