import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import io from 'socket.io-client'
import { map, catchError } from 'rxjs/operators';
import { Cookie } from 'ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private url = 'http://localhost:3000';

  private socket;
  private authToken;


  constructor(public http: HttpClient) {
     console.log("socket service constructor");
    this.socket = io(this.url);
    this.authToken = Cookie.get('authToken');

  }

  // events to be listened 

  public verifyUser = () => {

    return Observable.create((observer) => {

      this.socket.on('verifyUser', (data) => {

        observer.next(data);

      });  

    });  

  }  

  public getAssignedIssue = () => {

    return Observable.create((observer) => {

      this.socket.on("assigned-issue-list", (issueList) => {
        console.log('inside assigned issue list');
        observer.next(issueList);

      });  

    });  

  }  


  public disconnectedSocket = () => {

    return Observable.create((observer) => {

      this.socket.on("disconnect", () => {

        observer.next();

      });  

    });  



  } 

  // events to be emitted

  public setUser = (authToken) => {

    this.socket.emit("set-user", authToken);

  }  

  public sendComment = (commentObject) => {

    this.socket.emit('comment', commentObject);

  } // end getChatMessage

   


  public exitSocket = () => {


    this.socket.disconnect();


  } 

   public getComments(issueId): Observable<any> {

    return this.http.get(`${this.url}/api/v1/comment/get/for/issue?issueId=${issueId}&authToken=${this.authToken}`)
     .pipe(map(data => console.log('Data Received')),catchError(this.handleError));  
    
    
       

  } // end logout function




  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof Error) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return Observable.throw(errorMessage);

  }

}
