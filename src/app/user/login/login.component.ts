import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  public email:string;
  public password:string;

  constructor(private toastr:ToastrService,
    public appService:AppService,
    public router:Router,
    ) { }

  ngOnInit() {
  }

  public goToSignUp:any = ()=>{
     this.router.navigate(['/signup']);
  }

  public signInFunction:any = ()=>{
    console.log('sign in function');
    if(!this.email){
      this.toastr.warning('enter email');
    }else if(!this.password){
      ;
      console.log(this.toastr.warning('enter password'));
    }else{
      let data = {
        email:this.email,
        password:this.password
      };

      this.appService.signInFunction(data).subscribe((apiResponse)=>{
        if(apiResponse.status === 200){
           console.log(apiResponse);

           Cookie.set('authToken',apiResponse.data.authToken);
           Cookie.set('receiverId',apiResponse.data.userDetails.userId);
           Cookie.set('receiverName',apiResponse.data.userDetails.firstName + ' '+ apiResponse.data.userDetails.lastName);
           this.appService.setUserInfoToLocalStorage(apiResponse.data.userDetails);
           this.router.navigate(['/dashboard']);
          }else{
          this.toastr.error(apiResponse.message);
        }
      },
      (err)=>{
         this.toastr.error('some error occured');
      });
    }
  }

}
