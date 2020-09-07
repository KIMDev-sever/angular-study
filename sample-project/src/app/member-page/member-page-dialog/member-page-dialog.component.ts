import { Component, OnInit, Inject, ViewChild , AfterViewInit} from '@angular/core';
import { MemberModel } from 'src/app/shard/member.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductModel } from '../../shard/product.model';
@Component({
  selector: 'app-member-page-dialog',
  templateUrl: './member-page-dialog.component.html',
  styleUrls: ['./member-page-dialog.component.scss']
})
export class MemberPageDialogComponent implements OnInit , AfterViewInit{
  // tslint:disable:typedef
  // tslint:disable:variable-name
  updateMode = false;
  member_data: MemberModel;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'name', 'count', 'price', 'total', 'date'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { member_data: MemberModel, list: ProductModel[] },
    public dialogRef: MatDialogRef<MemberPageDialogComponent>,
  ) { }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.member_data = this.data.member_data;
    this.dataSource = new MatTableDataSource(this.data.list);

  }

  close(key: boolean) {
    const value = key ? this.data : null;
    this.dialogRef.close(value);
  }
}
