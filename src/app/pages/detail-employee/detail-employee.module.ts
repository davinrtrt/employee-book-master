import { NgModule } from '@angular/core';
import { DetailEmployeeRoutingModule } from './detail-employee-routing.module';
import { SharedModule } from '../../shared/shared/shared.module';
import { DetailEmployeeComponent } from './detail-employee.component';

@NgModule({
  declarations: [DetailEmployeeComponent],
  imports: [
    SharedModule,
    DetailEmployeeRoutingModule
  ]
})
export class DetailEmployeeModule { }
