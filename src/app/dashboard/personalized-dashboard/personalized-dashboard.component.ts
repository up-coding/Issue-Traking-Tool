import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { AppService } from 'src/app/app.service';
 
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IssueService } from 'src/app/issue.service';
 


declare var $: any;

@Component({
  selector: 'app-personalized-dashboard',
  templateUrl: './personalized-dashboard.component.html',
  styleUrls: ['./personalized-dashboard.component.css'],
  providers:[ ]
})
export class PersonalizedDashboardComponent implements OnInit {

  @ViewChild('dataTable') table: { nativeElement: any; };
  dataTable:any;
  dtOptions:any; 

  public authToken:any;
  public userInfo:any;
  public receiverId:any;
  public receiverName:any;
  public issueList: any;
  public userList = [];
  public disconnectedSocket:boolean;

  constructor(public appSevice:AppService,
    
    public issueService:IssueService,
    public router:Router,
    private toastr:ToastrService) { 
      console.log('dashboard constructor');
      this.receiverId = Cookie.get('receiverId');
      this.receiverName = Cookie.get('receiverName');
    }

  ngOnInit() {
    this.dtOptions = {
        "paging":   true,
        "ordering": true,
        "info":     false,
        "searching": false,
        "bPaginate": false,
        "bLengthChange": false,
        
    };
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.dataTable(this.dtOptions);

    this.authToken = Cookie.get('authToken');
    this.userInfo = this.appSevice.getUserInfoFromLocalStorage();
    console.log(this.userInfo);
    //this.checkStatus();
    //this.verifyUserConfirmation();
    console.log('inside dashboard oninit');
    this.getAllIssue();
   //this.getOnlineUserList();
    //this.getUserInfo();
  }


   public getAllIssue = ()=>{
        return this.issueService.getAllIssues(this.authToken).subscribe((apiResponse)=>{
            console.log('inside dashbord getAllIssue');
            console.log(apiResponse);
             
             
        },
        (err)=>{
             console.log(err);
        });
   }

   /* public getAssignedIssueForUser = (receiverId)=>{
     this.socketService.getIssueById(receiverId).subscribe((data)=>{
           this.issueList = data;
           return this.issueList;
     });
   } */

   /* public getUserInfo = () => {
       this.authToken = Cookie.get('authToken');
       this.userInfo = this.appSevice.getUserInfoFromLocalStorage();
       this.receiverId = this.userInfo.userId;
       //this.getAssignedIssueForUser(this.receiverId);
   } */

   public checkStatus:any  = ()=>{
     if(Cookie.get('authToken') === undefined || Cookie.get('authToken') === '' || Cookie.get('authToken') === null){
         this.router.navigate(['/']);
         return false;
     }else{
       return true;
     }

   }

   /* public verifyUserConfirmation:any = ()=>{
       this.socketService.verifyUser().subscribe((data)=>{
          this.disconnectedSocket = false;
          this.socketService.setUser(this.authToken);
          //this.getOnlineUserList();
       });
   } */

  /*  public getOnlineUserList:any = () =>{
      this.socketService.onlineUserList().subscribe((userList)=>{
         this.userList = [];
         for(let x in userList){
           let temp = {'userId':x,'name':userList[x],'unread':0,'chatting':false};
           this.userList.push(temp);

         }
         console.log(this.userList);
      });
   } */

}
