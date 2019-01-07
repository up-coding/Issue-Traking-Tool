import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueCreateComponent } from './issue-create/issue-create.component';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
import { RouterModule ,Routes} from '@angular/router';
import { PersonalizedDashboardComponent } from '../dashboard/personalized-dashboard/personalized-dashboard.component';

@NgModule({
  declarations: [IssueCreateComponent],
  imports: [
    CommonModule,
    FormsModule,
    CKEditorModule,
    RouterModule.forChild([
      {path:'dashboard',component:PersonalizedDashboardComponent},
    ])
  ]
})
export class IssueDescriptionModule { }
