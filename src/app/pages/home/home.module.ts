import { NgModule } from '@angular/core';
import { GeneralPipe } from '../../pipelines/general.pipe';
import { SharedModule } from '../../shared/shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
