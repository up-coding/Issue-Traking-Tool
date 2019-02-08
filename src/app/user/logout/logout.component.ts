import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Cookie } from 'ng2-cookies';
import { SocketService } from 'src/app/socket.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private appService:AppService,private socketService:SocketService,private router:Router,private toastr:ToastrService){}

  ngOnInit() {
       this.signOut();
  }

  public signOut: any = () => {
      this.appService.signOutFunction().subscribe((apiResponse) => {
          if (apiResponse.status === 200) {
          Cookie.delete('authToken');
          Cookie.delete('receiverId');
          Cookie.delete('receiverName');
          this.socketService.exitSocket()
          this.router.navigate(['/']);
          }else {
          this.toastr.error(apiResponse.message)}
      }, (err) => {
          this.toastr.error('Unable to logout!','Error')
      });
   }  
}
