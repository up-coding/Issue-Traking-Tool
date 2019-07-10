import { Component, OnInit, ViewChild } from "@angular/core";
import { Location } from "@angular/common";
import { Cookie } from "ng2-cookies";
import { CKEditorComponent } from "ng2-ckeditor";
import { IssueService } from "src/services/issue.service";
import { AppService } from "src/services/app.service";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-issue-edit",
  templateUrl: "./issue-edit.component.html",
  styleUrls: ["./issue-edit.component.css"],
  providers: [Location]
})
export class IssueEditComponent implements OnInit {
  //adding datatables to the view
  @ViewChild(CKEditorComponent) ckEditor: CKEditorComponent;

  //holds current issuedetails
  public currentIssue: any = <any>{};

  //stors files
  public files: [];
  public assigneeName;
  public assigneeId: string;
  public allAssignee = [];
  public authToken: any;
  public status = ["In-backlog", "In-Progress", "In-Test", "Done"];
  public userStatus: any;

  /**
   * Constructor
   * @param issueService
   * @param appService
   * @param toastr
   * @param router
   * @param location
   * @param _route
   */
  constructor(
    public issueService: IssueService,
    public appService: AppService,
    private toastr: ToastrService,
    public router: Router,
    private location: Location,
    private _route: ActivatedRoute
  ) {}

  /**
   * Get all user details
   * and get current issue details
   */
  ngOnInit() {
    this.authToken = Cookie.get("authToken");
    this.getAllUsersName(this.authToken);
    let myIssueId = this._route.snapshot.paramMap.get("issueId");
    this.issueService.getSingleIssue(myIssueId).subscribe(
      (response: any) => {
        this.currentIssue = response["data"];
      },
      err => {
        this.toastr.error(err);
      }
    );
  }

  //text editor configuration
  ngAfterViewChecked() {
    let editor = this.ckEditor.instance;

    editor.config.height = "200";

    editor.config.toolbarGroups = [
      { name: "document", groups: ["mode", "document", "doctools"] },
      { name: "clipboard", groups: ["clipboard", "undo"] },
      {
        name: "editing",
        groups: ["find", "selection", "spellchecker", "editing"]
      },
      {
        name: "paragraph",
        groups: ["list", "indent", "blocks", "align", "bidi", "paragraph"]
      },
      { name: "basicstyles", groups: ["basicstyles", "cleanup"] },
      { name: "links", groups: ["links"] },
      { name: "styles", groups: ["styles"] },
      { name: "colors", groups: ["colors"] }
    ];
    editor.config.removeButtons = `Anchor,Save,Find,Replace,Scayt,SelectAll,Form,Radio`;
  }

  ngOnDestroy(): void {
    if (this.ckEditor.instance.editor) this.ckEditor.instance.editor.destroy();
  }

  public statusSelected(issueStatus) {
    this.userStatus = issueStatus;
    return this.userStatus;
  }

  public userSelected(id, name) {
    this.assigneeId = id;
    this.assigneeName = name;
    return this.assigneeId && this.assigneeName;
  }

  public getAllUsersName: any = authToken => {
    this.appService.getAllUsers(authToken).subscribe((apiResponse: any) => {
      for (let x in apiResponse.data) {
        let temp = {
          userId: apiResponse.data[x].userId,
          name:
            apiResponse.data[x].firstName + " " + apiResponse.data[x].lastName
        };
        this.allAssignee.push(temp);
      }
    });
  };

  myFiles: string[] = [];
  public onSelected(event) {
    if (event.currentTarget.files.length > 0) {
      const selectedFiles = event.currentTarget.files;
      this.files = selectedFiles;
      for (var i = 0; i < event.target.files.length; i++) {
        this.myFiles.push(event.target.files[i]);
      }
    }
  }

  public editIssue = () => {
    this.issueService
      .editAIssue(this.currentIssue.issueId, this.currentIssue)
      .subscribe(
        (response: any) => {
          this.toastr.success("Issue edited successfully!");
          setTimeout(() => {
            this.router.navigate(["/issue-view", this.currentIssue.issueId]);
          }, 1000);
        },
        err => {
          this.toastr.error("Some error occured");
        }
      );
  };

  public goBackToPreviousPage(): any {
    this.location.back();
  }
}
