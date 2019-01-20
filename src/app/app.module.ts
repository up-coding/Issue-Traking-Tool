import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ViewChild } from '@angular/core';
import { CKEditorModule } from 'ng2-ckeditor';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IssueDescriptionModule } from './issue-description/issue-description.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { SearchModule } from './search/search.module';
import { UserModule } from './user/user.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { AppService } from './app.service';
import { FileUploadModule, FileSelectDirective } from 'ng2-file-upload';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AuthGuard } from './auth.guard';
 
 

@NgModule({
  declarations: [
    AppComponent,
     
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CKEditorModule,
    FormsModule,
    Ng2SearchPipeModule, 
    ToastrModule.forRoot(),
    IssueDescriptionModule,
    DashboardModule,
    SearchModule,
    UserModule
  ],
  providers: [AppService,AuthGuard],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
