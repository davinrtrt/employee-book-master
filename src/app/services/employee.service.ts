import { Injectable } from "@angular/core";
import { ACTION, KEY_EMPLOYEE_DATA, KEY_SEARCH_EMPLOYEE } from '../models/app.constraint';
import { Employee } from '../models/app.model';
import { SnackbarService } from './snackbar.service';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    private employeeData: Employee[] = []

    constructor(private snackBarService: SnackbarService){
        this.employeeData = JSON.parse(localStorage.getItem(KEY_EMPLOYEE_DATA))
    }

    getEmployees(){
        this.employeeData = JSON.parse(localStorage.getItem(KEY_EMPLOYEE_DATA))
        return this.employeeData
    }

    getEmployeeByUsername(username: string){
        return this.employeeData.find(x => x.username === username)
    }

    storeAllEmployees(employees: Employee[]){
        localStorage.setItem(KEY_EMPLOYEE_DATA, JSON.stringify(employees))
        console.log(JSON.parse(localStorage.getItem(KEY_EMPLOYEE_DATA)))
    }

    addEmployee(employee: Employee){
        this.employeeData.push(employee)
        this.storeAllEmployees(this.employeeData)
    }

    updateEmployee(i: number, employee: Employee){
        // this.getEmployees().map(emp => {
        //     if(emp.username === employee.username){
        //         emp = employee
        //     }
        // })
        if(i !== -1){
            this.employeeData[i] = employee
            this.storeAllEmployees(this.employeeData)
            this.snackBarService.openFromComponent(this.employeeData[i], ACTION.EDIT)
        }
    }

    deleteEmployee(i: number){
        if(i !== -1){
            this.snackBarService.openFromComponent(this.employeeData[i], ACTION.DELETE)

            this.employeeData.splice(i, 1)
            this.storeAllEmployees(this.employeeData)
        }
    }
}