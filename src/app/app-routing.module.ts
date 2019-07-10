import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./user/login/login.component";
import { AuthGuard } from "../services/auth.guard";
import { IssueCreateComponent } from "./dashboard/issue-description/issue-create/issue-create.component";
import { SignupComponent } from "./user/signup/signup.component";
import { RootComponent } from "./dashboard/root/root.component";
import { SearchBoxComponent } from "./dashboard/search-box/search-box.component";
import { PersonalizedDashboardComponent } from "./dashboard/personalized-dashboard/personalized-dashboard.component";
import { IssueEditComponent } from "./dashboard/issue-description/issue-edit/issue-edit.component";

const routes: Routes = [
  { path: "signup", component: SignupComponent },
  { path: "login", component: LoginComponent },
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "root",
    component: RootComponent,
    children: [
      {
        path: "dashboard",
        component: PersonalizedDashboardComponent
      },
      {
        path: "create",
        component: IssueCreateComponent
      },
      {
        path: "search",
        component: SearchBoxComponent
      },
      { path: "view/:issueId", component: IssueCreateComponent },
      { path: "edit/:issueId", component: IssueEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
