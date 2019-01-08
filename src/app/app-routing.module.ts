import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { PersonalizedDashboardComponent } from './dashboard/personalized-dashboard/personalized-dashboard.component';
import { IssueCreateComponent } from './issue-description/issue-create/issue-create.component';
import { SearchBoxComponent } from './search/search-box/search-box.component';
import { AppComponent } from './app.component';

const routes: Routes = [
   
  {path:'login',component:LoginComponent},
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'issue',component:IssueCreateComponent},
  {path:'search',component:SearchBoxComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
