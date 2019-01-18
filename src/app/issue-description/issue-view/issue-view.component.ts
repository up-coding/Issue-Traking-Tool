import { Component, OnInit } from '@angular/core';
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

  public currentIssue;
  public commentArea;
  public commentList;
  public issueId;
  constructor(private _route: ActivatedRoute,
     private router: Router, 
     private issueService: IssueService, 
     private socketService:SocketService,
     private appService: AppService, 
     private location: Location,
     
     private toastr: ToastrService) {
     console.log('inside issue-view constructor');
}


  ngOnInit() {
     this.issueId = this._route.snapshot.paramMap.get('issueId');
    console.log(this.issueId)
    
    this.issueService.getSingleIssue(this.issueId).subscribe(

      data => {
        console.log(data);
        this.currentIssue = data["data"];

      },
      error => {
        console.log("some error occured");
        console.log(error.errorMessage)
      }


    )
    this.getPreviousComments();
  }

  public sendCommentUsingKeypress: any = (event: any) => {

    if (event.keyCode === 13) { // 13 is keycode of enter.

      this.postComment();

    }

  } // end sendMessageUsingKeypress

  public postComment: any = () => {

    if(this.commentArea){

      let commentMessage = {
          
          issueId:this.issueId,
          senderName: Cookie.get('receiverName'),
          senderId: Cookie.get('receiverId'),
          comment: this.commentArea,
          createdOn: new Date()
        
         
      }  
      console.log(commentMessage);
      this.socketService.sendComment(commentMessage)
  }
    else{
      this.toastr.warning('text message can not be empty')

    }

  }  


  public getPreviousComments :any = ()=>{
     
    
    this.socketService.getComments(this.issueId)
    .subscribe((apiResponse) => {

      console.log(apiResponse);

      if (apiResponse.status == 200) {

        this.commentList = apiResponse.data;
        console.log("messagelist")
        console.log(this.commentList)

      }  
     }, (err) => {

      this.toastr.error('some error occured')


    });

  }// end get previous chat with any user
  public goBackToPreviousPage(): any {

    this.location.back();

    } 

    
  

}
