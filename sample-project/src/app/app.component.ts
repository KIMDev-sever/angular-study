import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UtilityService } from './shard/utility.service';
import { Subscription } from 'rxjs';
import { LoginService } from './login/login.service';
import { Router } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // tslint:disable:typedef
  @ViewChild('drawer') drawer: MatDrawer;
  loadingSw = false;
  subscription = new Subscription();
  logined = false;
  name = '';
  // 회원이 관리자에게 메세지 및 글을 등록한우 새소식으로
  newMessage = 15;
  constructor(
    private utilityService: UtilityService, // 의존성주입 내부에서 만든 변수를 외부에서 넣어줌,
    private loginService: LoginService,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    this.subscription.add(
      this.utilityService.getlogined().subscribe((value: string) => {
        this.name = value;
        this.logined = this.name ? true : false;
      })
    );

  }
  go_main(): void {
    this.router.navigate(['main']);
  }
  logout(): void {
    this.loginService.logout();
    this.logined = null;
    this.name = '';
    this.drawer.close();
    this.router.navigate(['login']);
  }
  openMemberPage(): void {

  }
}
