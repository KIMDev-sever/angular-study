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
import { combineLatest, filter } from 'rxjs/operators';
import { UtilityService } from '../shard/utility.service';
@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss']
})
export class NoticeComponent implements OnInit, AfterViewInit {
  // tslint:disable:variable-name
  // tslint:disable:typedef
  // sample source

  displayedColumns: string[] = ['no', 'title', 'writer', 'date'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  page_key = 'total';
  manager = '';
  dataSource = new MatTableDataSource<NoticeModel>();
  sample_replyList: NoticeModel[] = [];
  constructor(
    private router: ActivatedRoute,
    private route: Router,
    public dialog: MatDialog,
    private utilityService: UtilityService,
  ) { }

  ngOnInit(): void {

    // sample
    // db연계 이후 page key 값으로 필터링할 예정 일단 css작업을 위한 샘플데이터 생성;
    // tslint:disable:one-variable-per-declaration

    this.router.params.pipe(
      combineLatest(this.utilityService.getlogined())
    ).
      subscribe(([value, name]) => {
        this.manager = name;
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
            content: '콘텐트콘텐트콘텐트콘텐트콘텐트콘텐트콘텐트콘텐트콘텐트콘텐트\n <img alt="" src="../../../assets/image.png" />콘텐트콘텐트콘텐트콘텐트콘텐트콘텐트콘텐트콘텐트콘텐트콘텐트\n',
            title: '제목제목제목제목제목제목제목제목제목제목제목제목제목제목',
            date: moment(this.randomDate(new Date(2012, 0, 1), new Date())).format('YYYY-MM-DD'),
            kind: kindlist[Math.floor(Math.random() * 3)]
          };
          if (noticemodel.kind === 'notice') {
            noticemodel.write_owner = this.manager;
          }


          list.push(noticemodel);
        }
        if (!!value) {
          this.page_key = value.key;
        }
        switch (this.page_key) {
          case 'total': {
            this.dataSource.data = list.filter((list_data) => {
              return list_data.kind !== 'notice';
            });
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
    this.paginator._intl.itemsPerPageLabel = '보여질 페이지수';
  }
  changeTable(key: string) {
    this.route.navigate(['notice-management', key]);
  }

  open_dialog(value: NoticeModel) {
    const initdata: NoticeModel = {
      id: uuidv4().substring(0, 6),
      url: '',
      write_owner: '',
      content: '',
      title: '',
      date: moment(this.randomDate(new Date(2012, 0, 1), new Date())).format('YYYY-MM-DD'),
      kind: this.page_key
    };
    const data_value = !!value ? value : initdata;
    const key = !!value ? 'update' : 'insert';
    if (key === 'insert') {
      initdata.write_owner = this.manager;
    }
    const dialogRef = this.dialog.open(NoitceDialogComponent, {
      width: '900px',
      height: '80%',
      data: { key, data_value }
    });

    // tslint:disable-next-line:no-shadowed-variable
    dialogRef.afterClosed().pipe(filter(value => !!value)).subscribe((result: NoticeModel) => {
      // tslint:disable-next-line:no-shadowed-variable
      const index = this.dataSource.data.findIndex((data_value) => {
        return data_value.id === result.id;
      });
      if (index !== null && index !== undefined) {

      }
    });
  }
  // sample
  randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
}
