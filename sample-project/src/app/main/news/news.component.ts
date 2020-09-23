import { Component, OnInit } from '@angular/core';
import { NoticeModel } from '../../shard/notice.model';
import * as moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  newsList: NoticeModel[] = [];
  constructor() { }

  ngOnInit(): void {
    // 샘플 데이터
    for (let index = 0; index < 20; index++) {
      const newsModel: NoticeModel = {
        id: uuidv4().substring(0, 6),
        kind: '',
        url: '',
        write_owner: '회원이름',
        content: '',
        title: '여기 일정 기간에 있는 신규 글들을 취득합니다. ',
        date: moment(new Date()).format('YYYY-MM-DD')
      };
      this.newsList.push(newsModel);
    }
  }

}
