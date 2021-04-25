import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import { GROUP_OPTIONS, STATUS_OPTIONS, VALID_EMAIL } from '../../models/app.constraint';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent implements OnInit {

  @Input()
  uid: string
  @Input()
  label: string
  @Input()
  type: string
  @Input()
  isRequired: boolean
  @Input()
  options: string[]
  @Input()
  value: any = null
  @Output()
  returnFormControl: EventEmitter<FormControl> = new EventEmitter<FormControl>()

  formControl: FormControl
  filteredOptions: any
  maxDate: Date = new Date()

  constructor() { 
  }

  ngOnInit(): void {
    // console.log(this.value)

    if(this.uid === "STATUS"){
      this.formControl = new FormControl(this.value ? this.value : this.options[0], Validators.required)
    } else if(this.uid === "GROUP"){
      this.formControl = new FormControl(this.value ? this.value : this.options[0], Validators.required)
      console.log(this.options)
      this.filteredOptions = this.formControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this.filterValue(value))
      );
    
    } else if(this.uid === "BASIC_SALARY"){
      this.formControl = new FormControl(this.value ? this.value : null, Validators.required)
    } else if(this.uid === "EMAIL") {
      this.formControl = new FormControl(this.value ? this.value : '', [Validators.pattern(VALID_EMAIL), Validators.required])
    } else {
      this.formControl = new FormControl(this.value ? this.value : '', Validators.required)
    }
     
    this.returnFormControl.emit(this.formControl)
  }

  private filterValue(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  isFieldInvalid(){
    return (this.formControl.invalid && this.formControl.touched)
  }

  private search(value: string){
    const searchValue = value.toLowerCase()
    return this.options.filter(option => option.toLowerCase().includes(searchValue));
  }

  valueChanged(value: string){
    this.formControl.valueChanges.subscribe(value => {
      this.search(value)
    })
  }
}
