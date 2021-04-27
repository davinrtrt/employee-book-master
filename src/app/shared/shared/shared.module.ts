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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from '../../interceptors/interceptor';
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
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    CommonModule,
    HttpClientModule,
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
    DecimalPipe,

    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true}
  ]
})
export class SharedModule {}
