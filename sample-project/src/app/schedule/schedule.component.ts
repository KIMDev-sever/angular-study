import { Component, OnInit, ViewChild, AfterViewInit , OnDestroy} from '@angular/core';
import { CalendarOptions, EventClickArg, FullCalendarComponent, Calendar, } from '@fullcalendar/angular';
import * as moment from 'moment';
import { MatDialog, } from '@angular/material/dialog';
import { ScheduleDialogComponent } from './schedule-dialog/schedule-dialog.component';
import { ScheduleModel } from '../shard/schedule.model';
import { UtilityService } from '../shard/utility.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, AfterViewInit , OnDestroy {
  @ViewChild('calendar')
  calendarComponent: FullCalendarComponent;

  calendarApi: Calendar;

  subscription = new Subscription();

  // tslint:disable:typedef
  // 샘플 데이터 데이터베이스 연동 아직;

  date1 = new Date(moment().format('YYYY-MM-DD'));
  date2 = new Date(moment(new Date().setDate(29)).format('YYYY-MM-DD'));

  events: ScheduleModel[] = [
    {
      color: 'gray',
      title: '상품발주',
      start: this.date1,
      end: this.date2
    }
  ];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    initialEvents: this.events,
    dateClick: this.setDateEvent.bind(this),
    eventClick: this.editEvent.bind(this)
  };

  constructor(
    public dialog: MatDialog,
    private utilityService: UtilityService
  ) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngAfterViewInit(): void {
    this.calendarApi = this.calendarComponent.getApi();
  }

  ngOnInit(): void {
  }
  editEvent(arg: EventClickArg) {
    console.log(arg);
    const initData: ScheduleModel = {
      title: arg?.event?.title,
      color: arg?.event?.backgroundColor,
      start: arg?.event?.start,
      end: arg?.event?.end
    };
    const dialogRef = this.dialog.open(ScheduleDialogComponent, {
      width: '50%',
      height: '50%',
      data: initData
    });
    this.subscription.add(dialogRef.afterClosed().subscribe((result: ScheduleModel) => {
      // this.calendarApi. ([result]);
      // this.utilityService.openSnackBar('스케쥴이 수정 되었습니다');
    }));
  }
  setDateEvent(arg) {
    const initData: ScheduleModel = {
      title: '',
      color: '',
      start: new Date(arg.dateStr),
      end: null
    };

    const dialogRef = this.dialog.open(ScheduleDialogComponent, {
      width: '50%',
      height: '50%',
      data: initData
    });
    this.subscription.add(dialogRef.afterClosed().pipe(filter(value => !!value)).subscribe((result: ScheduleModel) => {
      this.calendarApi.addEventSource([result]);
      this.utilityService.openSnackBar('스케쥴이 추가 되었습니다');
    }));
  }

}
