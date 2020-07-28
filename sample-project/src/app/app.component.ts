import { Component, ElementRef , OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  text: string = "아아아아아아아앙아ㅏㅇ";
  numers: number[];
  _el:Element;
  src:string;
  constructor(
    private appService: AppService ,   //의존성주입 내부에서 만든 변수를 외부에서 넣어줌,
    private el:ElementRef
  ) {
    this._el=this.el.nativeElement;

  }
  ngOnInit(): void {
  //  this.src='https://www.youtube.com/watch?v=vVaMN9R93ro&list=PLLrug9JZTq60aXKII6oDrf1NLndUKWM_X&index=59';
  }
  // changeVideo(value:string) {

  //   this.src=`http://www.youtube.com/embed/${value}?enablejsapi=1&origin=http://example.com`;
  //   let str=`<iframe id="player" type="text/html" width="100%" height="100%" src=${this.src} frameborder="0"></iframe>`;
  
  //   let div=this._el.querySelector('.youtubePlayer');
  //   div.innerHTML=str;
  //   console.log(value);
  // }
}
