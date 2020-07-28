import { Component, OnInit, ElementRef} from '@angular/core';
import { DomSanitizer ,SafeResourceUrl } from "@angular/platform-browser";
@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.scss']
})
export class YoutubeComponent implements OnInit {
  value:string="vVaMN9R93ro";
  src:SafeResourceUrl;
  _el:Element;

  constructor(
    private el:ElementRef,
    private domSanitizer:DomSanitizer
  ) {
    this._el=this.el.nativeElement;

  }

  ngOnInit(): void {
    this.src=this.domSanitizer.bypassSecurityTrustResourceUrl(`http://www.youtube.com/embed/${this.value}?enablejsapi=1&origin=http://example.com`);
    //불안정한 리소스파일은 앵귤러가새니티제이션을 적용시키기 때문에 소독을 시킴 
  }
}
