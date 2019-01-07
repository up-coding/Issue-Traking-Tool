import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalizedDashboardComponent } from './personalized-dashboard/personalized-dashboard.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../user/login/login.component';

@NgModule({
  declarations: [PersonalizedDashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'login',component:LoginComponent},
    ])
  ]
})
export class DashboardModule { }
