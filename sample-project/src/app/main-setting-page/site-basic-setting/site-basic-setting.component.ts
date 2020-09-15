import { Component, OnInit } from '@angular/core';
import { FooterListModel } from '../../shard/footer-list.model';
@Component({
  selector: 'app-site-basic-setting',
  templateUrl: './site-basic-setting.component.html',
  styleUrls: ['./site-basic-setting.component.scss']
})
export class SiteBasicSettingComponent implements OnInit {
  footerList: FooterListModel[] = [];
  constructor() { }

  ngOnInit(): void {
    // smaple
    const list = ['마켓 소개',
      '채용정보', '이용약관', '개인정보처리방침', '청소년보호정책', '전자금융거래약관', ' 제휴·광고'];
    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < list.length; index++) {
      const data: FooterListModel = {
        name: list[index],
        url: '',
        visible: true,
        disable: false,
      };
      this.footerList.push(data);
    }
  }

}
