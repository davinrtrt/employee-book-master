import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailEmployeeComponent } from './detail-employee.component';

const routes: Routes = [
  {
    path: '',
    component: DetailEmployeeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailEmployeeRoutingModule { }
