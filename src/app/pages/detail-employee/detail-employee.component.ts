import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmployeeForm, EmployeeFormGrouping } from '../../models/app.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-detail-employee',
  templateUrl: './detail-employee.component.html',
  styleUrls: ['./detail-employee.component.scss']
})
export class DetailEmployeeComponent implements OnInit, OnDestroy {

  param: Subscription
  employee: EmployeeForm

  constructor(private route: ActivatedRoute, 
    private employeeService: EmployeeService,
    private router: Router) { 
  }

  ngOnInit(): void {
    // Retrieve username param to fetch detail
    this.param = this.route.params.subscribe(data => {
      if(data['username']){
        // Fetch employee detail by username
        this.getEmployeeDetail(data['username'])
      }
    })
  }

  ngOnDestroy(){
    this.param.unsubscribe()
  }

  private getEmployeeDetail(username: string){
    const employee = this.employeeService.getEmployeeByUsername(username)
    
    this.employee = new EmployeeForm()
    this.employee.title = "Employee Detail"
    this.employee.items = []

    // Iterate through employee properties and assign to employee model
    Object.entries(employee).forEach((key, value) => {
      let item = new EmployeeFormGrouping()
      item.label = key[0]
      item.value = key[1]

      this.employee.items.push(item)
    })

    console.log(this.employee)
  }

  onGoBack(){
    this.router.navigate(['home'])
  }
}
