import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IssueService } from 'src/app/issue.service';
import { AppService } from 'src/app/app.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common'
import { Cookie } from 'ng2-cookies';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-issue-view',
  templateUrl: './issue-view.component.html',
  styleUrls: ['./issue-view.component.css'],
  providers:[Location]
})
export class IssueViewComponent implements OnInit {
  
  public currentIssue:any;
  public commentArea;
  public commentList;
  public issueId;
  public watcherList: any;

  /**
   * Constructor
   * @param _route 
   * @param router 
   * @param issueService 
   * @param socketService 
   * @param appService 
   * @param location 
   * @param toastr 
   */
  constructor(private _route: ActivatedRoute,
     private router: Router, 
     private issueService: IssueService, 
     private socketService:SocketService,
     private appService: AppService, 
     private location: Location,
     private toastr: ToastrService) {
      
}

 ngOnInit() {
     this.issueId = this._route.snapshot.paramMap.get('issueId');
     this.issueService.getSingleIssue(this.issueId).subscribe(response=>{
         this.currentIssue = response.data;
     },
      error => {
        console.log(error.errorMessage)
      }
    )
    this.getPreviousComments();
   
  }

  public sendCommentUsingKeypress: any = (event: any) => {
      if (event.keyCode === 13) {
         this.postComment();
       }
  } 

  public postComment: any = () => {
        if(this.commentArea){
          let commentMessage = {
          issueId:this.issueId,
          senderName: Cookie.get('receiverName'),
          senderId: Cookie.get('receiverId'),
          comment: this.commentArea,
          createdOn: new Date()
        }  
      this.socketService.sendComment(commentMessage)
  }
    else{
      this.toastr.warning('text message can not be empty')
    }
}  

public addWatcher: any = () => {
    let newWatcher = {
          issueId:this.issueId,
          watcherName: Cookie.get('receiverName'),
          watcherId: Cookie.get('receiverId'),
          createdOn: new Date()
    }  
      this.socketService.setAsWatcher(newWatcher);
  } 


 public getPreviousComments :any = ()=>{
     this.socketService.getComments(this.issueId)
         .subscribe(response => {
            this.commentList = response.data;
           this.getWatcherList();
        }, (err) => {
           this.toastr.error('some error occured')
      });
     }

     public getWatcherList :any = ()=>{
    this.socketService.getWatchers(this.issueId)
        .subscribe(response => {
         this.watcherList = response.data;
      }, (err) => {
     this.toastr.error('some error occured')
    });

 }
  
 public goBackToPreviousPage(): any {
     this.location.back();
 } 

    
  

}
