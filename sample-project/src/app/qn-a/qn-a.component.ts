import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';
import { NoticeModel } from '../shard/notice.model';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-qn-a',
  templateUrl: './qn-a.component.html',
  styleUrls: ['./qn-a.component.scss']
})
export class QnAComponent implements OnInit {
  qnaList: NoticeModel[] = [];
  constructor() { }

  ngOnInit(): void {
    for (let index = 0; index < 20; index++) {
      const qnaModel: NoticeModel = {
        id: uuidv4().substring(0, 6),
        url: '',
        write_owner: '회원이름',
        content: '',
        title: '여기 일정 기간에 있는 신규 Q&A들을 취득합니다. ',
        date: moment(new Date()).format('YYYY-MM-DD'),
        category: '질문',
        kind: 'qna',
        product_number: 1
      };
      this.qnaList.push(qnaModel);
    }
  }

}
