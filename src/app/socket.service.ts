import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import io from 'socket.io-client'
import { Cookie } from 'ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private url = 'http://localhost:3000';

  private socket;
  private authToken;


  constructor(public http: HttpClient) {
    this.socket = io(this.url);
    this.authToken = Cookie.get('authToken');

  }

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
            observer.next(issueList);
        });  
     });  
  } 
  
  public loadComments = ()=>{
    return Observable.create((observer)=>{
      this.socket.on('load-comments',(commentList)=>{
           observer.next(commentList);
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

public setUser = (authToken) => {
   this.socket.emit("set-user", authToken);
}  

public sendComment = (commentObject) => {
    this.socket.emit('comment', commentObject);
}
  
public setAsWatcher = (newWatcher) => {
   this.socket.emit('watcher', newWatcher);

}

public exitSocket = () => {
   this.socket.disconnect();
} 

public getComments(issueId): Observable<any> {
    return this.http.get(`${this.url}/api/v1/comment/get/for/issue?issueId=${issueId}&authToken=${this.authToken}`);  
}  

public getWatchers(issueId): Observable<any> {
    return this.http.get(`${this.url}/api/v1/watch/get/for/issue?issueId=${issueId}&authToken=${this.authToken}`);  
}


}
