import { Component, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AlertComponent } from '../components/alert/alert.component';
import { ACTION, SNACKBAR_DATA } from '../models/app.constraint';
import { Employee } from '../models/app.model';

@Injectable({
    providedIn: 'root'
})
export class SnackbarService {
    constructor(private snackBar: MatSnackBar){

    }

    openFromComponent(employee: Employee, action: ACTION){
        const sbConfig = new MatSnackBarConfig
        sbConfig.data = new SNACKBAR_DATA()
        sbConfig.data.message = `${employee.firstName} ${employee.lastName}'s information has been $str!`
        if(action === ACTION.DELETE){
          sbConfig.data.message = sbConfig.data.message.replace("$str", "deleted")
        } else {
          sbConfig.data.message = sbConfig.data.message.replace("$str", "updated")
        }
    
        sbConfig.data.action = action
        sbConfig.panelClass = ['snackbar-container']
        sbConfig.duration = 3000
        this.snackBar.openFromComponent(AlertComponent, sbConfig)
    }
} 