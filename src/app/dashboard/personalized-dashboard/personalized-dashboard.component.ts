import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Cookie } from "ng2-cookies";
import { AppService } from "src/app/app.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { IssueService } from "src/app/issue.service";
import { SocketService } from "src/app/socket.service";

declare var $: any;

@Component({
  selector: "app-personalized-dashboard",
  templateUrl: "./personalized-dashboard.component.html",
  styleUrls: ["./personalized-dashboard.component.css"],
  providers: []
})
export class PersonalizedDashboardComponent implements OnInit {
  /**
   * Allow component to add datatable to
   * the view
   */
  @ViewChild("dataTable") table: { nativeElement: any };
  dataTable: any;
  dtOptions: any;

  //authToken of a user
  public authToken: any;

  //contains user information
  public userInfo: any;

  //contains user id
  public receiverId: any;

  //contains user name
  public receiverName: any;

  //contains All assignedissue to a perticular user
  public allAssignedIssue: any;
  public list = [];
  public disconnectedSocket: boolean;
  public q: string;
  public res: any;
  public allIssueDetails: any;
  public assigneeId: any;
  public newList: any[];

  /**
   * constructor
   * @param appSevice
   * @param socketService
   * @param issueService
   * @param router
   * @param toastr
   */
  constructor(
    public appSevice: AppService,
    public socketService: SocketService,
    public issueService: IssueService,
    public router: Router,
    private toastr: ToastrService
  ) {
    this.receiverId = Cookie.get("receiverId");
    this.receiverName = Cookie.get("receiverName");
  }

  /**
   * method to navigate search
   * query to search view
   */
  public submitSearch() {
    let query = this.q;
    if (query) {
      this.router.navigate(["/search", { q: query }]);
    }
  }

  /**
   * Initializing datatable to
   * the view
   */
  ngOnInit() {
    this.dtOptions = {
      paging: true,
      ordering: true,
      info: false,
      searching: false,
      bPaginate: false,
      bLengthChange: false
    };
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.dataTable(this.dtOptions);
    this.authToken = Cookie.get("authToken");
    this.userInfo = this.appSevice.getUserInfoFromLocalStorage();
    this.verifyUserConfirmation();
    this.getAllIssues();
  }

  /**
   * Get all issue for the
   * logged in user
   */
  public getAllIssues = () => {
    this.issueService.getAllIssues().subscribe(
      response => {
        if (response.data) {
          this.allIssueDetails = response.data;

          for (let x in this.allIssueDetails) {
            this.assigneeId = this.allIssueDetails[x].assigneeId;
            console.log(this.allIssueDetails[x]);
            if (this.receiverId === this.assigneeId) {
              this.list[x] = this.allIssueDetails[x];
            }
          }
          this.newList = this.list.filter(value => {
            Object.keys(value).length !== 0;
          });
        }
      },
      err => {
        this.toastr.error("Some error occured");
      }
    );
  };

  /**
   * Verify user
   */
  public verifyUserConfirmation: any = () => {
    this.socketService.verifyUser().subscribe(data => {
      this.disconnectedSocket = false;
      this.socketService.setUser(this.authToken);
    });
  };

  /**Redirect to create new issue */
  public createNewIssue = () => {
    this.router.navigate(["/issue"]);
  };
}
