import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Employee } from '../models/app.model';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    private localUrl: string = environment.url;
    private header: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json'
    })

    constructor(private http: HttpClient){
    }

    getEmployees(): Observable<Employee[]>{
        console.log(this.localUrl + "/employees")
        return this.http.get<Employee[]>(this.localUrl + "/employees")
            .pipe(
                retry(1),
                catchError(this.handleError)
            )
    }

    getEmployeeByUsername(username: string): Observable<Employee>{
        return this.http.get<Employee>(this.localUrl + "/employees/" + username)
            .pipe(
                retry(1),
                catchError(this.handleError)
            )
    }

    addEmployee(employee: Employee): Observable<Employee>{
        // this.employeeData.push(employee)
        // this.storeAllEmployees(this.employeeData)
        return this.http.post<Employee>(this.localUrl + "/employees", employee, {headers: this.header})
            .pipe(
                retry(1),
                catchError(this.handleError)
            )
    }

    updateEmployee(username: string, employee: Employee): Observable<Employee>{
        return this.http.put<Employee>(this.localUrl + "/employees/" + username, employee, {headers: this.header})
            .pipe(
                retry(1),
                catchError(this.handleError)
            )
    }

    deleteEmployee(username: string){
        return this.http.delete<Employee>(this.localUrl + "/employees/" + username, {headers: this.header})
            .pipe(
                retry(1),
                catchError(this.handleError)
            )
    }

    private handleError(error: HttpErrorResponse) {
        let msg = '';
        if(error.error instanceof ErrorEvent) {
          // client side error
          msg = error.error.message;
        } else {
          // server side error
          msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        // console.log(msg);
        return throwError(msg);
    }
      
}