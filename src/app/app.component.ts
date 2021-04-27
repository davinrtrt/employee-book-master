import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
// import { Employees, KEY_EMPLOYEE_DATA } from './models/app.constraint';
import { AuthService } from './services/auth.service';
import { EmployeeService } from './services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'employee-ms';
  loggedIn: boolean = false

  @ViewChild('sidenav') public sidenav: MatSidenav;

  constructor(private employeeService: EmployeeService,
    private authService: AuthService){

    // if(!this.employeeService.getEmployees()){
    //   this.employeeService.storeAllEmployees(Employees)
    // }
  }

  toggleSidenav($event){
    this.sidenav.toggle()
  }
}
