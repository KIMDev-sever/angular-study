import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CalendarOptions, EventClickArg, FullCalendarComponent, Calendar, } from '@fullcalendar/angular';
import * as moment from 'moment';
import { MatDialog, } from '@angular/material/dialog';
import { ScheduleDialogComponent } from '../shard/dialog/schedule-dialog/schedule-dialog.component';
import { ScheduleModel } from '../shard/schedule.model';
import { UtilityService } from '../shard/utility.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, AfterViewInit, OnDestroy {
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
      id: uuidv4(),
      color: 'gray',
      title: '상품발주',
      start: this.date1,
      end: this.date2,
    }
  ];


  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    initialEvents: this.events,
    dateClick: this.setDateEvent.bind(this),
    eventClick: this.editEvent.bind(this),
    locale: 'ko'
  };

  constructor(
    public dialog: MatDialog,
    private utilityService: UtilityService
  ) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngAfterViewInit(): void {
    console.log(moment().format('HH:mm:ss'));
    this.calendarApi = this.calendarComponent.getApi();
  }

  ngOnInit(): void {
  }
  editEvent(arg: EventClickArg) {

    const initData: ScheduleModel = {
      id: arg.event.id,
      title: arg?.event?.title,
      color: arg?.event?.backgroundColor,
      start: arg?.event?.start,
      end: arg?.event?.end,
      start_time: moment(arg?.event?.start).format('HH:mm:ss'),
      end_time: moment(arg?.event?.end).format('HH:mm:ss')
    };
    const dialogRef = this.dialog.open(ScheduleDialogComponent, {
      width: '470px',
      height: '600px',
      data: { key: 'update', value: initData }
    });
    this.subscription.add(dialogRef.afterClosed().pipe(filter(value => !!value)).subscribe((result: ScheduleModel) => {
      this.calendarApi.getEventById(result.id).remove();
      if (!!result) {
        this.calendarApi.addEventSource([result]);
      }


      this.utilityService.openSnackBar('스케쥴이 수정 되었습니다');
    }));
  }
  setDateEvent(arg) {
    const initData: ScheduleModel = {
      id: uuidv4(),
      title: '',
      color: '',
      start: new Date(arg.dateStr),
      end: null,
    };

    const dialogRef = this.dialog.open(ScheduleDialogComponent, {
      width: '470px',
      height: '600px',
      data: { key: 'insert', value: initData }
    });
    this.subscription.add(dialogRef.afterClosed().pipe(filter(value => !!value)).subscribe((result: ScheduleModel) => {
      this.calendarApi.addEventSource([result]);
      this.utilityService.openSnackBar('스케쥴이 추가 되었습니다');
    }));
  }

}
