import { Component, OnInit } from '@angular/core';
import { QnAModel } from '../shard/qna.model';
import * as moment from 'moment';
@Component({
  selector: 'app-qn-a',
  templateUrl: './qn-a.component.html',
  styleUrls: ['./qn-a.component.scss']
})
export class QnAComponent implements OnInit {
  qnaList: QnAModel[] = [];
  constructor() { }

  ngOnInit(): void {
    for (let index = 0; index < 20; index++) {
      const qnaModel: QnAModel = {
        index,
        url: '',
        write_owner: '회원이름',
        content: '',
        title: '여기 일정 기간에 있는 신규 Q&A들을 취득합니다. ',
        date: moment(new Date()).format('YYYY-MM-DD'),
        category: '질문',
        product_number: 1
      };
      this.qnaList.push(qnaModel);
    }
  }

}
