import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.scss']
})
export class SidenavMenuComponent implements OnInit {

  @Input()
  sidenav: MatSidenav

  menus = [
    {
      title: "Employees",
      icon: "group",
      route: "home"
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
