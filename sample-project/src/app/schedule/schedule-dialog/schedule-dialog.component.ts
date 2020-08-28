import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ScheduleModel } from '../../shard/schedule.model';
import * as moment from 'moment';
@Component({
  selector: 'app-schedule-dialog',
  templateUrl: './schedule-dialog.component.html',
  styleUrls: ['./schedule-dialog.component.scss']
})
export class ScheduleDialogComponent implements OnInit {
  // tslint:disable:typedef
  key: string;
  scheduelData: ScheduleModel;
  constructor(
    public dialogRef: MatDialogRef<ScheduleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { key: string, value: ScheduleModel }) { }

  ngOnInit(): void {
    this.key = this.data.key;
    this.scheduelData = this.data.value;
  }

  inputData(key: string, value: string): void {
    let dataValue: any;
    if (key === 'start' || key === 'end') {
      dataValue = new Date(value);
    } else if (key === 'starttime') {
      const datetoString = moment(this.scheduelData.start).format('YYYY-MM-DD') + ' ' + value;
      this.scheduelData.start = new Date(datetoString);
    } else if (key === 'endtime') {
      const datetoString = moment(this.scheduelData.end).format('YYYY-MM-DD') + ' ' + value;
      this.scheduelData.end = new Date(datetoString);
    } else {
      dataValue = value;
    }
    this.scheduelData[key] = dataValue;
  }

  close(value: boolean) {
    const data = value ? this.scheduelData : null;
    this.dialogRef.close(data);
  }
}
