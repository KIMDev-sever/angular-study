import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MemberModel } from '../shard/member.model';
import { MatDialog } from '@angular/material/dialog';
import { MemberPageDialogComponent } from './member-page-dialog/member-page-dialog.component';
import * as moment from 'moment';
import { ProductModel } from '../shard/product.model';
import { v4 as uuidv4 } from 'uuid';
// sampleData
const ELEMENT_DATA: MemberModel[] = [
  // tslint:disable:max-line-length
  // tslint:disable:variable-name
  { name: '홍길동', id: 'id1', grade: '브론즈', date: new Date(), birthDay: moment(new Date()).format('YYYY-MM-DD'), email: 'example@EXAM.COM', point: 10000, view_status: true, status: 'ok' },
  { name: 'Helium', id: 'id1', grade: '브론즈', date: new Date(), birthDay: moment(new Date()).format('YYYY-MM-DD'), email: 'example@EXAM.COM', point: 10000, view_status: true, status: 'ok' },
  { name: 'Lithium', id: 'id1', grade: '브론즈', date: new Date(), birthDay: moment(new Date()).format('YYYY-MM-DD'), email: 'example@EXAM.COM', point: 10000, view_status: true, status: 'ok' },
  { name: 'Beryllium', id: 'id1', grade: '브론즈', date: new Date(), birthDay: moment(new Date()).format('YYYY-MM-DD'), email: 'example@EXAM.COM', point: 10000, view_status: true, status: 'ok' },
  { name: 'Boron', id: 'id1', grade: '브론즈', date: new Date(), birthDay: moment(new Date()).format('YYYY-MM-DD'), email: 'example@EXAM.COM', point: 10000, view_status: true, status: 'ok' },
  { name: 'Carbon', id: 'id1', grade: '브론즈', date: new Date(), birthDay: moment(new Date()).format('YYYY-MM-DD'), email: 'example@EXAM.COM', point: 10000, view_status: true, status: 'ok' },
  { name: 'Nitrogen', id: 'id1', grade: '브론즈', date: new Date(), birthDay: moment(new Date()).format('YYYY-MM-DD'), email: 'example@EXAM.COM', point: 10000, view_status: true, status: 'ok' },
  { name: 'Oxygen', id: 'id1', grade: '브론즈', date: new Date(), birthDay: moment(new Date()).format('YYYY-MM-DD'), email: 'example@EXAM.COM', point: 10000, view_status: true, status: 'ok' },
  { name: 'Fluorine', id: 'id1', grade: '브론즈', date: new Date(), birthDay: moment(new Date()).format('YYYY-MM-DD'), email: 'example@EXAM.COM', point: 0, view_status: true, status: 'ok' },
  { name: 'Neon', id: 'id1', grade: '브론즈', date: new Date(), birthDay: moment(new Date()).format('YYYY-MM-DD'), email: 'example@EXAM.COM', point: 0, view_status: true, status: 'ok' },
  { name: 'Hydrogen', id: 'id1', grade: '브론즈', date: new Date(), birthDay: moment(new Date()).format('YYYY-MM-DD'), email: 'example@EXAM.COM', point: 0, view_status: true, status: 'ok' },
  { name: 'Helium', id: 'id1', grade: '실버', date: new Date(), birthDay: moment(new Date()).format('YYYY-MM-DD'), email: 'example@EXAM.COM', point: 0, view_status: true, status: 'ok' },
  { name: 'Lithium', id: 'id1', grade: '실버', date: new Date(), birthDay: moment(new Date()).format('YYYY-MM-DD'), email: 'example@EXAM.COM', point: 0, view_status: true, status: 'non_confirm' },
  { name: 'Beryllium', id: 'id1', grade: '실버', date: new Date(), birthDay: moment(new Date()).format('YYYY-MM-DD'), email: 'example@EXAM.COM', point: 0, view_status: true, status: 'non_confirm' },
  { name: 'Boron', id: 'id1', grade: '실버', date: new Date(), birthDay: moment(new Date()).format('YYYY-MM-DD'), email: 'example@EXAM.COM', point: 0, view_status: true, status: 'non_confirm' },
  { name: 'Carbon', id: 'id1', grade: '실버', date: new Date(), birthDay: moment(new Date()).format('YYYY-MM-DD'), email: 'example@EXAM.COM', point: 0, view_status: true, status: 'non_confirm' },
  { name: 'Nitrogen', id: 'id1', grade: '실버', date: new Date(), birthDay: moment(new Date()).format('YYYY-MM-DD'), email: 'example@EXAM.COM', point: 0, view_status: true, status: 'non_confirm' },
  { name: 'Oxygen', id: 'id1', grade: '실버', date: new Date(), birthDay: moment(new Date()).format('YYYY-MM-DD'), email: 'example@EXAM.COM', point: 0, view_status: true, status: 'non_confirm' },
  { name: 'Fluorine', id: 'id1', grade: '골드', date: new Date(), birthDay: moment(new Date()).format('YYYY-MM-DD'), email: 'example@EXAM.COM', point: 0, view_status: true, status: 'non_confirm' },
  { name: 'Neon', id: 'id1', grade: '골드', date: new Date(), birthDay: moment(new Date()).format('YYYY-MM-DD'), email: 'example@EXAM.COM', point: 0, view_status: true, status: 'non_confirm' }
];



@Component({
  selector: 'app-member-page',
  templateUrl: './member-page.component.html',
  styleUrls: ['./member-page.component.scss']
})
export class MemberPageComponent implements OnInit {
  // tslint:disable:typedef
  // tslint:disable:variable-name
  init_memberlist: MemberModel[] = [...ELEMENT_DATA];
  displayedColumns: string[] = ['member_id', 'name', 'id', 'grade', 'date', 'email', 'status'];
  dataSource = new MatTableDataSource(this.init_memberlist);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  member_count = 0;
  startData_filter: Date;
  endData_filter: Date;
  grade_filter: string;
  productList = [];
  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.paginator._intl.itemsPerPageLabel = '보여질 페이지수';
    this.dataSource.paginator = this.paginator;
    this.member_count = ELEMENT_DATA.length;


  }
  applyFilter(key: string, event: Event) {
    // tslint:disable:variable-name
    const filterValue = (event.target as HTMLInputElement)?.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openDialog(value: MemberModel) {
    console.log(value);
    // 샘플 데이터
    const list: ProductModel[] = [];
    for (let index = 0; index < Math.random() * 50; index++) {
      const sample_buyList: ProductModel = {
        id: uuidv4().substring(0, 6),
        date: new Date(),
        name: '어떠한 물건',
        count: Math.ceil(Math.random() * 100),
        price: 10000
      };
      list.push(sample_buyList);
    }
    const dialogRef = this.dialog.open(MemberPageDialogComponent, {
      width: '1000px',
      height: '800px',
      data: {
        member_data: value, list
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
