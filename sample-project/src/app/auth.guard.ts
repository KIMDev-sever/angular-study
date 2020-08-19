import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginService } from './login/login.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private loginService: LoginService
  ) {

  }

  // tslint:disable-next-line:typedef
  canActivate() {
    // login check;
    const guard = this.loginService.getloginSession().then((value) => {
      if (!!value) {
        return true;
      }else{
        return false;
      }
    });
    return guard;
  }

}
