import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ScheduleModel } from '../../shard/schedule.model';
@Component({
  selector: 'app-schedule-dialog',
  templateUrl: './schedule-dialog.component.html',
  styleUrls: ['./schedule-dialog.component.scss']
})
export class ScheduleDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ScheduleModel ) {}

  ngOnInit(): void {
    console.log(this.data);
  }

}
