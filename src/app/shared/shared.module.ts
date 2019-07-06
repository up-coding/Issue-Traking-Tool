import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserDetailsComponent } from "./user-details/user-details.component";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { AuthGuard } from "../auth.guard";

@NgModule({
  declarations: [UserDetailsComponent],
  imports: [CommonModule, FormsModule, RouterModule.forChild([])],
  exports: [UserDetailsComponent, CommonModule],
  providers: [AuthGuard]
})
export class SharedModule {}
