import { Component, OnInit, Input,Output,EventEmitter,OnChanges } from '@angular/core';

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }
 
 /*  @Input() userFirstName:string;
  @Input() userLastName:string;

  public firstChar:string;
  public lastChar:string;
  public mergeChar:string;
  constructor() { }

  ngOnInit():void {
    this.firstChar = this.userFirstName[0];
    this.lastChar = this.userFirstName[0];
    this.mergeChar = this.firstChar + this.lastChar;
  } */

}
