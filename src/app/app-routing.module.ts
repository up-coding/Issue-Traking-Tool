import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PersonalizedDashboardComponent } from './personalized-dashboard/personalized-dashboard.component';
import { IssueDescriptionComponent } from './issue-description/issue-description.component';
import { SearchComponent } from './search/search.component';
import { AppComponent } from './app.component';

const routes: Routes = [
   
  {path:'login',component:LoginComponent},
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'dashboard',component:PersonalizedDashboardComponent},
  {path:'issue',component:IssueDescriptionComponent},
  {path:'search',component:SearchComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
