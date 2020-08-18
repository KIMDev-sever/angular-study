import { Component, ElementRef, OnInit } from '@angular/core';
import { UtilityService } from './shard/utility.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loadingSw = false;
  subscription = new Subscription();
  constructor(
    private utilityService: UtilityService// 의존성주입 내부에서 만든 변수를 외부에서 넣어줌,
  ) {

  }
  ngOnInit(): void {
    this.subscription.add(
      this.utilityService.getLoadingCheckData().subscribe((value: boolean) => {
        this.loadingSw = value;
      }));
  }
}
