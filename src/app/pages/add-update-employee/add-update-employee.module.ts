import { NgModule } from '@angular/core';
import { FormFieldComponent } from '../../components/form-field/form-field.component';
import { SharedModule } from '../../shared/shared/shared.module';
import { AddUpdateEmployeeRoutingModule } from './add-update-employee-routing.module';
import { AddUpdateEmployeeComponent } from './add-update-employee.component';

@NgModule({
  declarations: [
    AddUpdateEmployeeComponent,
    FormFieldComponent
  ],
  imports: [
    SharedModule,
    AddUpdateEmployeeRoutingModule
  ]
})
export class AddUpdateEmployeeModule { }
