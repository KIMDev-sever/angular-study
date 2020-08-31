import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MemberModel } from '../shard/member.model';
import * as moment from 'moment';
import { MatSelectChange } from '@angular/material/select';
import { isFakeMousedownFromScreenReader } from '@angular/cdk/a11y';

// sampleData
const ELEMENT_DATA: MemberModel[] = [
  { name: '홍길동', id: 'id1', grade: '브론즈', date: new Date(), email: 'example@EXAM.COM', view_status: true },
  { name: 'Helium', id: 'id1', grade: '브론즈', date: new Date(), email: 'example@EXAM.COM', view_status: true },
  { name: 'Lithium', id: 'id1', grade: '브론즈', date: new Date(), email: 'example@EXAM.COM', view_status: true },
  { name: 'Beryllium', id: 'id1', grade: '브론즈', date: new Date(), email: 'example@EXAM.COM', view_status: true },
  { name: 'Boron', id: 'id1', grade: '브론즈', date: new Date(), email: 'example@EXAM.COM', view_status: true },
  { name: 'Carbon', id: 'id1', grade: '브론즈', date: new Date(), email: 'example@EXAM.COM', view_status: true },
  { name: 'Nitrogen', id: 'id1', grade: '브론즈', date: new Date(), email: 'example@EXAM.COM', view_status: true },
  { name: 'Oxygen', id: 'id1', grade: '브론즈', date: new Date(), email: 'example@EXAM.COM', view_status: true },
  { name: 'Fluorine', id: 'id1', grade: '브론즈', date: new Date(), email: 'example@EXAM.COM', view_status: true },
  { name: 'Neon', id: 'id1', grade: '브론즈', date: new Date(), email: 'example@EXAM.COM', view_status: true },
  { name: 'Hydrogen', id: 'id1', grade: '브론즈', date: new Date(), email: 'example@EXAM.COM', view_status: true },
  { name: 'Helium', id: 'id1', grade: '실버', date: new Date(), email: 'example@EXAM.COM', view_status: true },
  { name: 'Lithium', id: 'id1', grade: '실버', date: new Date(), email: 'example@EXAM.COM', view_status: true },
  { name: 'Beryllium', id: 'id1', grade: '실버', date: new Date(), email: 'example@EXAM.COM', view_status: true },
  { name: 'Boron', id: 'id1', grade: '실버', date: new Date(), email: 'example@EXAM.COM', view_status: true },
  { name: 'Carbon', id: 'id1', grade: '실버', date: new Date(), email: 'example@EXAM.COM', view_status: true },
  { name: 'Nitrogen', id: 'id1', grade: '실버', date: new Date(), email: 'example@EXAM.COM', view_status: true },
  { name: 'Oxygen', id: 'id1', grade: '실버', date: new Date(), email: 'example@EXAM.COM', view_status: true },
  { name: 'Fluorine', id: 'id1', grade: '골드', date: new Date(), email: 'example@EXAM.COM', view_status: true },
  { name: 'Neon', id: 'id1', grade: '골드', date: new Date(), email: 'example@EXAM.COM', view_status: true }
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
  displayedColumns: string[] = ['member_id', 'name', 'id', 'grade', 'date', 'email'];
  dataSource = new MatTableDataSource(this.init_memberlist);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  member_count = 0;
  startData_filter: Date;
  endData_filter: Date;
  grade_filter: string;

  constructor() { }

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
}
