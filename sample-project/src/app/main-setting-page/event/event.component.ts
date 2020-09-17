import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { Calendar, CalendarOptions, EventClickArg } from '@fullcalendar/core';
import { ScheduleModel } from '../../shard/schedule.model';
import { v4 as uuidv4 } from 'uuid';
import { ScheduleDialogComponent } from '../../shard/dialog/schedule-dialog/schedule-dialog.component';
import { filter } from 'rxjs/internal/operators/filter';
import { UtilityService } from 'src/app/shard/utility.service';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { EventModel } from '../../shard/event.model';
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit, AfterViewInit {

  // tslint:disable:typedef
  @ViewChild('calendar')
  calendarComponent: FullCalendarComponent;

  calendarApi: Calendar;
  eventList: EventModel[] = [];
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.setDateEvent.bind(this),
    eventClick: this.editEvent.bind(this),
    locale: 'ko'
  };
  subscription = new Subscription();
  constructor(
    public dialog: MatDialog,
    private utilityService: UtilityService,
  ) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.calendarApi = this.calendarComponent.getApi();
  }
  editEvent(arg: EventClickArg) {
    console.log(arg.event.id);
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

      this.utilityService.openSnackBar('이벤트가 수정 되었습니다');
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
    // const event: EventModel = {
    //   title: '',
    //   explan: '',
    //   images: [],
    //   kind: '',
    //   event_Id: initData.id,
    //   schedule: initData
    // };
    const dialogRef = this.dialog.open(ScheduleDialogComponent, {
      width: '470px',
      height: '600px',
      data: { key: 'insert', value: initData }
    });
    this.subscription.add(dialogRef.afterClosed().pipe(filter(value => !!value)).subscribe((result: ScheduleModel) => {
      this.calendarApi.addEventSource([result]);
      this.utilityService.openSnackBar('이벤트가 추가 되었습니다');

    }));
  }

}
