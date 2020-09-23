import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { NewsModel } from '../shard/news.model';
import { NoticeModel } from '../shard/notice.model';
import { QnAModel } from '../shard/qna.model';
import { NoitceDialogComponent } from './noitce-dialog/noitce-dialog.component';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss']
})
export class NoticeComponent implements OnInit, AfterViewInit {
  // tslint:disable:variable-name
  // tslint:disable:typedef
  // sample source

  displayedColumns: string[] = ['no', 'title', 'date'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  page_key = 'total';
  dataSource = new MatTableDataSource<NoticeModel>();
  constructor(
    private router: ActivatedRoute,
    private route: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // sample
    // db연계 이후 page key 값으로 필터링할 예정 일단 css작업을 위한 샘플데이터 생성;
    // tslint:disable:one-variable-per-declaration
    const kindlist = [
      'notice',
      'qna',
      'product_qna'
    ];
    const list: NoticeModel[] = [];
    for (let index = 0; index < 20; index++) {
      const noticemodel: NoticeModel = {
        id: uuidv4().substring(0, 6),
        url: '',
        write_owner: '회원이름',
        content: '',
        title: 'ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ ',
        date: moment(this.randomDate(new Date(2012, 0, 1), new Date())).format('YYYY-MM-DD'),
        kind: kindlist[Math.floor(Math.random() * 3)]
      };
      list.push(noticemodel);
    }
    this.router.params.subscribe((value) => {
      if (!!value) {
        this.page_key = value.key;
      }
      switch (this.page_key) {
        case 'total': {
          this.dataSource.data = list;
          break;
        }
        default: {
          this.dataSource.data = list.filter((list_data) => {
            return list_data.kind === this.page_key;
          });
          break;
        }
      }
      this.dataSource.data.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
    });

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  changeTable(key: string) {
    this.route.navigate(['notice-management', key]);
  }

  open_dialog(value) {
    const dialogRef = this.dialog.open(NoitceDialogComponent, {
      width: '250px',

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }
  // sample
  randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
}
