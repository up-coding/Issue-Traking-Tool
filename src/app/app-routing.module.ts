import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./user/login/login.component";
import { AuthGuard } from "../services/auth.guard";
import { IssueCreateComponent } from "./dashboard/issue-description/issue-create/issue-create.component";
import { SearchBoxComponent } from "./dashboard/search/search-box/search-box.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "issue", component: IssueCreateComponent, canActivate: [AuthGuard] },
  { path: "search", component: SearchBoxComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
