import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IssueService } from 'src/app/issue.service';


declare var $: any;
@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit,OnDestroy {
  @ViewChild('dataTable') table: { nativeElement: any; };
  dataTable:any;
  dtOptions:any;
  private routeSub:any;
  query:string;
  allIssueDetails:[];

  constructor(private _route:ActivatedRoute,
    public issueService:IssueService) { }

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

  this.routeSub = this._route.params.subscribe(params=>{
    console.log(params);
    this.query = params['q'];
  });
  console.log(this.allIssueDetails);
  this.getAllIssues();
  
  }

  ngOnDestroy(){
    
    this.routeSub.unsubscribe();
  }

  public getAllIssues = ()=>{
   
     this.issueService.getAllIssues().subscribe(response=>{
          console.log(response);
          this.allIssueDetails = response['data'];
          console.log(this.allIssueDetails);
     },err=>{
          console.log(err.message);
     });
  }

}
