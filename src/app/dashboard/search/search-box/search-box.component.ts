import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IssueService } from "src/services/issue.service";
import { ToastrService } from "ngx-toastr";

declare var $: any;
@Component({
  selector: "app-search-box",
  templateUrl: "./search-box.component.html",
  styleUrls: ["./search-box.component.css"]
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  /**
   * Adding datatable to the view
   */
  @ViewChild("dataTable") table: { nativeElement: any };
  public dataTable: any;
  public dtOptions: any;
  public routeSub: any;
  public query: string;
  public allIssueDetails: [];

  /**
   * Constructor
   * @param _route
   * @param issueService
   * @param toastr
   */
  constructor(
    private _route: ActivatedRoute,
    public issueService: IssueService,
    private toastr: ToastrService
  ) {}

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
    this.routeSub = this._route.params.subscribe(params => {
      this.query = params["q"];
    });
    this.getAllIssues();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  public getAllIssues = () => {
    this.issueService.getAllIssues().subscribe(
      response => {
        this.allIssueDetails = response["data"];
      },
      err => {
        this.toastr.error("some error occured");
      }
    );
  };
}
