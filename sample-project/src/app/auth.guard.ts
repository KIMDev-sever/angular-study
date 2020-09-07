import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginService } from './login/login.service';
import { UtilityService } from './shard/utility.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private utilityService: UtilityService
  ) {

  }

  // tslint:disable-next-line:typedef
  canActivate() {
    // login check;
    const guard = this.loginService.getloginSession().then((value: {name: string}) => {
      if (!!value.name) {

        this.utilityService.setlogined(value.name);
        return true;

      } else {
        this.router.navigate(['./login']);
        this.utilityService.setlogined('');
        return false;

      }
    });
    return guard;
  }

}
