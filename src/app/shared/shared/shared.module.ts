import {  NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { GeneralPipe } from '../../pipelines/general.pipe';
import { WarningComponent } from '../../dialogs/warning/warning.component';
import { registerLocaleData } from '@angular/common';
import localeId from '@angular/common/locales/id';
import { EmployeeService } from '../../services/employee.service';
import { SnackbarService } from '../../services/snackbar.service';
import { AuthGuard } from '../../services/auth.guard';
import { AuthService } from '../../services/auth.service';
registerLocaleData(localeId);

@NgModule({
  declarations: [
    WarningComponent,
    // HeaderComponent,

    GeneralPipe,
  ],
  entryComponents: [
    WarningComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    
    GeneralPipe,
  ],
  providers: [
    AuthGuard,
    AuthService,
    EmployeeService,
    SnackbarService,
    DecimalPipe
  ]
})
export class SharedModule {}
