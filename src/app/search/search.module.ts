import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBoxComponent } from './search-box/search-box.component';
import { SharedModule } from '../shared/shared.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { RouterModule } from '@angular/router';
import { IssueCreateComponent } from '../issue-description/issue-create/issue-create.component';
import { IssueViewComponent } from '../issue-description/issue-view/issue-view.component';
import { AuthGuard } from '../auth.guard';
 

@NgModule({
  declarations: [SearchBoxComponent],
  imports: [
    CommonModule,
    SharedModule,
    Ng2SearchPipeModule,
    RouterModule.forChild([
       {path:'issue-view/:issueId',component:IssueViewComponent,canActivate:[AuthGuard]}
    ])
  ],
  providers:[AuthGuard]
})
export class SearchModule { }
