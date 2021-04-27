import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlertComponent } from '../../components/alert/alert.component';
import { WarningComponent } from '../../dialogs/warning/warning.component';
import { ACTION, DIALOG_DATA, KEY_EMPLOYEE_DATA, KEY_SEARCH_EMPLOYEE, SNACKBAR_DATA } from '../../models/app.constraint';
import { Employee } from '../../models/app.model';
import { EmployeeService } from '../../services/employee.service';
import { SnackbarService } from '../../services/snackbar.service';

const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  dataSource: MatTableDataSource<Employee>;
  tableColumns: string[] = [];
  searchEmployeeName: string;
  employees: Employee[] = []
  resultsLength: number = 0

  currentPageIndex: number;
  currentPageSize: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, 
    private employeeService: EmployeeService,
    private snackbarService: SnackbarService,
    private dialog: MatDialog) { 
  }

  ngOnInit(): void {
  }

  private fetchEmployees(){
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data
      // console.log(this.employees)
            
      const keys = Object.keys(this.employees[0])

      // Exclude some columns to be viewed on table
      keys.forEach((key, index) => {
        if(key !== "id" && key !== "email" && key !== "birthDate" && key !== "basicSalary" && key !== "description"){
          this.tableColumns.push(key)
        }
      })

      // Add actions column (view, edit, delete)
      this.tableColumns.push("actions")

      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(this.employees);
      // this.dataSource.data = this.employees
      
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      if(localStorage.getItem(KEY_SEARCH_EMPLOYEE)){
        this.searchEmployeeName = localStorage.getItem(KEY_SEARCH_EMPLOYEE)
        
        this.onSearch()
      }
    })
  }

  private refreshEmployees(){
    this.employeeService.getEmployees().subscribe(data => {
      this.dataSource.data = data
    })
  }

  ngAfterViewInit(){
    this.fetchEmployees()
  }

  onSearch(){
    if(this.searchEmployeeName){
      // Search Case = Filtering based on first name or last name with Fulltime status
      const filteredEmployees = this.employees.filter(emp => {
        if((emp.firstName.toLowerCase().includes(this.searchEmployeeName.toLowerCase())
        || emp.lastName.toLowerCase().includes(this.searchEmployeeName.toLowerCase())) && emp.status == "Fulltime"){
          return emp
        }
      })
      localStorage.setItem(KEY_SEARCH_EMPLOYEE, this.searchEmployeeName)
  
      this.dataSource.data = filteredEmployees
    } else {
      localStorage.removeItem(KEY_SEARCH_EMPLOYEE)
      this.dataSource.data = this.employees
    }
  }

  onAddEmployee(){
    this.router.navigate(['add-update-employee'])
  }

  onSelectEmployee(username: string){
    this.router.navigate(['home', username])
  }

  onEditEmployee(username: string){
    this.router.navigate(['add-update-employee', username])
  }

  onDeleteEmployee(username: string){
    let i = this.employees.map(e => e.username).indexOf(username)

    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = "300px"
    dialogConfig.data = new DIALOG_DATA()
    dialogConfig.data.title = "Warning"
    dialogConfig.data.message = `Are you sure want to delete <b>${this.employees[i].firstName} ${this.employees[i].lastName}</b>'s information?`
  
    const dialogRef = this.dialog.open(WarningComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.employeeService.deleteEmployee(username).subscribe(res => {
          this.refreshEmployees()
          this.snackbarService.openFromComponent(this.employees[i], ACTION.DELETE)
        })
      }
    })
  }
}
