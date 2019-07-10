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

@NgModule({
  declarations: [
    PersonalizedDashboardComponent,
    RootComponent,
    IssueCreateComponent,
    IssueEditComponent,
    IssueViewComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SharedModule,
    FormsModule
  ],
  providers: [AuthGuard]
})
export class DashboardModule {}
