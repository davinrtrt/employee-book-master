import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUpdateEmployeeComponent } from './add-update-employee.component';

const routes: Routes = [
  {
    path: '',
    component: AddUpdateEmployeeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddUpdateEmployeeRoutingModule { }
