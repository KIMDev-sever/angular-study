import { ScheduleModel } from './schedule.model';

export interface EventModel {
    title: string;
    kind: string;
    explan: string;
    event_Id: string;
    startDate: Date;
    endDate: Date;
    images: string[];
    schedule: ScheduleModel;
}
