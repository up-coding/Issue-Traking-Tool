import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalizedDashboardComponent } from './personalized-dashboard/personalized-dashboard.component';
import { RouterModule } from '@angular/router';
 
import { SharedModule } from '../shared/shared.module';
import { SearchBoxComponent } from '../search/search-box/search-box.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { IssueCreateComponent } from '../issue-description/issue-create/issue-create.component';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from '../auth.guard';
 

@NgModule({
  declarations: [PersonalizedDashboardComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SharedModule,
    FormsModule,
    RouterModule.forChild([
      {path:'search',component:SearchBoxComponent,canActivate:[AuthGuard]},
      {path:'issue',component:IssueCreateComponent,canActivate:[AuthGuard]},
      {path:'issue-view/:issueId',component:IssueCreateComponent}
    ])
  ],
  providers:[AuthGuard]
})
export class DashboardModule { }
