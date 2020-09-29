import { Component, Inject, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { NoticeModel, ReplyModel } from 'src/app/shard/notice.model';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-noitce-dialog',
  templateUrl: './noitce-dialog.component.html',
  styleUrls: ['./noitce-dialog.component.scss']
})
export class NoitceDialogComponent implements OnInit {
  // tslint:disable:typedef
  // tslint:disable:variable-name
  notice_model: NoticeModel;
  name = 'ng2-ckeditor';
  ckeConfig: { readonly: boolean, height: number; };
  mycontent: string;
  log = '';
  reply_list: ReplyModel[] = [];
  @ViewChild('myckeditor') ckeditor: any;
  constructor(
    public dialogRef: MatDialogRef<NoitceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { key: string, data_value: NoticeModel }
  ) { }


  ngOnInit(): void {
    this.notice_model = this.data.data_value;
    this.mycontent = this.notice_model.content;
    if (this.data.key !== 'insert') {
      this.ckeConfig = {
        readonly: true,
        height: 300
      };
    }
    // sample
    // 데이터베이스 리플까지 불러와서 화면에 뿌려주는 작업 예정
    if (this.notice_model.kind !== 'notice') {
      for (let index = 0; index < 20; index++) {
        const reply: ReplyModel = {
          content: '댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글',
          id: uuidv4().substring(0, 6),
          reply_id: this.notice_model.id,
          date: moment(this.randomDate(new Date(2012, 0, 1), new Date())).format('YYYY-MM-DD'),
          write_owner: '누군가',

        };
        this.reply_list.push(reply);
      }

    }
  }
  onChange(event: string): void {
    this.mycontent = event;

  }

  onPaste(event: string): void {
    console.log(event);
  }
  close(value) {
    this.dialogRef.close(value);
  }

  // 삭제 예정
  randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
}
