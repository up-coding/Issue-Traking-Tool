import { Component, OnInit, Input,Output,EventEmitter,OnChanges } from '@angular/core';
import { Cookie } from 'ng2-cookies';
 

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  userFullName:string;

 constructor() { }

  ngOnInit():void {

    this.userFullName = Cookie.get('receiverName');
  } 

}
