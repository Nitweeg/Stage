import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './NetworkP/service/auth.service';


@Injectable({
  providedIn: 'root'
})
export class SecuriteGuard implements CanActivate {

  constructor (private AuthService: AuthService,
    private router : Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean  {

      if (this.AuthService.isAdmin())

        return true;
      else if(this.AuthService.isBATEG())
        {
          return true
        }
      else if(this.AuthService.isADMINISTRATION())
        {
          return true
        }
      else if(this.AuthService.isMAGASIN())
        {
          return true
        }
      else
        {
          this.router.navigate(['forbidden']);
           return false;
        }
      
  }
  
}
