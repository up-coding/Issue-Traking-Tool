import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Cookie } from 'ng2-cookies';
import { CKEditorComponent } from 'ng2-ckeditor';
import { FormGroup } from '@angular/forms';
import { IssueService } from 'src/app/issue.service';
import { AppService } from 'src/app/app.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-issue-edit',
  templateUrl: './issue-edit.component.html',
  styleUrls: ['./issue-edit.component.css'],
  providers:[Location]
})
export class IssueEditComponent implements OnInit {

   
   
   
  @ViewChild(CKEditorComponent) ckEditor: CKEditorComponent;
 
  
  
  public currentIssue:any=<any>{};
  
  public files:[] ;
  public assigneeName:[];
  public assigneeId:string;
  public allAssignee = [];
  public authToken:any;
  public status = ['In-backlog','In-Progress','In-Test','Done'];
  public userStatus:any;
  
  
  
  
  constructor(public issueService:IssueService,
    public appService:AppService,
    private toastr:ToastrService,
    public router:Router,
    private location:Location,
    private _route:ActivatedRoute 
    ) { 
    console.log('inside edit issue constructor');
     

  }
  
  ngOnInit() {
    this.authToken = Cookie.get('authToken');
    this.getAllUsersName(this.authToken);

    let myIssueId = this._route.snapshot.paramMap.get('issueId');
    console.log(myIssueId);
    this.issueService.getSingleIssue(myIssueId).subscribe((response:any)=>{
      console.log(response);
      this.currentIssue = response['data'];
      console.log('current issue is'+Object.keys(this.currentIssue));
    }
            
    ,err=>{
        console.log('some error occured');
        console.log(err.errMessage);
    });
    
     
  }

  
  
  ngAfterViewChecked(){
    let editor = this.ckEditor.instance;
    
    editor.config.height = '200';
     
    editor.config.toolbarGroups = [
      {name:'document',groups:['mode','document','doctools']},
      {name:'clipboard',groups:['clipboard','undo']},
      {name:'editing',groups:['find','selection','spellchecker','editing']},
      {name:'paragraph',groups:['list','indent','blocks','align','bidi','paragraph']},
      { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
      { name: 'links', groups: [ 'links' ] },
      { name: 'styles', groups: [ 'styles' ] },
      { name: 'colors', groups: [ 'colors' ] }
    ]; 
    editor.config.removeButtons = `Anchor,Save,Find,Replace,Scayt,SelectAll,Form,Radio`;
  }

  ngOnDestroy(): void {
    if (this.ckEditor.instance.editor) this.ckEditor.instance.editor.destroy();
    console.log('issue-create ondestroy called');
  }

  statusSelected(issueStatus){
    console.log(issueStatus);
    this.userStatus = issueStatus
    return this.userStatus;
 }

  userSelected(id,name){
      
     console.log(id);
     console.log(name);
     this.assigneeId = id;
     this.assigneeName = name;
     return this.assigneeId && this.assigneeName;
  }
   
   


  public getAllUsersName:any = (authToken)=>{
     this.appService.getAllUsers(authToken).subscribe((apiResponse:any)=>{
          console.log(apiResponse);
          for (let x in apiResponse.data) {
          let temp = { 'userId': apiResponse.data[x].userId, 'name': apiResponse.data[x].firstName + ' ' + apiResponse.data[x].lastName  };
              this.allAssignee.push(temp);          
          }
          console.log(this.allAssignee);
        });
  }



  myFiles:string [] = []
  public onSelected(event) {
    console.log(event.currentTarget.files);
    if(event.currentTarget.files.length > 0){
        const selectedFiles = event.currentTarget.files;
        this.files = selectedFiles;
        for (var i = 0; i < event.target.files.length; i++) { 
          this.myFiles.push(event.target.files[i]);
        }
        console.log(this.myFiles);
         
    }
   
    
}

public editIssue = ()=>{
  this.issueService.editAIssue(this.currentIssue.issueId,this.currentIssue).subscribe((data)=>{
           data=>{
             console.log(data);
             this.toastr.success('Issue edited successfully!');
             setTimeout(()=>{
               this.router.navigate(['/issue-view',this.currentIssue.issueId]);
             },1000);
           }
  },(err)=>{
      console.log("Some error occured");
      console.log(err.errMessage);
      this.toastr.error('Some error occured');
  });
}

public goBackToPreviousPage(): any {

  this.location.back();

}

}
