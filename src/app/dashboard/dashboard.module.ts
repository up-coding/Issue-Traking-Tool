import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PersonalizedDashboardComponent } from "./personalized-dashboard/personalized-dashboard.component";
import { SharedModule } from "../shared/shared.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { FormsModule } from "@angular/forms";
import { AuthGuard } from "../../services/auth.guard";
import { RootComponent } from "./root/root.component";
import { IssueCreateComponent } from "./issue-description/issue-create/issue-create.component";
import { IssueEditComponent } from "./issue-description/issue-edit/issue-edit.component";
import { IssueViewComponent } from "./issue-description/issue-view/issue-view.component";
import { SearchBoxComponent } from "./search-box/search-box.component";
import { CKEditorModule } from "ng2-ckeditor";
import { Ng2SearchPipeModule } from "ng2-search-filter";

@NgModule({
  declarations: [
    PersonalizedDashboardComponent,
    RootComponent,
    IssueCreateComponent,
    IssueEditComponent,
    IssueViewComponent,
    SearchBoxComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CKEditorModule,
    Ng2SearchPipeModule,
    SharedModule,
    FormsModule
  ],
  providers: [AuthGuard]
})
export class DashboardModule {}
