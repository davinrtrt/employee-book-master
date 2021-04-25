import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'home/:username',
    loadChildren: () => import('./pages/detail-employee/detail-employee.module').then(m => m.DetailEmployeeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'add-update-employee',
    loadChildren: () => import('./pages/add-update-employee/add-update-employee.module').then(m => m.AddUpdateEmployeeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'add-update-employee/:username',
    loadChildren: () => import('./pages/add-update-employee/add-update-employee.module').then(m => m.AddUpdateEmployeeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  { //invalid route redirects to 'page not found'
    path: '**',
    loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
