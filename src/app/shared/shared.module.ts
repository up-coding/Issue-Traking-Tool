import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './user-details/user-details.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LogoutComponent } from '../user/logout/logout.component';
import { AuthGuard } from '../auth.guard';
 

@NgModule({
  declarations: [UserDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {path:'logout',component:LogoutComponent,canActivate:[AuthGuard]}])
  ],
  exports:[UserDetailsComponent
  ,CommonModule,
  
  ]
  ,providers:[AuthGuard]
})
export class SharedModule { }
