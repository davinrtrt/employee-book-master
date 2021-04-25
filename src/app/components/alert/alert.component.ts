import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { ACTION, SNACKBAR_DATA } from '../../models/app.constraint';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  ACTION = ACTION

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: SNACKBAR_DATA) { }

  ngOnInit(): void {
  }

}
