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
  
  
  
  
  constructor(public issueService:IssueService,
    public appService:AppService,
    private toastr:ToastrService,
    private _route:ActivatedRoute,
    public router:Router 
    ) { 
    console.log('inside create issue constructor');
     

  }
  
  ngOnInit() {
    this.authToken = Cookie.get('authToken');
    this.reporterId = Cookie.get('receiverId');
    this.reporterName = Cookie.get('receiverName');
    console.log("user id" + this.reporterId);
    console.log("user id" + this.reporterName);
    this.getAllUsersName(this.authToken);

     
  }

  ngOnDestroy(): void {
    if (this.ckEditor.instance.editor) this.ckEditor.instance.editor.destroy();
    console.log('issue-create ondestroy called');
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
  

  

  




public onSubmit = ()=>{
    
    
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
      console.log(apiResponse);
      if(apiResponse.status === 200){
         this.toastr.success('Issue created successfully!');
         setTimeout(()=>{  
           console.log(apiResponse.data.issueId);
          this.router.navigate(['/issue-view',apiResponse.data.issueId]);
        }, 1000)
          
      }else{
        this.toastr.error('Something wrong!');
      }

    },(err)=>{
       this.toastr.error('error occured');
    }); 


     
    





 } 
}

