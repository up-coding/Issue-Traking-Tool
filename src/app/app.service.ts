import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
 



@Injectable({
  providedIn: 'root'
})
export class AppService {
  
  private url = 'http://localhost:3000/api/v1';

  constructor(public httpClient:HttpClient) { }

  public getUserInfoFromLocalStorage = ()=>{
    return JSON.parse(localStorage.getItem('userInfo'));
  }

  public getUrl = ()=>{
    console.log(this.url);
    return this.url;
  }

  public setUserInfoToLocalStorage = (data) =>{
    console.log(data);
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

  private handleError = (err:HttpErrorResponse)=>{
      let errorMessage = '';
      if(err.error instanceof Error){
         errorMessage = `An error occurred: ${err.error.message}`;
      }else{
        errorMessage = `Server returned code: ${err.status}, error message is:${err.message}`;
      }
      console.log(err.message);
      return Observable.throw(errorMessage);
  }
}
