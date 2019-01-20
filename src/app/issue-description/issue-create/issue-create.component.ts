import { Component, OnInit,ViewChild, EventEmitter, OnDestroy } from '@angular/core';
import { CKEditorComponent } from 'ng2-ckeditor';
import { Location } from '@angular/common'; 
import { ToastrService } from 'ngx-toastr';
import { Cookie } from 'ng2-cookies';
import { IssueService } from 'src/app/issue.service';
import { AppService } from 'src/app/app.service';
import { FormBuilder,FormGroup} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
 

 
 
 

 
@Component({
  selector: 'app-issue-description',
  templateUrl: './issue-create.component.html',
  styleUrls: ['./issue-create.component.css'],
  providers:[Location]
})

export class IssueCreateComponent implements OnInit,OnDestroy {
  
   
   
  @ViewChild(CKEditorComponent) ckEditor: CKEditorComponent;
 
  issueForm:FormGroup;

  public title:string;
  public description:any;
  public files:[] ;
  public reporterId:string;
  public reporterName:string;
  public assigneeName:[];
  public assigneeId:string;
  public allAssignee = [];
  public authToken:any;
  public status = ['In-backlog','In-Progress','In-Test','Done'];
  public userStatus:any;
  public currentIssue;
  private myFiles:string [] = [];
  
  constructor(public issueService:IssueService,
    public appService:AppService,
    private toastr:ToastrService,
    private _route:ActivatedRoute,
    public router:Router,
    private location:Location 
    ) {}
  
  ngOnInit() {
    this.authToken = Cookie.get('authToken');
    this.reporterId = Cookie.get('receiverId');
    this.reporterName = Cookie.get('receiverName');
    this.getAllUsersName(this.authToken);
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

  public selectStatus(issueStatus){
    this.userStatus = issueStatus
    return this.userStatus;
 }

  public selectUser(id,name){
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



  
  public onSelected(event) {
    if(event.currentTarget.files.length > 0){
        const selectedFiles = event.currentTarget.files;
        this.files = selectedFiles;
        for (var i = 0; i < event.target.files.length; i++) { 
          this.myFiles.push(event.target.files[i]);
        }
    }
  }
  
public onSubmit = ()=>{
    if(!this.title){
      this.toastr.warning('Title required!');
    }else if(!this.description){
      this.toastr.warning('Description required!');
    }else if(!this.assigneeName){
      this.toastr.warning('Select assignee!');
    }else if(!this.status){
      this.toastr.warning('Select status!');
    }
    const formData = new FormData();
    for (var i = 0; i < this.myFiles.length; i++) { 
      formData.append("files", this.myFiles[i]);
    }
    formData.append('title',this.title);
    formData.append('description',this.description);
    formData.append('status',this.userStatus);
    formData.append('reporterId',this.reporterId);
    formData.append('assigneeId',this.assigneeId);
    formData.append('reporterName',this.reporterName);
    formData.append('assigneeName',JSON.stringify(this.assigneeName));
    this.issueService.createAIssue(formData).subscribe((apiResponse)=>{
    if(apiResponse.status === 200){
         this.toastr.success('Issue created successfully!','Success!');
         setTimeout(()=>{  
            this.router.navigate(['/issue-view',apiResponse.data.issueId]);
        }, 1000)
    }else{this.toastr.error(apiResponse.message,'Error');}
    },(err)=>{
       this.toastr.error('Something wrong happened!','Error');
    }); 
} 

 public goBack = ()=>{
   this.location.back();
 }

 ngOnDestroy(): void {
  if (this.ckEditor.instance.editor) this.ckEditor.instance.editor.destroy();
   
}
}

