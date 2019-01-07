import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-personalized-dashboard',
  templateUrl: './personalized-dashboard.component.html',
  styleUrls: ['./personalized-dashboard.component.css']
})
export class PersonalizedDashboardComponent implements OnInit {

  @ViewChild('dataTable') table: { nativeElement: any; };
  dataTable:any;
  dtOptions:any; 

  constructor() { }

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
  }

}
