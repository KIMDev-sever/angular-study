import { Component, ElementRef, OnInit } from '@angular/core';
import { UtilityService } from './shard/utility.service';
import { Subscription } from 'rxjs';
import { LoginService } from './login/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loadingSw = false;
  subscription = new Subscription();
  logined = false;
  constructor(
    private utilityService: UtilityService, // 의존성주입 내부에서 만든 변수를 외부에서 넣어줌,
    private loginService: LoginService,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    this.subscription.add(
      this.utilityService.getLoadingCheckData().subscribe((value: boolean) => {
        this.loadingSw = value;
      }));
    this.subscription.add(
      this.utilityService.getlogined().subscribe((value: boolean) => {
        this.logined = value;
      })
    );

  }
  // tslint:disable-next-line:typedef
  go_main(){
    this.router.navigate(['main']);
  }
  // tslint:disable-next-line:typedef
  logout() {
    this.loginService.logout();
    this.logined = false;
    this.router.navigate(['login']);
  }
}
