import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from '../auth.guard';
 
 


@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot(),
    RouterModule.forChild([
      {path:'signup',component:SignupComponent},
      {path:'logout',component:LogoutComponent,canActivate:[AuthGuard]}
    ])
  ],
  providers:[AuthGuard]
})
export class UserModule { }
