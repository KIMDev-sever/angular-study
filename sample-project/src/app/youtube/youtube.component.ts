import { Component, OnInit, ElementRef , OnDestroy} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UtilityService } from '../shard/utility.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.scss']
})
export class YoutubeComponent implements OnInit, OnDestroy {

  value = 'vVaMN9R93ro';
  src: SafeResourceUrl;
  // tslint:disable-next-line:variable-name
  _el: Element;
  subscription: Subscription = new Subscription();
  constructor(
    private el: ElementRef,
    private domSanitizer: DomSanitizer,
    private utilityService: UtilityService,
  ) {
    this._el = this.el.nativeElement;
    this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(`http://www.youtube.com/embed/${this.value}?enablejsapi=1&origin=http://example.com`);
    // 유튜브 소스 초기화
  }



  ngOnInit(): void {
    this.subscription.add(this.utilityService.getStringdata().pipe(filter(value => !!value)).subscribe((value: string) => {
      this.value = value;
      this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(`http://www.youtube.com/embed/${this.value}?enablejsapi=1&origin=http://example.com`);
    }));
   // 불안정한 리소스파일은 앵귤러가새니티제이션을 적용시키기 때문에 소독을 시킴
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
