import { Component, ElementRef, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  numers: number[];
  // tslint:disable-next-line:variable-name
  _el: Element;
  src: string;
  constructor(
    private appService: AppService,   // 의존성주입 내부에서 만든 변수를 외부에서 넣어줌,
    private el: ElementRef
  ) {
    this._el = this.el.nativeElement;

  }
  ngOnInit(): void {
  }
}
