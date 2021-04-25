import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ACTION, EMPLOYEE_FORM_TEMPLATE } from '../../models/app.constraint';
import { Employee, EmployeeForm } from '../../models/app.model';
import { EmployeeService } from '../../services/employee.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-add-update-employee',
  templateUrl: './add-update-employee.component.html',
  styleUrls: ['./add-update-employee.component.scss']
})
export class AddUpdateEmployeeComponent implements OnInit, OnDestroy {

  employeeForm: FormGroup;
  employeeFormTemplate: EmployeeForm
  param: Subscription
  hasUsername: boolean = false //flag to check for create/update
  username: string

  employeeIndex: number
  currentEmployee: Employee

  constructor(private formBuilder: FormBuilder, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private snackBarService: SnackbarService,
    private employeeService: EmployeeService) {

    // Initialize Template
    this.employeeFormTemplate = new EmployeeForm()
    this.employeeFormTemplate.title = "Employee Form"
    EMPLOYEE_FORM_TEMPLATE.items.forEach((f, i) => {
      // console.log(f)
      this.employeeFormTemplate.items[i] = f
      this.employeeFormTemplate.items[i].value = null
    })

    this.param = this.activatedRoute.params.subscribe(data => {
      if(data['username']){
        let param: string = data['username']

        // [0] = index
        // [1] = username
        let params = param.split('/')
        this.hasUsername = true

        this.employeeIndex = parseInt(params[0], 10)
        this.username = params[1]
      }
      this.initializeForm()
    })
  }

  ngOnInit(): void {

  }

  ngOnDestroy(){
    this.param.unsubscribe()
  }

  private initializeForm(){
    if(this.username){
      this.currentEmployee = this.employeeService.getEmployeeByUsername(this.username)

      Object.keys(this.currentEmployee).forEach((key, value) => {
        this.employeeFormTemplate.items[value].value = this.currentEmployee[key]
      })
    }

    this.employeeForm = this.formBuilder.group({
      items: this.formBuilder.array([])
    })
  }

  returnFormControl($event: any){
    let formControl = $event as FormControl
    let fields = this.employeeForm.controls.items as FormArray
    
    fields.push(formControl)
  }

  onCancel(){
    this.employeeFormTemplate = null
    this.router.navigate(['home'])
  }

  onSubmit(form: FormGroup){
    if(form.valid){
      let newEmployee = new Employee()

      Object.keys(newEmployee).forEach((key, index) => {
        newEmployee[key] = form.value.items[index]
      })
  
      if(this.hasUsername){
        // Then update the existing employee
        this.employeeService.updateEmployee(this.employeeIndex, newEmployee)
        this.snackBarService.openFromComponent(this.currentEmployee, ACTION.EDIT)
      } else {
        this.employeeService.addEmployee(newEmployee)
      }
  
      setTimeout(() => {
        this.onCancel()
      }, 100)
    }
  }
}
