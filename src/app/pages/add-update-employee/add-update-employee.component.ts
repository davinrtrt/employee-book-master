import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ACTION, EMPLOYEE_FORM_TEMPLATE } from '../../models/app.constraint';
import { Employee, EmployeeForm, EmployeeFormGrouping } from '../../models/app.model';
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
  currentEmployee: Employee
  isInit: boolean = false

  constructor(private formBuilder: FormBuilder, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private snackBarService: SnackbarService,
    private employeeService: EmployeeService) {

    this.param = this.activatedRoute.params.subscribe(data => {
      if(data['username']){
        this.username = data['username']
        this.hasUsername = true
      }
    })
    this.initializeForm()
  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.param.unsubscribe()
  }

  private initializeForm(){
    // Initialize reactive form    
    this.employeeForm = this.formBuilder.group({
      items: this.formBuilder.array([])
    })

    this.employeeFormTemplate = new EmployeeForm()
    this.employeeFormTemplate.title = EMPLOYEE_FORM_TEMPLATE.title

    if(this.hasUsername){
      this.employeeService.getEmployeeByUsername(this.username).subscribe(data => {
        this.currentEmployee = data
        // console.log(this.currentEmployee)

        Object.keys(this.currentEmployee).forEach((key, value) => {
          // console.log(key, value)
          this.employeeFormTemplate.items[value] = EMPLOYEE_FORM_TEMPLATE.items[value]
          this.employeeFormTemplate.items[value].value = this.currentEmployee[key]
          // console.log(this.employeeFormTemplate.items[value].value, this.currentEmployee[key])
          if(key === "birthDate"){
            this.employeeFormTemplate.items[value].value = new Date(this.currentEmployee[key])
          }
        })
      })
    } else {
      EMPLOYEE_FORM_TEMPLATE.items.forEach((item,i) => {
        this.employeeFormTemplate.items[i] = item
        this.employeeFormTemplate.items[i].value = null
      })
    }
    this.isInit = true
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
        // if(key === "birthDate") {
        //   newEmployee[key] = new Date(form.value.items[index])
        //   console.log(newEmployee[key])
        // }
      })
  
      if(this.hasUsername){
        // Then update the existing employee
        this.employeeService.updateEmployee(this.username, newEmployee).subscribe(data => {
          if(data){
            // console.log(data)
            this.snackBarService.openFromComponent(this.currentEmployee, ACTION.EDIT)
          }
        })
      } else {
        this.employeeService.addEmployee(newEmployee).subscribe(data => {
          console.log("new employee added", data)
        })
      }
  
      setTimeout(() => {
        this.onCancel()
      }, 100)
    }
  }
}

