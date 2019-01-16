import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueCreateComponent } from './issue-create/issue-create.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
import { RouterModule ,Routes} from '@angular/router';
import { PersonalizedDashboardComponent } from '../dashboard/personalized-dashboard/personalized-dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { FileUploadModule, FileSelectDirective } from 'ng2-file-upload';
import { HttpClientModule } from '@angular/common/http';
import { IssueViewComponent } from './issue-view/issue-view.component';
import { ToastrModule } from 'ngx-toastr';
import { IssueEditComponent } from './issue-edit/issue-edit.component';
 
 

@NgModule({
  declarations: [IssueCreateComponent, IssueViewComponent, IssueEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
     ReactiveFormsModule,
     HttpClientModule,
     FormsModule,
     ToastrModule.forRoot(),
    CKEditorModule,
    RouterModule.forChild([
      {path:'dashboard',component:PersonalizedDashboardComponent},
      {path:'issue-view/:issueId',component:IssueViewComponent},
      {path:'issue-edit/:issueId',component:IssueEditComponent}
    ])
  ]
})
export class IssueDescriptionModule { }
