import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
   private firstName:string;
   private lastName:string;
   private email:string;
   private mobileNumber:Number;
   private password:string;

   constructor(private appService:AppService,private router:Router,private toastr:ToastrService){}

   ngOnInit(){}

  public goToLogIn:any = () => {
      this.router.navigate(['/']);
  }

  public signUpFunction:any = () =>{
        let newUserObj = {
          firstName:this.firstName,
          lastName:this.lastName,
          mobileNumber:this.mobileNumber,
          email:this.email,
          password:this.password,

        };
       this.appService.signupFunction(newUserObj).subscribe((apiResponse)=>{
           if(apiResponse.status === 200){
              this.toastr.success('You have signed up successfully!Please login to continew..','Welcome');
              setTimeout(()=>{
                this.goToLogIn();
              },2000);
           }else{
             this.toastr.error(apiResponse.message);
           }
        },
        (err)=>{
             this.toastr.error('Some error occured,Please try after sometime!','Oops');
        });
      }
  }


