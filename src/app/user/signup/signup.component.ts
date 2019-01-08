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
  
   public firstName:string;
   public lastName:string;
   public email:string;
   public mobileNumber:Number;
   public password:string;


  constructor(
    public appService:AppService,
    public router:Router,
    private toastr:ToastrService) { }

   ngOnInit() {
    }


  public goToLogIn:any = () => {
      this.router.navigate(['/']);
  }

  public signUpFunction:any = () =>{
      if(!this.firstName){
          this.toastr.warning('Please enter First Name!');
      }else if(!this.lastName){
        this.toastr.warning('Please enter Last Name!');

      }else if(!this.email){
        this.toastr.warning('Please enter Email!');

      }else if(!this.mobileNumber){
        this.toastr.warning('Please enter Mobile Number!');

      }else if(!this.password){
        this.toastr.warning('Please enter Password!');

      }else {
        let data = {
          firstName:this.firstName,
          lastName:this.lastName,
          mobileNumber:this.mobileNumber,
          email:this.email,
          password:this.password,

        };
        console.log(data);

        this.appService.signupFunction(data).subscribe((apiResponse)=>{
           console.log(apiResponse);
           if(apiResponse.status === 200){
              this.toastr.success('You have signed up successfully!');
              setTimeout(()=>{
                this.goToLogIn();
              },2000);
           }else{
             this.toastr.error(apiResponse.errorMessage);
           }
        },
        (err)=>{
             this.toastr.error('Some error occured,Please try again!');
        });
      }
  }

  

}
