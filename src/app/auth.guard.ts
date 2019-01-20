import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cookie } from 'ng2-cookies';
 

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(public router:Router){

  }  
  canActivate(next:ActivatedRouteSnapshot,state:RouterStateSnapshot): boolean {
      console.log("in guard service");

    if (Cookie.get('authToken') === undefined || Cookie.get('authToken') === '' || Cookie.get('authToken') === null) {

      this.router.navigate(['/']);

      return false;

    } else {

      return true;

    }
    
  }
}
