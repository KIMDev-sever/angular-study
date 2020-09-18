import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { Calendar, CalendarOptions, EventClickArg } from '@fullcalendar/core';
import { ScheduleModel } from '../../shard/schedule.model';
import { v4 as uuidv4 } from 'uuid';
import { filter } from 'rxjs/internal/operators/filter';
import { UtilityService } from 'src/app/shard/utility.service';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { EventModel } from '../../shard/event.model';
import { EventDialogComponent } from './event-dialog/event-dialog.component';
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
    const id = arg.event.id;
    const initData: EventModel = this.eventList.find((event) => {
      return event.id === id;
    });
    const dialogRef = this.dialog.open(EventDialogComponent, {
      data: { key: 'update', value: initData }
    });
    this.subscription.add(dialogRef.afterClosed().pipe(filter(value => !!value))
      .subscribe((result: { key: number, data: EventModel }) => {
        this.calendarApi.getEventById(result.data.id).remove();
        let message = '이벤트가 삭제되었습니다';

        if (result.key === 1) {
          message = '이벤트가 수정 되었습니다';
          const index = this.eventList.findIndex((event) => {
            return event.id === id;
          });
          if (index !== undefined && index !== null) {
            this.eventList[index] = result.data;
          }

          this.calendarApi.addEventSource([result.data]);
        } else {

        }

        this.utilityService.openSnackBar(message);
      }));
  }
  setDateEvent(arg) {
    const initData: EventModel = {
      id: uuidv4(),
      title: '',
      color: '',
      start: new Date(arg.dateStr),
      end: null,
      end_time: '',
      explan: '',
      images: ['../../../../assets/image.png', '../../../../assets/image.png', '../../../../assets/image.png'],
      kind: '',
      start_time: ''
    };
    const dialogRef = this.dialog.open(EventDialogComponent, {
      data: { key: 'insert', value: initData }
    });
    this.subscription.add(dialogRef.afterClosed().pipe(filter(value => !!value))
      .subscribe((result: { key: number, data: EventModel }) => {
        this.calendarApi.addEventSource([result.data]);
        this.eventList.push(result.data);
        this.utilityService.openSnackBar('이벤트가 추가 되었습니다');

      }));
  }

}
