import { Component, Inject, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoticeModel } from 'src/app/shard/notice.model';
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
  ckeConfig: { readonly: boolean };
  mycontent: string;
  log = '';
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
        readonly: true
      };
    }
  }
  onChange(event: string): void {
    this.mycontent = event;
  }

  onPaste(event: string): void {
    console.log(event);
  }
  close() {
    this.dialogRef.close();
  }
}
