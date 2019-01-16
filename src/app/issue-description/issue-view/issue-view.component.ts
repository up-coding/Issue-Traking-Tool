import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IssueService } from 'src/app/issue.service';
import { AppService } from 'src/app/app.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common'

@Component({
  selector: 'app-issue-view',
  templateUrl: './issue-view.component.html',
  styleUrls: ['./issue-view.component.css'],
  providers:[Location]
})
export class IssueViewComponent implements OnInit {

  public currentIssue;
  constructor(private _route: ActivatedRoute,
     private router: Router, 
     private issueService: IssueService, 
     private appService: AppService, 
     private location: Location, private toastr: ToastrService) {
     console.log('inside issue-view constructor');
}


  ngOnInit() {
    let issueId = this._route.snapshot.paramMap.get('issueId');
    console.log(issueId)
    //this.currentBlog = this.blogService.getSingleBlog(myBlogId);
    this.issueService.getSingleIssue(issueId).subscribe(

      data => {
        console.log(data);
        this.currentIssue = data["data"];

      },
      error => {
        console.log("some error occured");
        console.log(error.errorMessage)
      }


    )
  }

  public goBackToPreviousPage(): any {

    this.location.back();

    } 

  /* deleteThisBlog(): any {

    this.blogHttpService.deleteBlog(this.currentBlog.blogId).subscribe(

      data => {
        console.log(data);
        this.toastr.success('Blog Deleted successfully', 'Success!');
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1000)

      },
      error => {
        console.log("some error occured");
        console.log(error.errorMessage);
        this.toastr.error('Some error occured', 'Error');
      }


    ) 

    


  }// en */  
  

}
