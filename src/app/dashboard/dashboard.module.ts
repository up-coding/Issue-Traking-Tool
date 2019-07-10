import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PersonalizedDashboardComponent } from "./personalized-dashboard/personalized-dashboard.component";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { FormsModule } from "@angular/forms";
import { AuthGuard } from "../../services/auth.guard";
import { RootComponent } from "./root/root.component";
import { SearchBoxComponent } from "./search/search-box/search-box.component";
import { IssueCreateComponent } from "./issue-description/issue-create/issue-create.component";

@NgModule({
  declarations: [PersonalizedDashboardComponent, RootComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SharedModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: "search",
        component: SearchBoxComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "issue",
        component: IssueCreateComponent,
        canActivate: [AuthGuard]
      },
      { path: "issue-view/:issueId", component: IssueCreateComponent }
    ])
  ],
  providers: [AuthGuard]
})
export class DashboardModule {}
