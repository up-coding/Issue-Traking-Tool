import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cookie } from 'ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  private url = 'http://localhost:3000/api/v1';
   
  private authToken = Cookie.get('authToken');
  
  constructor(public httpClient:HttpClient) { 
   
  }

  public createAIssue = (data):Observable<any>=>{
    let options = new HttpHeaders();
    options.append('content-type','multipart/formdata');
    return this.httpClient.post(`${this.url}/issues/createIssue?authToken=${this.authToken}`,data);
  }

  public getAllIssues = () :Observable<any>=>{
     return this.httpClient.get(`${this.url}/issues/view/all?authToken=${this.authToken}`);
  }

  public getSingleIssue = (issueId):Observable<any>=>{
    
    return  this.httpClient.get(`${this.url}/issues/${issueId}/details?authToken=${this.authToken}`);
  }

  public editAIssue = (issueId,data):Observable<any>=>{
     return this.httpClient.put(`${this.url}/issues/${issueId}/edit?authToken=${this.authToken}`,data);
  }

  public deleteAIssue = (issueId)=>{
     let data = {};
     return this.httpClient.post(`${this.url}/issues/${issueId}/delete`,data);
  }

 
}
