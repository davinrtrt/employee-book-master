import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DIALOG_DATA } from '../../models/app.constraint';

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.scss']
})
export class WarningComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<WarningComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DIALOG_DATA) { }

  ngOnInit(): void {
  }

  onNoClick(){
    this.dialogRef.close(false)
  }

  onYesClick(){
    // To trigger action execution
    this.dialogRef.close(true)
  }
}
