import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Cookie } from 'ng2-cookies';
import { Router } from '@angular/router';
 



@Injectable({
  providedIn: 'root'
})
export class AppService {
  
  private url = 'http://localhost:3000/api/v1';

  constructor(public httpClient:HttpClient,public router:Router) { }

  public getUserInfoFromLocalStorage = ()=>{
    return JSON.parse(localStorage.getItem('userInfo'));
  }

  public getUrl = ()=>{
    return this.url;
  }

  public setUserInfoToLocalStorage = (data) =>{
    localStorage.setItem('useInfo',JSON.stringify(data));
  }

  public signupFunction = (data):Observable<any>=>{
      const params = new HttpParams()
      .set('firstName',data.firstName)
      .set('lastName',data.lastName)
      .set('mobileNumber',data.mobileNumber)
      .set('email',data.email)
      .set('password',data.password);
      return  this.httpClient.post(`${this.url}/users/signup`,params);
  }

  public signInFunction = (data):Observable<any>=>{
      const params = new HttpParams()
      .set('email',data.email)
      .set('password',data.password);
      return this.httpClient.post(`${this.url}/users/login`,params);
  }

  public getAllUsers = (data)=>{
     return this.httpClient.get(`${this.url}/users/view/all?authToken=${data}`);
  }
  public getSingleUser = (data):Observable<any>=>{
     const params = new HttpParams()
     .set('userId',data.userId);
     return this.httpClient.get(`${this.url}/users/${params}/details`); 
  }

  public signOutFunction = ():Observable<any>=>{
      const params = new HttpParams()
      .set('authToken',Cookie.get('authToken'));
     return this.httpClient.post(`${this.url}/users/logout`,params);
  }
  
  
 
}
