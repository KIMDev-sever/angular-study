import { Component, OnInit } from '@angular/core';
import { FooterListModel } from '../../shard/footer-list.model';
import { SiteSettingModel } from '../../shard/site-setting.model';
import { UtilityService } from '../../shard/utility.service';
@Component({
  selector: 'app-site-basic-setting',
  templateUrl: './site-basic-setting.component.html',
  styleUrls: ['./site-basic-setting.component.scss']
})
export class SiteBasicSettingComponent implements OnInit {
  // tslint:disable:typedef
  footerList: FooterListModel[] = [];
  settingData: SiteSettingModel;
  addBoxTrigger = false;
  constructor(
    private utilityService: UtilityService
  ) { }

  ngOnInit(): void {
    // smaple
    this.settingData = {
      title: '사이트 타이틀',
      logo: '../../../assets/image.png',
      copyright: 'Copyright(c)2020 Kim-dev All rights reserved.',
      logoLink: ''
    };
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
  // tslint:disable-next-line:typedef
  inputData(key: string, value: string) {
    this.settingData[key] = value;
  }

  addfooter(name: string, url: string, visible: boolean, disable: boolean) {
    const data: FooterListModel = {
      name, url, visible, disable
    };
    console.log(data);
    this.footerList.push(data);
  }
  delfooter() {
    this.footerList.pop();
  }

  selectFile(files: FileList, index: number): void {
    if (files && files.length > 0) {
      const file = files[0];
      // tslint:disable-next-line:no-unused-expression
      this.utilityService.imageUpload(file).then((value) => {
        // tslint:disable-next-line:no-string-literal
        if (!!value['message'] && value['message'] === 'ok') {
          this.utilityService.openSnackBar('이미지가 업로드 되였습니다.');
          this.settingData.logo = 'http://localhost:3000/images/' + file.name;
        }
      });
    }
  }
}
